import type { DefaultTheme } from 'vitepress';
import { nav } from './nav';
import { sidebar } from './sidebar';
import { algoliaSearchOptions } from './search/algolia-search';
import { localSearchOptions } from './search/local-search';

export const themeConfig: DefaultTheme.Config = {
  nav, // 导航栏配置
  sidebar, // 侧边栏配置

  logo: "/logo.png",
  outline: {
    level: "deep", // 右侧大纲标题层级
    label: "Table of Content", // 右侧大纲标题文本配置
  },
  darkModeSwitchLabel: "switch light/dark mode",
  sidebarMenuLabel: "Article",
  returnToTopLabel: "Back to Top",
  lastUpdatedText: "Last Update", // 最后更新时间文本配置, 需先配置lastUpdated为true
  // 文档页脚文本配置
  docFooter: {
    prev: "Previous",
    next: "Next",
  },
  // 编辑链接配置
  editLink: {
    pattern:
      "https://github.com/ChocolateAceCream/vuepress-blog/edit/main/docs/:path",
    text: "Please help me improve this page!",
  },
  // 搜索配置（二选一）
  search: {
    provider: "algolia",
    options: algoliaSearchOptions,
    // 本地离线搜索
    // provider: 'local',
    // options: localSearchOptions
  },
  // 导航栏右侧社交链接配置
  socialLinks: [
    { icon: "github", link: "https://github.com/ChocolateAceCream" },
    // {
    //   icon: {
    //     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>码云</title><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>',
    //   },
    //   link: "https://gitee.com/Charles7c/charles7c",
    // },
    {
      icon: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
      },
      link: "https://www.linkedin.com/in/di-sheng-4b69b280/",
    },
  ],

  // 自定义扩展: 文章元数据配置
  // @ts-ignore
  articleMetadataConfig: {
    author: "Di", // 文章全局默认作者名称
    authorLink: "/about/me", // 点击作者名时默认跳转的链接
    showViewCount: false, // 是否显示文章阅读数, 需要在 docs/.vitepress/theme/api/config.js 及 interface.js 配置好相应 API 接口
  },
  // 自定义扩展: 文章版权配置
  copyrightConfig: {
    license: "CC BY-SA 4.0 DEED",
    licenseLink: "http://creativecommons.org/licenses/by-sa/4.0/",
  },
  // 自定义扩展: 评论配置
  commentConfig: {
    type: "gitalk",
    showComment: false, // 是否显示评论
  },
  // 自定义扩展: 页脚配置
  footerConfig: {
    showFooter: false, // 是否显示页脚
    icpRecordCode: "津ICP备2022005864号-2", // ICP备案号
    publicSecurityRecordCode: "津公网安备12011202000677号", // 联网备案号
    copyright: `Copyright © 2019-${new Date().getFullYear()} Charles7c`, // 版权信息
  },
};