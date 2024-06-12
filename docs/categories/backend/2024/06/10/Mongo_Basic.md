---
title: Mongo Basic
author: ChocolateAceCream
date: 2024/06/10 19:00
isTop: false
categories:
 - backend
tags:
 - Go
 - MongoDB
 - NoSQL
---

# Mongo Basic <Badge text="MongoDB" type="warning" />

## Main Concepts
### Documents
every piece of records, the basic unit of records, like rows in mysql
### Collection
a collection of documents, like the table in mysql
## Bulk Operation
### Execution order
can be set by passing bulkOptions to BulkWrite(), default is true, which means each operation inside a bulk is executed sequentially in the order they are provided.

```go
bulkOptions := options.BulkWrite().SetOrdered(false)
result, err := collection.BulkWrite(context.Background(), models, bulkOptions)
```

### Benefits of using bulk operations
- Efficiency: since bulk operations wraps multiple operations inside one http request, it reduced the network round-trips between app and db

## Common Operations
### Replace
Replace operations remove all existing fields except for _id in a document and substitute the deleted fields with the new fields and values you specify.
P.S. the field that not present in new document will be replaced with its type's default value, e.g. 0 for int and "" for string. So it's better approach to choose UpdateOne in such scenario
```go
func (u *UserCollection) ReplaceUser(name string, user User) error {
	filter := bson.M{"name": name}
	replacement := user
	r, err := u.Collection.ReplaceOne(context.Background(), filter, replacement)
	fmt.Printf("Matched %v documents and replaced %v documents.\n", r.MatchedCount, r.ModifiedCount)
	return err
}
```

### Update
Update operations change the fields that you specify while leaving other fields and values unchanged.
```go
func (u *UserCollection) UpdateUser(name string) error {
	filter := bson.M{"name": name}
	update := bson.M{"$set": bson.M{"created_at": time.Now()}}
	r, err := u.Collection.UpdateOne(context.Background(), filter, update)
	fmt.Printf("Matched %v documents and updated %v documents.\n", r.MatchedCount, r.ModifiedCount)
	return err
}
```

### Delete
remove documents from your MongoDB collections
```go
func (u *UserCollection) DeleteUser(name string) error {
	filter := bson.M{"name": name}
	r, err := u.Collection.DeleteOne(context.Background(), filter)
	fmt.Printf("Delete %v documents.\n", r.DeletedCount)
	return err
}
```

## BSON
- Binary JSON, human unreadable but efficient in storing and parsing.
- support Date, Binary data type, allows more complex data structures
### Data types in Go
- D: An ordered representation of a BSON document (slice)
- M: An unordered representation of a BSON document (map)
- A: An ordered representation of a BSON array
- E: A single element inside a D type
### Struct Tags
- omitempty: The field will not be marshalled if it is set to the zero value corresponding to the field type. (Only applied when marshalling)
- minsize: If the field is type int64, uint, uint32, or uint64 and the value of the field can fit in a signed int32, the field will be serialized as a BSON int32 rather than a BSON int64. If the value can't fit in a signed int32, this tag is ignored.
- truncate: when unmarshalle float/double type field from BSON to a non-float numeric type, with this tag, value will be truncated at the decimal point.
- inline: If the field type is a struct or map field, the field will be flattened when marshalling and unflattened when unmarshalling.
e.g.
```go
type Address struct {
       Street string
       City   string
       State  string
}
type Student struct {
       FirstName string  `bson:"first_name,omitempty"`
       LastName  string  `bson:"last_name,omitempty"`
       Address   Address `bson:"inline"`
       Age       int
}
coll := client.Database("db").Collection("students")
address1 := Address{ "1 Lakewood Way", "Elwood City", "PA" }
student1 := Student{ FirstName : "Arthur", Address : address1, Age : 8}
_, err = coll.InsertOne(context.TODO(), student1)
```
The corresponding BSON representation looks like this:
```json
{
  "_id" : ObjectId("..."),
  "first_name" : "Arthur",
  "street" : "1 Lakewood Way",
  "city" : "Elwood City",
  "state" : "PA",
  "age" : 8
}
```