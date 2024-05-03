---
title: Gorm Use Cases
author: ChocolateAceCream
date: 2023/07/12 19:00
isTop: false
categories:
 - backend
tags:
 - Go
 - Gorm
 - Pagination
 - MySQL
 - Cascade Delete
---
# Gorm Use Cases Sample Codes <Badge text="Gorm" type="warning" />
## Gorm raw sql pagination

### purpose
using gorm to execute raw sql to implement a pagination service.

```go
func (es *ArticleService) GetArticleSearchList(authorId uint, query request.ArticleSearchParma) (articleBaseInfo []response.ArticleBaseInfo, total int64, err error) {
	articleList := []dbTable.Article{}
	sql := `
	SELECT SQL_CALC_FOUND_ROWS * FROM articles a
	WHERE 1=1
	AND
	AND
	deleted_at IS NULL
	author_id = ?
	AND
	published = ?
	AND
	CONCAT_WS('', a.content, a.title) LIKE CONCAT('%', ?, '%')
	ORDER BY created_at DESC
	LIMIT ? OFFSET ?
	`
	limit := query.PageSize
	offset := query.PageSize * (query.PageNumber - 1)
	db := global.DB.Raw(sql, authorId, query.Published, query.Keywords, limit, offset).Scan(&articleList)
	err = db.Raw("select found_rows() as count").Scan(&total).Error
	if err != nil {
		return
	}
	articleBaseInfo = utils.MapSlice(articleList, response.ArticleBaseInfoFormatter)
	return
}
```
#### explanation:
>	CONCAT_WS('', a.content, a.title) LIKE CONCAT('%', ?, '%')

implement a fuzzy search on any keywords showed up in content or title field

> SELECT SQL_CALC_FOUND_ROWS * FROM articles a

in order to use FOUND_ROWS() build-in function of mysql, SQL_CALC_FOUND_ROWS has to be added to the first select statement.

> err = db.Raw("select found_rows() as count").Scan(&total).Error

calculating total number of search records

p.s.
using raw sql will omit gorm soft delete feature, so it's necessary to add 	deleted_at IS NULL to the search conditions.

<br>
##### SQL_CALC_FOUND_ROWS & FOUND_ROWS()
If we want to paginate search result, the LIMIT keyword will restrict the number of result returned. However, we usually also want to return the total number of matching records, thus we use SQL_CALC_FOUND_ROWS & FOUND_ROWS()  to avoid executing search query one more time.
e.g. mysql
```sql
SELECT SQL_CALC_FOUND_ROWS * FROM tbl_name WHERE id > 100 LIMIT 10;
SELECT FOUND_ROWS（）
```
after the first select statement, we can easily retrieve the total number of matching records by calling FOUND_ROWS（） function, which counted result without implementing LIMIT.

P.S.1
if we omit SQL_CALC_FOUND_ROWS from first select, then FOUND_ROWS（） will return the actual number of record returned from first select.

p.s.2
FOUND_ROWS（）returns a temporary result, and will be ditched after another select statement. so if we want to save the record, we can use
```sql
SELECT SQL_CALC_FOUND_ROWS * FROM ... ;
SET @rows = FOUND_ROWS();
```

## UpdateColumn
Update single column in a table, e.g. add 1 to viewed_count column in article table for each time article got previewed

```go
func (*ArticleService) ViewedTimesPlusOne(articleId int) {
	global.DB.Model(&dbTable.Article{}).Where("ID = ? ", articleId).UpdateColumn("viewed_times", gorm.Expr("viewed_times + ?", 1))
}
```

## Cascade delete
delete a record and its associations in a m2m relations

e.g.
for the following role and menu many2many relations

```go
type Menu struct {
	ID        uint      `json:"id" gorm:"primarykey"`
	Pid       uint      `json:"pid" gorm:"comment:parent id"`
	Name      string    `json:"name" gorm:"comment:route name"`
	Roles     []Role `json:"roles" gorm:"many2many:roleMenu;constraint:OnDelete:CASCADE;"`
	// ChildMenu []Menu `gorm:"foreignkey:Pid;constraint:OnDelete:CASCADE;"`
}

type Role struct {
	ID        uint       `json:"roleId" gorm:"primarykey;comment:role ID;size:90;"`
	ParentId  uint       `json:"parentId" gorm:"comment:parent role id" binding:"required"`
	Children  []Role     `json:"children" gorm:"-"`
	Menus     []Menu     `json:"-" gorm:"many2many:roleMenu"`
}
```
if we want to delete a menu, we also want to delete all its submenus and related role associations to that menu and all its submenus.

To achieve that, we let frontend do the logic work and pass a id array which includes menu id and all its submenus' ids. Then we can delete like this:

```go
func (menuService MenuService) DeleteMenu(id []int) (err error) {
	menus := []dbTable.Menu{}
	for _, v := range id {
		menus = append(menus, dbTable.Menu{ID: uint(v)})
	}
	return global.DB.Select("Roles").Delete(&menus).Error
}

```

However, this approach only works when Menu is ***not set to soft delete*** (without a **deleteAt** field)

***P.S***
If menu has itself as a foreign key (uncomment the ChildMenu field), then we can automatic delete a menu and all its submenus recursively by using:
```go
return global.DB.Where("id = ?", id).Delete(&dbTable.Menu{}).Error
```
However, this approach has its limitations that only it only deleting menu's direct associations (Role and ChildMenu), but not deleting each of their associated Roles (e.g. ChildMenu's Role)

if you have a large number of associated records, when delete using preload() or `constraint:OnDelete:CASCADE;` may cause N+1 problem. This is because GORM will execute a separate query for each associated record to delete them individually.

## Cascade Preload
preload selected fields of grand-children

e.g.
for the following role and menu many2many relations

```go

type Reply struct {
	global.MODEL
	Author        User         `json:"author" gorm:"foreignKey:AuthorID"`
	AuthorID      uint         `json:"authorId" gorm:"comment:foreignKey" binding:"required"`
	ReplyContent  string       `json:"replyContent" gorm:"type:text;comment: reply content of article comment" binding:"required"`
	ParentReplyID *uint        `json:"parentReplyId" gorm:"default:0;comment: parent reply id if exist, otherwise is 0" `
	ParentReply   *Reply       `json:"ParentReply" gorm:"comment: self-referential has one" `
}

```
if we want to include reply's parent reply's author's username, we can do the following:

```go
db.Table("replies").Preload("ParentReply.Author", func(db *gorm.DB) *gorm.DB {
	return db.Select("username,id")
}).
Find(&replyList)

```

***P.S***
always remember to select the foreign key, which in this case, is id (author's id), you can filter out the id field later if not required.
