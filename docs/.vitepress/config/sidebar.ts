import type { DefaultTheme } from 'vitepress';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { getChineseZodiac, getChineseZodiacAlias } from '../theme/utils.ts';
const sync = fg.sync;

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/categories/frontend/": getItemsByDate("categories/frontend"),
  "/categories/backend/": getItemsByDate("categories/backend"),
  "/categories/DevOps/": getItemsByDate("categories/DevOps"),
  "/categories/IoT/": getItemsByDate("categories/IoT"),

  "/courses/MySQL/": getItems("courses/MySQL"),
  "/courses/Orchestrator/": getItems("courses/Orchestrator"),
  "/courses/InterviewQuestions/": getItems("courses/InterviewQuestions"),
  "/courses/AWS/": getItems("courses/AWS"),
  // "/courses/mybatis/": getItems("courses/mybatis"),
};

/**
 * 根据 某分类/YYYY/MM/dd/xxx.md 的目录格式, 获取侧边栏分组及分组下标题
 *
 * /categories/issues/2022/07/20/xxx.md
 *
 * @param path 扫描基础路径
 * @returns {DefaultTheme.SidebarItem[]}
 */
function getItemsByDate (path: string) {
  // 侧边栏年份分组数组
  let yearGroups: DefaultTheme.SidebarItem[] = [];
  // 置顶数组
  let topArticleItems: DefaultTheme.SidebarItem[] = [];

  // 1.获取所有年份目录
  sync(`docs/${path}/*`, {
    onlyDirectories: true,
    objectMode: true,
  }).forEach(({ name }) => {
    let year = name;
    // 年份数组
    let articleItems: DefaultTheme.SidebarItem[] = [];

    // 2.获取所有月份目录
    sync(`docs/${path}/${year}/*`, {
      onlyDirectories: true,
      objectMode: true,
    }).forEach(({ name }) => {
      let month = name

      // 3.获取所有日期目录
      sync(`docs/${path}/${year}/${month}/*`, {
        onlyDirectories: true,
        objectMode: true,
      }).forEach(({ name }) => {
        let day = name;
        // 4.获取日期目录下的所有文章
        sync(`docs/${path}/${year}/${month}/${day}/*`, {
          onlyFiles: true,
          objectMode: true,
        }).forEach((article) => {
          const articleFile = matter.read(`${article.path}`);
          const { data } = articleFile;
          if (data.isTop) {
            // 向置顶分组前追加标题
            topArticleItems.unshift({
              text: data.title,
              link: `/${path}/${year}/${month}/${day}/${article.name.replace('.md', '')}`,
            });
          }

          // 向年份分组前追加标题
          articleItems.unshift({
            text: data.title,
            link: `/${path}/${year}/${month}/${day}/${article.name.replace('.md', '')}`,
          });
        })
      })
    })

    // 添加年份分组
    yearGroups.unshift({
      text: `<img class="chinese-zodiac" style="position: static; vertical-align: middle; padding-bottom: 3px;" src="/img/svg/chinese-zodiac/${getChineseZodiac(
        year.replace("年", "")
      )}.svg" title="${getChineseZodiacAlias(
        year.replace("年", "")
      )}" alt="生肖">
            ${year} total: ${articleItems.length}`,
      items: articleItems,
      collapsed: true,
    });
  })

  if (topArticleItems.length > 0) {
    // 添加置顶分组
    yearGroups.unshift({
      text: `<svg style="display: inline-block; vertical-align: middle; padding-bottom: 3px;" viewBox="0 0 1920 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path d="M367.488 667.904h423.744v47.232H367.488v-47.232zM320.256 204.352h137.28v68.992h-137.28v-68.992zM367.488 754.112h423.744v48H367.488v-48zM693.76 204.352h137.984v68.992H693.76v-68.992zM507.008 204.352h137.28v68.992h-137.28v-68.992z" p-id="10749" fill="#d81e06"></path><path d="M1344 192 256 192C185.6 192 128 249.6 128 320l0 448c0 70.4 57.6 128 128 128l1088 0c70.4 0 128-57.6 128-128L1472 320C1472 249.6 1414.4 192 1344 192zM576 736C576 753.92 561.92 768 544 768S512 753.92 512 736L512 576 320 576l0 160C320 753.92 305.92 768 288 768 270.08 768 256 753.92 256 736l0-384C256 334.08 270.08 320 288 320 305.92 320 320 334.08 320 352L320 512l192 0L512 352C512 334.08 526.08 320 544 320S576 334.08 576 352L576 736zM960 640c0 70.4-57.6 128-128 128l-64 0c-70.4 0-128-57.6-128-128L640 448c0-70.4 57.6-128 128-128l64 0c70.4 0 128 57.6 128 128L960 640zM1312 384 1216 384l0 352c0 17.92-14.08 32-32 32S1152 753.92 1152 736L1152 384l-96 0C1038.08 384 1024 369.92 1024 352 1024 334.08 1038.08 320 1056 320l256 0C1329.92 320 1344 334.08 1344 352 1344 369.92 1329.92 384 1312 384zM832 384l-64 0c-35.2 0-64 28.8-64 64l0 192c0 35.2 28.8 64 64 64l64 0c35.2 0 64-28.8 64-64L896 448C896 412.8 867.2 384 832 384z" p-id="1492" fill="#d81e06"></path><path d="M367.488 495.36h423.744v47.232H367.488V495.36zM367.488 581.632h423.744v47.232H367.488v-47.232z" p-id="10751" fill="#d81e06"></path></svg>
            Top Articles: ${topArticleItems.length}`,
      items: topArticleItems,
      collapsed: false,
    });

    // 将最近年份分组展开
    yearGroups[1].collapsed = false;
  } else {
    // 将最近年份分组展开
    yearGroups[0].collapsed = false;
  }

  // 添加序号
  addOrderNumber(yearGroups);
  console.log(yearGroups);
  return yearGroups;
}

/**
 * 根据 某小课/序号-分组/序号-xxx.md 的目录格式, 获取侧边栏分组及分组下标题
 *
 * courses/mybatis/01-MyBatis基础/01-xxx.md
 *
 * @param path 扫描基础路径
 * @returns {DefaultTheme.SidebarItem[]}
 */
function getItems (path: string) {
  // 侧边栏分组数组
  let groups: DefaultTheme.SidebarItem[] = [];
  // 侧边栏分组下标题数组
  let items: DefaultTheme.SidebarItem[] = [];
  let total = 0;
  // 当分组内文章数量少于 2 篇或文章总数显示超过 20 篇时，自动折叠分组
  const groupCollapsedSize = 2;
  const titleCollapsedSize = 20;

  // 1.获取所有分组目录
  sync(`docs/${path}/*`, {
    onlyDirectories: true,
    objectMode: true,
  }).forEach(({ name }) => {
    let groupName = name;
    // 2.获取分组下的所有文章
    sync(`docs/${path}/${groupName}/*`, {
      onlyFiles: true,
      objectMode: true,
    }).forEach((article) => {
      const articleFile = matter.read(`${article.path}`);
      const { data } = articleFile;
      // 向前追加标题
      items.push({
        text: data.title,
        link: `/${path}/${groupName}/${article.name.replace('.md', '')}`,
      });
      total += 1;
    })

    // 3.向前追加到分组
    // 当分组内文章数量少于 A 篇或文章总数显示超过 B 篇时，自动折叠分组
    groups.push({
      text: `${groupName.substring(groupName.indexOf('-') + 1)} (${items.length})`,
      items: items,
      collapsed: items.length < groupCollapsedSize || total > titleCollapsedSize,
    })

    // 4.清空侧边栏分组下标题数组
    items = [];
  })

  // 添加序号
  addOrderNumber(groups);
  return groups;
}


/**
 * 添加序号
 *
 * @param groups 分组数据
 */
function addOrderNumber(groups) {
  for (let i = 0; i < groups.length; i++) {
    for (let j = 0; j < groups[i].items.length; j++) {
      const items = groups[i].items;
      const index = j + 1;
      let indexStyle = `<div class="text-color-gray mr-[6px]" style="font-weight: 550; display: inline-block;">${index}</div>`;
      if (index == 1) {
        indexStyle = `<div class="text-color-red mr-[6px]" style="font-weight: 550; display: inline-block;">${index}</div>`;
      } else if (index == 2) {
        indexStyle = `<div class="text-color-orange mr-[6px]" style="font-weight: 550; display: inline-block;">${index}</div>`;
      } else if (index == 3) {
        indexStyle = `<div class="text-color-yellow mr-[6px]" style="font-weight: 550; display: inline-block;">${index}</div>`;
      }
      items[j].text = `${indexStyle}${items[j].text}`;
    }
  }
}