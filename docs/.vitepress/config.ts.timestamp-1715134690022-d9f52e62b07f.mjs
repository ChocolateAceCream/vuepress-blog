// docs/.vitepress/config.ts
import { defineConfig } from "file:///root/vuepress-blog/node_modules/.pnpm/vitepress@1.0.0-rc.31_@algolia+client-search@4.20.0_@types+node@18.15.11_axios@1.6.2_markdown_3ihojrnl7j5b56eaagn757dxkm/node_modules/vitepress/dist/node/index.js";
import { withMermaid } from "file:///root/vuepress-blog/node_modules/.pnpm/vitepress-plugin-mermaid@2.0.8_mermaid@9.3.0_vite-plugin-md@0.22.5_@vitejs+plugin-vue@4.5.0_v_2qtpcmshk7bymo6neklmcpdy54/node_modules/vitepress-plugin-mermaid/dist/vitepress-plugin-mermaid.es.mjs";

// docs/.vitepress/config/constants.ts
var site = "https://blog.charles7c.top";
var metaData = {
  lang: "zh-CN",
  locale: "zh_CN",
  title: "Di's Knowledge Base",
  description: "Personal Technical Knowledge Base, recording and sharing personal fragmented, structured, and systematic technical knowledge content",
  site,
  image: `${site}/logo.jpg`
};

// docs/.vitepress/config/head.ts
var head = [
  ["link", { rel: "icon", href: "/favicon.ico" }],
  ["meta", { name: "author", content: "Charles7c" }],
  ["meta", { name: "keywords", content: "\u67E5\u5C14\u65AF\u7684\u77E5\u8BC6\u5E93, \u77E5\u8BC6\u5E93, \u535A\u5BA2, Charles7c" }],
  ["meta", { name: "HandheldFriendly", content: "True" }],
  ["meta", { name: "MobileOptimized", content: "320" }],
  ["meta", { name: "theme-color", content: "#3c8772" }],
  ["meta", { property: "og:type", content: "website" }],
  ["meta", { property: "og:locale", content: metaData.locale }],
  ["meta", { property: "og:title", content: metaData.title }],
  ["meta", { property: "og:description", content: metaData.description }],
  ["meta", { property: "og:site", content: metaData.site }],
  ["meta", { property: "og:site_name", content: metaData.title }],
  ["meta", { property: "og:image", content: metaData.image }],
  // 百度统计代码：https://tongji.baidu.com
  ["script", {}, `var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?53af4b1a12fbe40810ca7ad39f8db9c7";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();`]
  // 页面访问量统计
  // ['script', {}, `
  // window.addEventListener('load', function() {
  //   let oldHref = document.location.href, bodyDOM = document.querySelector('body');
  //   const observer = new MutationObserver(function(mutations) {
  //     if (oldHref != document.location.href) {
  //       oldHref = document.location.href;
  //       getPv()
  //       window.requestAnimationFrame(function() {
  //         let tmp = document.querySelector('body');
  //         if(tmp != bodyDOM) {
  //           bodyDOM = tmp;
  //           observer.observe(bodyDOM, config);
  //         }
  //       })
  //     }
  //   });
  //   const config = {
  //     childList: true,
  //     subtree: true
  //   };
  //   observer.observe(bodyDOM, config);
  //   getPv()
  // }, true);
  // function getPv() {
  //   xhr = new XMLHttpRequest();
  //   xhr.open('GET', 'https://api.charles7c.top/blog/pv?pageUrl=' + location.href);
  //   xhr.send();
  // }`]
];

// docs/.vitepress/config/markdown.ts
import mathjax3 from "file:///root/vuepress-blog/node_modules/.pnpm/markdown-it-mathjax3@4.3.2_encoding@0.1.13/node_modules/markdown-it-mathjax3/index.js";
import footnote from "file:///root/vuepress-blog/node_modules/.pnpm/markdown-it-footnote@3.0.3/node_modules/markdown-it-footnote/index.js";
var markdown = {
  // Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed"
  },
  // lineNumbers: true, // 启用行号
  config: (md) => {
    md.use(mathjax3);
    md.use(footnote);
    md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
      let htmlResult = slf.renderToken(tokens, idx, options);
      if (tokens[idx].tag === "h1")
        htmlResult += `
<ClientOnly><ArticleMetadata v-if="($frontmatter?.aside ?? true) && ($frontmatter?.showArticleMetadata ?? true)" :article="$frontmatter" /></ClientOnly>`;
      return htmlResult;
    };
  }
};

// docs/.vitepress/config/nav.ts
var nav = [
  {
    text: "Categories",
    items: [
      {
        text: "Frontend",
        link: "/categories/frontend/index",
        activeMatch: "/categories/frontend/"
      },
      {
        text: "Backend",
        link: "/categories/backend/index",
        activeMatch: "/categories/backend/"
      },
      {
        text: "DevOps",
        link: "/categories/DevOps/index",
        activeMatch: "/categories/DevOps/"
      },
      {
        text: "IoT",
        link: "/categories/IoT/index",
        activeMatch: "/categories/IoT/"
      }
    ],
    activeMatch: "/categories/"
  },
  {
    text: "Readings",
    items: [
      {
        text: "Azure",
        link: "/courses/Azure/index",
        activeMatch: "/courses/Azure/"
      },
      {
        text: "MySQL",
        link: "/courses/MySQL/index",
        activeMatch: "/courses/MySQL/"
      },
      {
        text: "Orchestrator",
        link: "/courses/Orchestrator/index",
        activeMatch: "/courses/Orchestrator/"
      },
      {
        text: "Interview Questions",
        link: "/courses/InterviewQuestions/index",
        activeMatch: "/courses/InterviewQuestions/"
      },
      {
        text: "AWS Certification",
        link: "/courses/AWS/index",
        activeMatch: "/courses/AWS/"
      }
      // {
      //   text: "MyBatis快速入门",
      //   link: "/courses/mybatis/index",
      //   activeMatch: "/courses/mybatis/",
      // },
    ],
    activeMatch: "/courses/"
  },
  {
    text: "Tags",
    link: "/tags",
    activeMatch: "/tags"
  },
  {
    text: "Archives",
    link: "/archives",
    activeMatch: "/archives"
  },
  {
    text: "About Me",
    link: "/about/me",
    activeMatch: "/about/me"
  }
];

// docs/.vitepress/config/sidebar.ts
import fg from "file:///root/vuepress-blog/node_modules/.pnpm/fast-glob@3.3.2/node_modules/fast-glob/out/index.js";
import matter from "file:///root/vuepress-blog/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";

// docs/.vitepress/theme/utils.ts
function getChineseZodiac(year) {
  const arr = ["monkey", "rooster", "dog", "pig", "rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat"];
  return arr[year % 12];
}
function getChineseZodiacAlias(year) {
  const arr = ["\u7334\u5E74", "\u9E21\u5E74", "\u72D7\u5E74", "\u732A\u5E74", "\u9F20\u5E74", "\u725B\u5E74", "\u864E\u5E74", "\u5154\u5E74", "\u9F99\u5E74", "\u86C7\u5E74", "\u9A6C\u5E74", "\u7F8A\u5E74"];
  return arr[year % 12];
}

// docs/.vitepress/config/sidebar.ts
var sync = fg.sync;
var sidebar = {
  "/categories/frontend/": getItemsByDate("categories/frontend"),
  "/categories/backend/": getItemsByDate("categories/backend"),
  "/categories/DevOps/": getItemsByDate("categories/DevOps"),
  "/categories/IoT/": getItemsByDate("categories/IoT"),
  "/courses/MySQL/": getItems("courses/MySQL"),
  "/courses/Orchestrator/": getItems("courses/Orchestrator"),
  "/courses/InterviewQuestions/": getItems("courses/InterviewQuestions"),
  "/courses/AWS/": getItems("courses/AWS")
  // "/courses/mybatis/": getItems("courses/mybatis"),
};
function getItemsByDate(path) {
  let yearGroups = [];
  let topArticleItems = [];
  sync(`docs/${path}/*`, {
    onlyDirectories: true,
    objectMode: true
  }).forEach(({ name }) => {
    let year = name;
    let articleItems = [];
    sync(`docs/${path}/${year}/*`, {
      onlyDirectories: true,
      objectMode: true
    }).forEach(({ name: name2 }) => {
      let month = name2;
      sync(`docs/${path}/${year}/${month}/*`, {
        onlyDirectories: true,
        objectMode: true
      }).forEach(({ name: name3 }) => {
        let day = name3;
        sync(`docs/${path}/${year}/${month}/${day}/*`, {
          onlyFiles: true,
          objectMode: true
        }).forEach((article) => {
          const articleFile = matter.read(`${article.path}`);
          const { data } = articleFile;
          if (data.isTop) {
            topArticleItems.unshift({
              text: data.title,
              link: `/${path}/${year}/${month}/${day}/${article.name.replace(".md", "")}`
            });
          }
          articleItems.unshift({
            text: data.title,
            link: `/${path}/${year}/${month}/${day}/${article.name.replace(".md", "")}`
          });
        });
      });
    });
    yearGroups.unshift({
      text: `<img class="chinese-zodiac" style="position: static; vertical-align: middle; padding-bottom: 3px;" src="/vuepress-blog/img/svg/chinese-zodiac/${getChineseZodiac(
        year.replace("\u5E74", "")
      )}.svg" title="${getChineseZodiacAlias(
        year.replace("\u5E74", "")
      )}" alt="\u751F\u8096">
            ${year} total: ${articleItems.length}`,
      items: articleItems,
      collapsed: false
      // collapsed: true,
    });
  });
  if (topArticleItems.length > 0) {
    yearGroups.unshift({
      text: `<svg style="display: inline-block; vertical-align: middle; padding-bottom: 3px;" viewBox="0 0 1920 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path d="M367.488 667.904h423.744v47.232H367.488v-47.232zM320.256 204.352h137.28v68.992h-137.28v-68.992zM367.488 754.112h423.744v48H367.488v-48zM693.76 204.352h137.984v68.992H693.76v-68.992zM507.008 204.352h137.28v68.992h-137.28v-68.992z" p-id="10749" fill="#d81e06"></path><path d="M1344 192 256 192C185.6 192 128 249.6 128 320l0 448c0 70.4 57.6 128 128 128l1088 0c70.4 0 128-57.6 128-128L1472 320C1472 249.6 1414.4 192 1344 192zM576 736C576 753.92 561.92 768 544 768S512 753.92 512 736L512 576 320 576l0 160C320 753.92 305.92 768 288 768 270.08 768 256 753.92 256 736l0-384C256 334.08 270.08 320 288 320 305.92 320 320 334.08 320 352L320 512l192 0L512 352C512 334.08 526.08 320 544 320S576 334.08 576 352L576 736zM960 640c0 70.4-57.6 128-128 128l-64 0c-70.4 0-128-57.6-128-128L640 448c0-70.4 57.6-128 128-128l64 0c70.4 0 128 57.6 128 128L960 640zM1312 384 1216 384l0 352c0 17.92-14.08 32-32 32S1152 753.92 1152 736L1152 384l-96 0C1038.08 384 1024 369.92 1024 352 1024 334.08 1038.08 320 1056 320l256 0C1329.92 320 1344 334.08 1344 352 1344 369.92 1329.92 384 1312 384zM832 384l-64 0c-35.2 0-64 28.8-64 64l0 192c0 35.2 28.8 64 64 64l64 0c35.2 0 64-28.8 64-64L896 448C896 412.8 867.2 384 832 384z" p-id="1492" fill="#d81e06"></path><path d="M367.488 495.36h423.744v47.232H367.488V495.36zM367.488 581.632h423.744v47.232H367.488v-47.232z" p-id="10751" fill="#d81e06"></path></svg>
            Top Articles: ${topArticleItems.length}`,
      items: topArticleItems,
      collapsed: false
    });
    yearGroups[1].collapsed = false;
  } else {
    yearGroups[0].collapsed = false;
  }
  addOrderNumber(yearGroups);
  console.log(yearGroups);
  return yearGroups;
}
function getItems(path) {
  let groups = [];
  let items = [];
  let total = 0;
  const groupCollapsedSize = 2;
  const titleCollapsedSize = 20;
  sync(`docs/${path}/*`, {
    onlyDirectories: true,
    objectMode: true
  }).forEach(({ name }) => {
    let groupName = name;
    sync(`docs/${path}/${groupName}/*`, {
      onlyFiles: true,
      objectMode: true
    }).forEach((article) => {
      const articleFile = matter.read(`${article.path}`);
      const { data } = articleFile;
      items.push({
        text: data.title,
        link: `/${path}/${groupName}/${article.name.replace(".md", "")}`
      });
      total += 1;
    });
    groups.push({
      text: `${groupName.substring(groupName.indexOf("-") + 1)} (${items.length})`,
      items,
      collapsed: false
      // collapsed: items.length < groupCollapsedSize || total > titleCollapsedSize,
    });
    items = [];
  });
  addOrderNumber(groups);
  return groups;
}
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

// docs/.vitepress/config/search/algolia-search.ts
var algoliaSearchOptions = {
  appId: "NPACNVUDPP",
  apiKey: "f31fc5a46754a4027965646a0d709e4e",
  indexName: "charles7c",
  locales: {
    root: {
      placeholder: "Search",
      translations: {
        button: {
          buttonText: "Search",
          buttonAriaLabel: "Search"
        },
        modal: {
          searchBox: {
            resetButtonTitle: "Clear search query",
            resetButtonAriaLabel: "Clear search query",
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "Cancel"
          },
          startScreen: {
            recentSearchesTitle: "Search History",
            noRecentSearchesText: "No recent searches",
            saveRecentSearchButtonTitle: "Save recent search",
            removeRecentSearchButtonTitle: "Remove recent search",
            favoriteSearchesTitle: "Favorites",
            removeFavoriteSearchButtonTitle: "Remove from favorite"
          },
          errorScreen: {
            titleText: "Error",
            helpText: "Please try again later"
          },
          footer: {
            selectText: "Select",
            navigateText: "Switch",
            closeText: "Close",
            searchByText: "Provider"
          },
          noResultsScreen: {
            noResultsText: "No results found",
            suggestedQueryText: "Did you mean",
            reportMissingResultsText: "Report missing results",
            reportMissingResultsLinkText: "here"
          }
        }
      }
    }
  }
};

// docs/.vitepress/config/theme.ts
var themeConfig = {
  nav,
  // 导航栏配置
  sidebar,
  // 侧边栏配置
  logo: "/logo.png",
  outline: {
    level: "deep",
    // 右侧大纲标题层级
    label: "Table of Content"
    // 右侧大纲标题文本配置
  },
  darkModeSwitchLabel: "switch light/dark mode",
  sidebarMenuLabel: "Article",
  returnToTopLabel: "Back to Top",
  lastUpdatedText: "Last Update",
  // 最后更新时间文本配置, 需先配置lastUpdated为true
  // 文档页脚文本配置
  docFooter: {
    prev: "Previous",
    next: "Next"
  },
  // 编辑链接配置
  editLink: {
    pattern: "https://github.com/ChocolateAceCream/vuepress-blog/edit/main/docs/:path",
    text: "Please help me improve this page!"
  },
  // 搜索配置（二选一）
  search: {
    provider: "algolia",
    options: algoliaSearchOptions
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
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
      },
      link: "https://www.linkedin.com/in/di-sheng-4b69b280/"
    }
  ],
  // 自定义扩展: 文章元数据配置
  // @ts-ignore
  articleMetadataConfig: {
    author: "Di",
    // 文章全局默认作者名称
    authorLink: "/about/me",
    // 点击作者名时默认跳转的链接
    showViewCount: false
    // 是否显示文章阅读数, 需要在 docs/.vitepress/theme/api/config.js 及 interface.js 配置好相应 API 接口
  },
  // 自定义扩展: 文章版权配置
  copyrightConfig: {
    license: "CC BY-SA 4.0 DEED",
    licenseLink: "http://creativecommons.org/licenses/by-sa/4.0/"
  },
  // 自定义扩展: 评论配置
  commentConfig: {
    type: "gitalk",
    showComment: false
    // 是否显示评论
  },
  // 自定义扩展: 页脚配置
  footerConfig: {
    showFooter: false,
    // 是否显示页脚
    icpRecordCode: "\u6D25ICP\u59072022005864\u53F7-2",
    // ICP备案号
    publicSecurityRecordCode: "\u6D25\u516C\u7F51\u5B89\u590712011202000677\u53F7",
    // 联网备案号
    copyright: `Copyright \xA9 2019-${(/* @__PURE__ */ new Date()).getFullYear()} Charles7c`
    // 版权信息
  }
};

// docs/.vitepress/config.ts
var config_default = withMermaid(
  defineConfig({
    base: "/vuepress-blog/",
    lang: metaData.lang,
    title: metaData.title,
    description: metaData.description,
    cleanUrls: false,
    // include html extension
    lastUpdated: true,
    // 显示最后更新时间
    head,
    // <head>内标签配置
    markdown,
    // Markdown配置
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => customElements.includes(tag)
        }
      }
    },
    themeConfig
    // 主题配置
  })
);
var customElements = [
  "mjx-container",
  "mjx-assistive-mml",
  "math",
  "maction",
  "maligngroup",
  "malignmark",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mi",
  "mlongdiv",
  "mmultiscripts",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "ms",
  "mscarries",
  "mscarry",
  "mscarries",
  "msgroup",
  "mstack",
  "mlongdiv",
  "msline",
  "mstack",
  "mspace",
  "msqrt",
  "msrow",
  "mstack",
  "mstack",
  "mstyle",
  "msub",
  "msup",
  "msubsup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "semantics",
  "math",
  "mi",
  "mn",
  "mo",
  "ms",
  "mspace",
  "mtext",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "msqrt",
  "mstyle",
  "mmultiscripts",
  "mover",
  "mprescripts",
  "msub",
  "msubsup",
  "msup",
  "munder",
  "munderover",
  "none",
  "maligngroup",
  "malignmark",
  "mtable",
  "mtd",
  "mtr",
  "mlongdiv",
  "mscarries",
  "mscarry",
  "msgroup",
  "msline",
  "msrow",
  "mstack",
  "maction",
  "semantics",
  "annotation",
  "annotation-xml"
];
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy50cyIsICJkb2NzLy52aXRlcHJlc3MvY29uZmlnL2NvbnN0YW50cy50cyIsICJkb2NzLy52aXRlcHJlc3MvY29uZmlnL2hlYWQudHMiLCAiZG9jcy8udml0ZXByZXNzL2NvbmZpZy9tYXJrZG93bi50cyIsICJkb2NzLy52aXRlcHJlc3MvY29uZmlnL25hdi50cyIsICJkb2NzLy52aXRlcHJlc3MvY29uZmlnL3NpZGViYXIudHMiLCAiZG9jcy8udml0ZXByZXNzL3RoZW1lL3V0aWxzLnRzIiwgImRvY3MvLnZpdGVwcmVzcy9jb25maWcvc2VhcmNoL2FsZ29saWEtc2VhcmNoLnRzIiwgImRvY3MvLnZpdGVwcmVzcy9jb25maWcvdGhlbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9yb290L3Z1ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5pbXBvcnQgeyB3aXRoTWVybWFpZCB9IGZyb20gJ3ZpdGVwcmVzcy1wbHVnaW4tbWVybWFpZCc7XG5pbXBvcnQgeyBtZXRhRGF0YSB9IGZyb20gJy4vY29uZmlnL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBoZWFkIH0gZnJvbSAnLi9jb25maWcvaGVhZCc7XG5pbXBvcnQgeyBtYXJrZG93biB9IGZyb20gJy4vY29uZmlnL21hcmtkb3duJztcbmltcG9ydCB7IHRoZW1lQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvdGhlbWUnO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoTWVybWFpZChcbiAgZGVmaW5lQ29uZmlnKHtcbiAgICBiYXNlOiBcIi92dWVwcmVzcy1ibG9nL1wiLFxuICAgIGxhbmc6IG1ldGFEYXRhLmxhbmcsXG4gICAgdGl0bGU6IG1ldGFEYXRhLnRpdGxlLFxuICAgIGRlc2NyaXB0aW9uOiBtZXRhRGF0YS5kZXNjcmlwdGlvbixcblxuICAgIGNsZWFuVXJsczogZmFsc2UsIC8vIGluY2x1ZGUgaHRtbCBleHRlbnNpb25cbiAgICBsYXN0VXBkYXRlZDogdHJ1ZSwgLy8gXHU2NjNFXHU3OTNBXHU2NzAwXHU1NDBFXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0XG5cbiAgICBoZWFkLCAvLyA8aGVhZD5cdTUxODVcdTY4MDdcdTdCN0VcdTkxNERcdTdGNkVcbiAgICBtYXJrZG93bjogbWFya2Rvd24sIC8vIE1hcmtkb3duXHU5MTREXHU3RjZFXG4gICAgdnVlOiB7XG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+IGN1c3RvbUVsZW1lbnRzLmluY2x1ZGVzKHRhZyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdGhlbWVDb25maWcsIC8vIFx1NEUzQlx1OTg5OFx1OTE0RFx1N0Y2RVxuICB9KVxuKTtcblxuY29uc3QgY3VzdG9tRWxlbWVudHMgPSBbXG4gICdtangtY29udGFpbmVyJyxcbiAgJ21qeC1hc3Npc3RpdmUtbW1sJyxcbiAgJ21hdGgnLFxuICAnbWFjdGlvbicsXG4gICdtYWxpZ25ncm91cCcsXG4gICdtYWxpZ25tYXJrJyxcbiAgJ21lbmNsb3NlJyxcbiAgJ21lcnJvcicsXG4gICdtZmVuY2VkJyxcbiAgJ21mcmFjJyxcbiAgJ21pJyxcbiAgJ21sb25nZGl2JyxcbiAgJ21tdWx0aXNjcmlwdHMnLFxuICAnbW4nLFxuICAnbW8nLFxuICAnbW92ZXInLFxuICAnbXBhZGRlZCcsXG4gICdtcGhhbnRvbScsXG4gICdtcm9vdCcsXG4gICdtcm93JyxcbiAgJ21zJyxcbiAgJ21zY2FycmllcycsXG4gICdtc2NhcnJ5JyxcbiAgJ21zY2FycmllcycsXG4gICdtc2dyb3VwJyxcbiAgJ21zdGFjaycsXG4gICdtbG9uZ2RpdicsXG4gICdtc2xpbmUnLFxuICAnbXN0YWNrJyxcbiAgJ21zcGFjZScsXG4gICdtc3FydCcsXG4gICdtc3JvdycsXG4gICdtc3RhY2snLFxuICAnbXN0YWNrJyxcbiAgJ21zdHlsZScsXG4gICdtc3ViJyxcbiAgJ21zdXAnLFxuICAnbXN1YnN1cCcsXG4gICdtdGFibGUnLFxuICAnbXRkJyxcbiAgJ210ZXh0JyxcbiAgJ210cicsXG4gICdtdW5kZXInLFxuICAnbXVuZGVyb3ZlcicsXG4gICdzZW1hbnRpY3MnLFxuICAnbWF0aCcsXG4gICdtaScsXG4gICdtbicsXG4gICdtbycsXG4gICdtcycsXG4gICdtc3BhY2UnLFxuICAnbXRleHQnLFxuICAnbWVuY2xvc2UnLFxuICAnbWVycm9yJyxcbiAgJ21mZW5jZWQnLFxuICAnbWZyYWMnLFxuICAnbXBhZGRlZCcsXG4gICdtcGhhbnRvbScsXG4gICdtcm9vdCcsXG4gICdtcm93JyxcbiAgJ21zcXJ0JyxcbiAgJ21zdHlsZScsXG4gICdtbXVsdGlzY3JpcHRzJyxcbiAgJ21vdmVyJyxcbiAgJ21wcmVzY3JpcHRzJyxcbiAgJ21zdWInLFxuICAnbXN1YnN1cCcsXG4gICdtc3VwJyxcbiAgJ211bmRlcicsXG4gICdtdW5kZXJvdmVyJyxcbiAgJ25vbmUnLFxuICAnbWFsaWduZ3JvdXAnLFxuICAnbWFsaWdubWFyaycsXG4gICdtdGFibGUnLFxuICAnbXRkJyxcbiAgJ210cicsXG4gICdtbG9uZ2RpdicsXG4gICdtc2NhcnJpZXMnLFxuICAnbXNjYXJyeScsXG4gICdtc2dyb3VwJyxcbiAgJ21zbGluZScsXG4gICdtc3JvdycsXG4gICdtc3RhY2snLFxuICAnbWFjdGlvbicsXG4gICdzZW1hbnRpY3MnLFxuICAnYW5ub3RhdGlvbicsXG4gICdhbm5vdGF0aW9uLXhtbCcsXG5dOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvY29uc3RhbnRzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9yb290L3Z1ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9jb25zdGFudHMudHNcIjtjb25zdCBzaXRlID0gJ2h0dHBzOi8vYmxvZy5jaGFybGVzN2MudG9wJztcblxuZXhwb3J0IGNvbnN0IG1ldGFEYXRhID0ge1xuICBsYW5nOiBcInpoLUNOXCIsXG4gIGxvY2FsZTogXCJ6aF9DTlwiLFxuICB0aXRsZTogXCJEaSdzIEtub3dsZWRnZSBCYXNlXCIsXG4gIGRlc2NyaXB0aW9uOlxuICAgIFwiUGVyc29uYWwgVGVjaG5pY2FsIEtub3dsZWRnZSBCYXNlLCByZWNvcmRpbmcgYW5kIHNoYXJpbmcgcGVyc29uYWwgZnJhZ21lbnRlZCwgc3RydWN0dXJlZCwgYW5kIHN5c3RlbWF0aWMgdGVjaG5pY2FsIGtub3dsZWRnZSBjb250ZW50XCIsXG4gIHNpdGUsXG4gIGltYWdlOiBgJHtzaXRlfS9sb2dvLmpwZ2AsXG59OyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvaGVhZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvaGVhZC50c1wiO2ltcG9ydCB0eXBlIHsgSGVhZENvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5pbXBvcnQgeyBtZXRhRGF0YSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IGhlYWQ6IEhlYWRDb25maWdbXSA9IFtcbiAgWydsaW5rJywgeyByZWw6ICdpY29uJywgaHJlZjogJy9mYXZpY29uLmljbycgfV0sXG4gIFsnbWV0YScsIHsgbmFtZTogJ2F1dGhvcicsIGNvbnRlbnQ6ICdDaGFybGVzN2MnIH1dLFxuICBbJ21ldGEnLCB7IG5hbWU6ICdrZXl3b3JkcycsIGNvbnRlbnQ6ICdcdTY3RTVcdTVDMTRcdTY1QUZcdTc2ODRcdTc3RTVcdThCQzZcdTVFOTMsIFx1NzdFNVx1OEJDNlx1NUU5MywgXHU1MzVBXHU1QkEyLCBDaGFybGVzN2MnIH1dLFxuXG4gIFsnbWV0YScsIHsgbmFtZTogJ0hhbmRoZWxkRnJpZW5kbHknLCBjb250ZW50OiAnVHJ1ZScgfV0sXG4gIFsnbWV0YScsIHsgbmFtZTogJ01vYmlsZU9wdGltaXplZCcsIGNvbnRlbnQ6ICczMjAnIH1dLFxuICBbJ21ldGEnLCB7IG5hbWU6ICd0aGVtZS1jb2xvcicsIGNvbnRlbnQ6ICcjM2M4NzcyJyB9XSxcblxuICBbJ21ldGEnLCB7IHByb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICd3ZWJzaXRlJyB9XSxcbiAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOmxvY2FsZScsIGNvbnRlbnQ6IG1ldGFEYXRhLmxvY2FsZSB9XSxcbiAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogbWV0YURhdGEudGl0bGUgfV0sXG4gIFsnbWV0YScsIHsgcHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IG1ldGFEYXRhLmRlc2NyaXB0aW9uIH1dLFxuICBbJ21ldGEnLCB7IHByb3BlcnR5OiAnb2c6c2l0ZScsIGNvbnRlbnQ6IG1ldGFEYXRhLnNpdGUgfV0sXG4gIFsnbWV0YScsIHsgcHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBtZXRhRGF0YS50aXRsZSB9XSxcbiAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogbWV0YURhdGEuaW1hZ2UgfV0sXG5cbiAgLy8gXHU3NjdFXHU1RUE2XHU3RURGXHU4QkExXHU0RUUzXHU3ODAxXHVGRjFBaHR0cHM6Ly90b25namkuYmFpZHUuY29tXG4gIFsnc2NyaXB0Jywge30sIGB2YXIgX2htdCA9IF9obXQgfHwgW107XG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgaG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIGhtLnNyYyA9IFwiaHR0cHM6Ly9obS5iYWlkdS5jb20vaG0uanM/NTNhZjRiMWExMmZiZTQwODEwY2E3YWQzOWY4ZGI5YzdcIjtcbiAgICB2YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdOyBcbiAgICBzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGhtLCBzKTtcbiAgfSkoKTtgXSxcbiAgLy8gXHU5ODc1XHU5NzYyXHU4QkJGXHU5NUVFXHU5MUNGXHU3RURGXHU4QkExXG4gIC8vIFsnc2NyaXB0Jywge30sIGBcbiAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgLy8gICBsZXQgb2xkSHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsIGJvZHlET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIC8vICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgLy8gICAgIGlmIChvbGRIcmVmICE9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpIHtcbiAgLy8gICAgICAgb2xkSHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG4gIC8vICAgICAgIGdldFB2KClcbiAgLy8gICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgLy8gICAgICAgICBsZXQgdG1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAvLyAgICAgICAgIGlmKHRtcCAhPSBib2R5RE9NKSB7XG4gIC8vICAgICAgICAgICBib2R5RE9NID0gdG1wO1xuICAvLyAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShib2R5RE9NLCBjb25maWcpO1xuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgfSlcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gICBjb25zdCBjb25maWcgPSB7XG4gIC8vICAgICBjaGlsZExpc3Q6IHRydWUsXG4gIC8vICAgICBzdWJ0cmVlOiB0cnVlXG4gIC8vICAgfTtcbiAgLy8gICBvYnNlcnZlci5vYnNlcnZlKGJvZHlET00sIGNvbmZpZyk7XG4gIC8vICAgZ2V0UHYoKVxuICAvLyB9LCB0cnVlKTtcblxuICAvLyBmdW5jdGlvbiBnZXRQdigpIHtcbiAgLy8gICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgLy8gICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmNoYXJsZXM3Yy50b3AvYmxvZy9wdj9wYWdlVXJsPScgKyBsb2NhdGlvbi5ocmVmKTtcbiAgLy8gICB4aHIuc2VuZCgpO1xuICAvLyB9YF1cbl07IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L3Z1ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9tYXJrZG93bi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvbWFya2Rvd24udHNcIjtpbXBvcnQgdHlwZSB7IE1hcmtkb3duT3B0aW9ucyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5pbXBvcnQgbWF0aGpheDMgZnJvbSAnbWFya2Rvd24taXQtbWF0aGpheDMnO1xuaW1wb3J0IGZvb3Rub3RlIGZyb20gJ21hcmtkb3duLWl0LWZvb3Rub3RlJztcblxuZXhwb3J0IGNvbnN0IG1hcmtkb3duOiBNYXJrZG93bk9wdGlvbnMgPSB7XG4gIC8vIFNoaWtpXHU0RTNCXHU5ODk4LCBcdTYyNDBcdTY3MDlcdTRFM0JcdTk4OThcdTUzQzJcdTg5QzE6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaGlraWpzL3NoaWtpL2Jsb2IvbWFpbi9kb2NzL3RoZW1lcy5tZFxuICB0aGVtZToge1xuICAgIGxpZ2h0OiAnZ2l0aHViLWxpZ2h0JyxcbiAgICBkYXJrOiAnZ2l0aHViLWRhcmstZGltbWVkJ1xuICB9LFxuICAvLyBsaW5lTnVtYmVyczogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4XHU4ODRDXHU1M0Y3XG5cbiAgY29uZmlnOiAobWQpID0+IHtcbiAgICBtZC51c2UobWF0aGpheDMpO1xuICAgIG1kLnVzZShmb290bm90ZSk7XG5cbiAgICAvLyBcdTU3MjhcdTYyNDBcdTY3MDlcdTY1ODdcdTY4NjNcdTc2ODQ8aDE+XHU2ODA3XHU3QjdFXHU1NDBFXHU2REZCXHU1MkEwPEFydGljbGVNZXRhZGF0YS8+XHU3RUM0XHU0RUY2XG4gICAgbWQucmVuZGVyZXIucnVsZXMuaGVhZGluZ19jbG9zZSA9ICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpID0+IHtcbiAgICAgIGxldCBodG1sUmVzdWx0ID0gc2xmLnJlbmRlclRva2VuKHRva2VucywgaWR4LCBvcHRpb25zKTtcbiAgICAgIGlmICh0b2tlbnNbaWR4XS50YWcgPT09ICdoMScpIGh0bWxSZXN1bHQgKz0gYFxcbjxDbGllbnRPbmx5PjxBcnRpY2xlTWV0YWRhdGEgdi1pZj1cIigkZnJvbnRtYXR0ZXI/LmFzaWRlID8/IHRydWUpICYmICgkZnJvbnRtYXR0ZXI/LnNob3dBcnRpY2xlTWV0YWRhdGEgPz8gdHJ1ZSlcIiA6YXJ0aWNsZT1cIiRmcm9udG1hdHRlclwiIC8+PC9DbGllbnRPbmx5PmA7XG4gICAgICByZXR1cm4gaHRtbFJlc3VsdDtcbiAgICB9XG4gIH0sXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L3Z1ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9uYXYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvY29uZmlnL25hdi50c1wiO2ltcG9ydCB0eXBlIHsgRGVmYXVsdFRoZW1lIH0gZnJvbSAndml0ZXByZXNzJztcblxuZXhwb3J0IGNvbnN0IG5hdjogRGVmYXVsdFRoZW1lLkNvbmZpZ1tcIm5hdlwiXSA9IFtcbiAge1xuICAgIHRleHQ6IFwiQ2F0ZWdvcmllc1wiLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiRnJvbnRlbmRcIixcbiAgICAgICAgbGluazogXCIvY2F0ZWdvcmllcy9mcm9udGVuZC9pbmRleFwiLFxuICAgICAgICBhY3RpdmVNYXRjaDogXCIvY2F0ZWdvcmllcy9mcm9udGVuZC9cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQmFja2VuZFwiLFxuICAgICAgICBsaW5rOiBcIi9jYXRlZ29yaWVzL2JhY2tlbmQvaW5kZXhcIixcbiAgICAgICAgYWN0aXZlTWF0Y2g6IFwiL2NhdGVnb3JpZXMvYmFja2VuZC9cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiRGV2T3BzXCIsXG4gICAgICAgIGxpbms6IFwiL2NhdGVnb3JpZXMvRGV2T3BzL2luZGV4XCIsXG4gICAgICAgIGFjdGl2ZU1hdGNoOiBcIi9jYXRlZ29yaWVzL0Rldk9wcy9cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiSW9UXCIsXG4gICAgICAgIGxpbms6IFwiL2NhdGVnb3JpZXMvSW9UL2luZGV4XCIsXG4gICAgICAgIGFjdGl2ZU1hdGNoOiBcIi9jYXRlZ29yaWVzL0lvVC9cIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBhY3RpdmVNYXRjaDogXCIvY2F0ZWdvcmllcy9cIixcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiUmVhZGluZ3NcIixcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIk15U1FMXCIsXG4gICAgICAgIGxpbms6IFwiL2NvdXJzZXMvTXlTUUwvaW5kZXhcIixcbiAgICAgICAgYWN0aXZlTWF0Y2g6IFwiL2NvdXJzZXMvTXlTUUwvXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIk9yY2hlc3RyYXRvclwiLFxuICAgICAgICBsaW5rOiBcIi9jb3Vyc2VzL09yY2hlc3RyYXRvci9pbmRleFwiLFxuICAgICAgICBhY3RpdmVNYXRjaDogXCIvY291cnNlcy9PcmNoZXN0cmF0b3IvXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkludGVydmlldyBRdWVzdGlvbnNcIixcbiAgICAgICAgbGluazogXCIvY291cnNlcy9JbnRlcnZpZXdRdWVzdGlvbnMvaW5kZXhcIixcbiAgICAgICAgYWN0aXZlTWF0Y2g6IFwiL2NvdXJzZXMvSW50ZXJ2aWV3UXVlc3Rpb25zL1wiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJBV1MgQ2VydGlmaWNhdGlvblwiLFxuICAgICAgICBsaW5rOiBcIi9jb3Vyc2VzL0FXUy9pbmRleFwiLFxuICAgICAgICBhY3RpdmVNYXRjaDogXCIvY291cnNlcy9BV1MvXCIsXG4gICAgICB9LFxuICAgICAgLy8ge1xuICAgICAgLy8gICB0ZXh0OiBcIk15QmF0aXNcdTVGRUJcdTkwMUZcdTUxNjVcdTk1RThcIixcbiAgICAgIC8vICAgbGluazogXCIvY291cnNlcy9teWJhdGlzL2luZGV4XCIsXG4gICAgICAvLyAgIGFjdGl2ZU1hdGNoOiBcIi9jb3Vyc2VzL215YmF0aXMvXCIsXG4gICAgICAvLyB9LFxuICAgIF0sXG4gICAgYWN0aXZlTWF0Y2g6IFwiL2NvdXJzZXMvXCIsXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcIlRhZ3NcIixcbiAgICBsaW5rOiBcIi90YWdzXCIsXG4gICAgYWN0aXZlTWF0Y2g6IFwiL3RhZ3NcIixcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiQXJjaGl2ZXNcIixcbiAgICBsaW5rOiBcIi9hcmNoaXZlc1wiLFxuICAgIGFjdGl2ZU1hdGNoOiBcIi9hcmNoaXZlc1wiLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJBYm91dCBNZVwiLFxuICAgIGxpbms6IFwiL2Fib3V0L21lXCIsXG4gICAgYWN0aXZlTWF0Y2g6IFwiL2Fib3V0L21lXCIsXG4gIH0sXG5dOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvc2lkZWJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvc2lkZWJhci50c1wiO2ltcG9ydCB0eXBlIHsgRGVmYXVsdFRoZW1lIH0gZnJvbSAndml0ZXByZXNzJztcbmltcG9ydCBmZyBmcm9tICdmYXN0LWdsb2InO1xuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcic7XG5pbXBvcnQgeyBnZXRDaGluZXNlWm9kaWFjLCBnZXRDaGluZXNlWm9kaWFjQWxpYXMgfSBmcm9tICcuLi90aGVtZS91dGlscy50cyc7XG5jb25zdCBzeW5jID0gZmcuc3luYztcblxuZXhwb3J0IGNvbnN0IHNpZGViYXI6IERlZmF1bHRUaGVtZS5Db25maWdbXCJzaWRlYmFyXCJdID0ge1xuICBcIi9jYXRlZ29yaWVzL2Zyb250ZW5kL1wiOiBnZXRJdGVtc0J5RGF0ZShcImNhdGVnb3JpZXMvZnJvbnRlbmRcIiksXG4gIFwiL2NhdGVnb3JpZXMvYmFja2VuZC9cIjogZ2V0SXRlbXNCeURhdGUoXCJjYXRlZ29yaWVzL2JhY2tlbmRcIiksXG4gIFwiL2NhdGVnb3JpZXMvRGV2T3BzL1wiOiBnZXRJdGVtc0J5RGF0ZShcImNhdGVnb3JpZXMvRGV2T3BzXCIpLFxuICBcIi9jYXRlZ29yaWVzL0lvVC9cIjogZ2V0SXRlbXNCeURhdGUoXCJjYXRlZ29yaWVzL0lvVFwiKSxcblxuICBcIi9jb3Vyc2VzL015U1FML1wiOiBnZXRJdGVtcyhcImNvdXJzZXMvTXlTUUxcIiksXG4gIFwiL2NvdXJzZXMvT3JjaGVzdHJhdG9yL1wiOiBnZXRJdGVtcyhcImNvdXJzZXMvT3JjaGVzdHJhdG9yXCIpLFxuICBcIi9jb3Vyc2VzL0ludGVydmlld1F1ZXN0aW9ucy9cIjogZ2V0SXRlbXMoXCJjb3Vyc2VzL0ludGVydmlld1F1ZXN0aW9uc1wiKSxcbiAgXCIvY291cnNlcy9BV1MvXCI6IGdldEl0ZW1zKFwiY291cnNlcy9BV1NcIiksXG4gIC8vIFwiL2NvdXJzZXMvbXliYXRpcy9cIjogZ2V0SXRlbXMoXCJjb3Vyc2VzL215YmF0aXNcIiksXG59O1xuXG4vKipcbiAqIFx1NjgzOVx1NjM2RSBcdTY3RDBcdTUyMDZcdTdDN0IvWVlZWS9NTS9kZC94eHgubWQgXHU3Njg0XHU3NkVFXHU1RjU1XHU2ODNDXHU1RjBGLCBcdTgzQjdcdTUzRDZcdTRGQTdcdThGQjlcdTY4MEZcdTUyMDZcdTdFQzRcdTUzQ0FcdTUyMDZcdTdFQzRcdTRFMEJcdTY4MDdcdTk4OThcbiAqXG4gKiAvY2F0ZWdvcmllcy9pc3N1ZXMvMjAyMi8wNy8yMC94eHgubWRcbiAqXG4gKiBAcGFyYW0gcGF0aCBcdTYyNkJcdTYzQ0ZcdTU3RkFcdTc4NDBcdThERUZcdTVGODRcbiAqIEByZXR1cm5zIHtEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXX1cbiAqL1xuZnVuY3Rpb24gZ2V0SXRlbXNCeURhdGUgKHBhdGg6IHN0cmluZykge1xuICAvLyBcdTRGQTdcdThGQjlcdTY4MEZcdTVFNzRcdTRFRkRcdTUyMDZcdTdFQzRcdTY1NzBcdTdFQzRcbiAgbGV0IHllYXJHcm91cHM6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbVtdID0gW107XG4gIC8vIFx1N0Y2RVx1OTg3Nlx1NjU3MFx1N0VDNFxuICBsZXQgdG9wQXJ0aWNsZUl0ZW1zOiBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXSA9IFtdO1xuXG4gIC8vIDEuXHU4M0I3XHU1M0Q2XHU2MjQwXHU2NzA5XHU1RTc0XHU0RUZEXHU3NkVFXHU1RjU1XG4gIHN5bmMoYGRvY3MvJHtwYXRofS8qYCwge1xuICAgIG9ubHlEaXJlY3RvcmllczogdHJ1ZSxcbiAgICBvYmplY3RNb2RlOiB0cnVlLFxuICB9KS5mb3JFYWNoKCh7IG5hbWUgfSkgPT4ge1xuICAgIGxldCB5ZWFyID0gbmFtZTtcbiAgICAvLyBcdTVFNzRcdTRFRkRcdTY1NzBcdTdFQzRcbiAgICBsZXQgYXJ0aWNsZUl0ZW1zOiBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXSA9IFtdO1xuXG4gICAgLy8gMi5cdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTY3MDhcdTRFRkRcdTc2RUVcdTVGNTVcbiAgICBzeW5jKGBkb2NzLyR7cGF0aH0vJHt5ZWFyfS8qYCwge1xuICAgICAgb25seURpcmVjdG9yaWVzOiB0cnVlLFxuICAgICAgb2JqZWN0TW9kZTogdHJ1ZSxcbiAgICB9KS5mb3JFYWNoKCh7IG5hbWUgfSkgPT4ge1xuICAgICAgbGV0IG1vbnRoID0gbmFtZVxuXG4gICAgICAvLyAzLlx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NjVFNVx1NjcxRlx1NzZFRVx1NUY1NVxuICAgICAgc3luYyhgZG9jcy8ke3BhdGh9LyR7eWVhcn0vJHttb250aH0vKmAsIHtcbiAgICAgICAgb25seURpcmVjdG9yaWVzOiB0cnVlLFxuICAgICAgICBvYmplY3RNb2RlOiB0cnVlLFxuICAgICAgfSkuZm9yRWFjaCgoeyBuYW1lIH0pID0+IHtcbiAgICAgICAgbGV0IGRheSA9IG5hbWU7XG4gICAgICAgIC8vIDQuXHU4M0I3XHU1M0Q2XHU2NUU1XHU2NzFGXHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0XHU2MjQwXHU2NzA5XHU2NTg3XHU3QUUwXG4gICAgICAgIHN5bmMoYGRvY3MvJHtwYXRofS8ke3llYXJ9LyR7bW9udGh9LyR7ZGF5fS8qYCwge1xuICAgICAgICAgIG9ubHlGaWxlczogdHJ1ZSxcbiAgICAgICAgICBvYmplY3RNb2RlOiB0cnVlLFxuICAgICAgICB9KS5mb3JFYWNoKChhcnRpY2xlKSA9PiB7XG4gICAgICAgICAgY29uc3QgYXJ0aWNsZUZpbGUgPSBtYXR0ZXIucmVhZChgJHthcnRpY2xlLnBhdGh9YCk7XG4gICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhcnRpY2xlRmlsZTtcbiAgICAgICAgICBpZiAoZGF0YS5pc1RvcCkge1xuICAgICAgICAgICAgLy8gXHU1NDExXHU3RjZFXHU5ODc2XHU1MjA2XHU3RUM0XHU1MjREXHU4RkZEXHU1MkEwXHU2ODA3XHU5ODk4XG4gICAgICAgICAgICB0b3BBcnRpY2xlSXRlbXMudW5zaGlmdCh7XG4gICAgICAgICAgICAgIHRleHQ6IGRhdGEudGl0bGUsXG4gICAgICAgICAgICAgIGxpbms6IGAvJHtwYXRofS8ke3llYXJ9LyR7bW9udGh9LyR7ZGF5fS8ke2FydGljbGUubmFtZS5yZXBsYWNlKCcubWQnLCAnJyl9YCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFx1NTQxMVx1NUU3NFx1NEVGRFx1NTIwNlx1N0VDNFx1NTI0RFx1OEZGRFx1NTJBMFx1NjgwN1x1OTg5OFxuICAgICAgICAgIGFydGljbGVJdGVtcy51bnNoaWZ0KHtcbiAgICAgICAgICAgIHRleHQ6IGRhdGEudGl0bGUsXG4gICAgICAgICAgICBsaW5rOiBgLyR7cGF0aH0vJHt5ZWFyfS8ke21vbnRofS8ke2RheX0vJHthcnRpY2xlLm5hbWUucmVwbGFjZSgnLm1kJywgJycpfWAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICAvLyBcdTZERkJcdTUyQTBcdTVFNzRcdTRFRkRcdTUyMDZcdTdFQzRcbiAgICB5ZWFyR3JvdXBzLnVuc2hpZnQoe1xuICAgICAgdGV4dDogYDxpbWcgY2xhc3M9XCJjaGluZXNlLXpvZGlhY1wiIHN0eWxlPVwicG9zaXRpb246IHN0YXRpYzsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgcGFkZGluZy1ib3R0b206IDNweDtcIiBzcmM9XCIvdnVlcHJlc3MtYmxvZy9pbWcvc3ZnL2NoaW5lc2Utem9kaWFjLyR7Z2V0Q2hpbmVzZVpvZGlhYyhcbiAgICAgICAgeWVhci5yZXBsYWNlKFwiXHU1RTc0XCIsIFwiXCIpXG4gICAgICApfS5zdmdcIiB0aXRsZT1cIiR7Z2V0Q2hpbmVzZVpvZGlhY0FsaWFzKFxuICAgICAgICB5ZWFyLnJlcGxhY2UoXCJcdTVFNzRcIiwgXCJcIilcbiAgICAgICl9XCIgYWx0PVwiXHU3NTFGXHU4MDk2XCI+XG4gICAgICAgICAgICAke3llYXJ9IHRvdGFsOiAke2FydGljbGVJdGVtcy5sZW5ndGh9YCxcbiAgICAgIGl0ZW1zOiBhcnRpY2xlSXRlbXMsXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgLy8gY29sbGFwc2VkOiB0cnVlLFxuICAgIH0pO1xuICB9KVxuXG4gIGlmICh0b3BBcnRpY2xlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgIC8vIFx1NkRGQlx1NTJBMFx1N0Y2RVx1OTg3Nlx1NTIwNlx1N0VDNFxuICAgIHllYXJHcm91cHMudW5zaGlmdCh7XG4gICAgICB0ZXh0OiBgPHN2ZyBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgcGFkZGluZy1ib3R0b206IDNweDtcIiB2aWV3Qm94PVwiMCAwIDE5MjAgMTAyNFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIzNVwiIGhlaWdodD1cIjM1XCI+PHBhdGggZD1cIk0zNjcuNDg4IDY2Ny45MDRoNDIzLjc0NHY0Ny4yMzJIMzY3LjQ4OHYtNDcuMjMyek0zMjAuMjU2IDIwNC4zNTJoMTM3LjI4djY4Ljk5MmgtMTM3LjI4di02OC45OTJ6TTM2Ny40ODggNzU0LjExMmg0MjMuNzQ0djQ4SDM2Ny40ODh2LTQ4ek02OTMuNzYgMjA0LjM1MmgxMzcuOTg0djY4Ljk5Mkg2OTMuNzZ2LTY4Ljk5MnpNNTA3LjAwOCAyMDQuMzUyaDEzNy4yOHY2OC45OTJoLTEzNy4yOHYtNjguOTkyelwiIHAtaWQ9XCIxMDc0OVwiIGZpbGw9XCIjZDgxZTA2XCI+PC9wYXRoPjxwYXRoIGQ9XCJNMTM0NCAxOTIgMjU2IDE5MkMxODUuNiAxOTIgMTI4IDI0OS42IDEyOCAzMjBsMCA0NDhjMCA3MC40IDU3LjYgMTI4IDEyOCAxMjhsMTA4OCAwYzcwLjQgMCAxMjgtNTcuNiAxMjgtMTI4TDE0NzIgMzIwQzE0NzIgMjQ5LjYgMTQxNC40IDE5MiAxMzQ0IDE5MnpNNTc2IDczNkM1NzYgNzUzLjkyIDU2MS45MiA3NjggNTQ0IDc2OFM1MTIgNzUzLjkyIDUxMiA3MzZMNTEyIDU3NiAzMjAgNTc2bDAgMTYwQzMyMCA3NTMuOTIgMzA1LjkyIDc2OCAyODggNzY4IDI3MC4wOCA3NjggMjU2IDc1My45MiAyNTYgNzM2bDAtMzg0QzI1NiAzMzQuMDggMjcwLjA4IDMyMCAyODggMzIwIDMwNS45MiAzMjAgMzIwIDMzNC4wOCAzMjAgMzUyTDMyMCA1MTJsMTkyIDBMNTEyIDM1MkM1MTIgMzM0LjA4IDUyNi4wOCAzMjAgNTQ0IDMyMFM1NzYgMzM0LjA4IDU3NiAzNTJMNTc2IDczNnpNOTYwIDY0MGMwIDcwLjQtNTcuNiAxMjgtMTI4IDEyOGwtNjQgMGMtNzAuNCAwLTEyOC01Ny42LTEyOC0xMjhMNjQwIDQ0OGMwLTcwLjQgNTcuNi0xMjggMTI4LTEyOGw2NCAwYzcwLjQgMCAxMjggNTcuNiAxMjggMTI4TDk2MCA2NDB6TTEzMTIgMzg0IDEyMTYgMzg0bDAgMzUyYzAgMTcuOTItMTQuMDggMzItMzIgMzJTMTE1MiA3NTMuOTIgMTE1MiA3MzZMMTE1MiAzODRsLTk2IDBDMTAzOC4wOCAzODQgMTAyNCAzNjkuOTIgMTAyNCAzNTIgMTAyNCAzMzQuMDggMTAzOC4wOCAzMjAgMTA1NiAzMjBsMjU2IDBDMTMyOS45MiAzMjAgMTM0NCAzMzQuMDggMTM0NCAzNTIgMTM0NCAzNjkuOTIgMTMyOS45MiAzODQgMTMxMiAzODR6TTgzMiAzODRsLTY0IDBjLTM1LjIgMC02NCAyOC44LTY0IDY0bDAgMTkyYzAgMzUuMiAyOC44IDY0IDY0IDY0bDY0IDBjMzUuMiAwIDY0LTI4LjggNjQtNjRMODk2IDQ0OEM4OTYgNDEyLjggODY3LjIgMzg0IDgzMiAzODR6XCIgcC1pZD1cIjE0OTJcIiBmaWxsPVwiI2Q4MWUwNlwiPjwvcGF0aD48cGF0aCBkPVwiTTM2Ny40ODggNDk1LjM2aDQyMy43NDR2NDcuMjMySDM2Ny40ODhWNDk1LjM2ek0zNjcuNDg4IDU4MS42MzJoNDIzLjc0NHY0Ny4yMzJIMzY3LjQ4OHYtNDcuMjMyelwiIHAtaWQ9XCIxMDc1MVwiIGZpbGw9XCIjZDgxZTA2XCI+PC9wYXRoPjwvc3ZnPlxuICAgICAgICAgICAgVG9wIEFydGljbGVzOiAke3RvcEFydGljbGVJdGVtcy5sZW5ndGh9YCxcbiAgICAgIGl0ZW1zOiB0b3BBcnRpY2xlSXRlbXMsXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgLy8gXHU1QzA2XHU2NzAwXHU4RkQxXHU1RTc0XHU0RUZEXHU1MjA2XHU3RUM0XHU1QzU1XHU1RjAwXG4gICAgeWVhckdyb3Vwc1sxXS5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBcdTVDMDZcdTY3MDBcdThGRDFcdTVFNzRcdTRFRkRcdTUyMDZcdTdFQzRcdTVDNTVcdTVGMDBcbiAgICB5ZWFyR3JvdXBzWzBdLmNvbGxhcHNlZCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gXHU2REZCXHU1MkEwXHU1RThGXHU1M0Y3XG4gIGFkZE9yZGVyTnVtYmVyKHllYXJHcm91cHMpO1xuICBjb25zb2xlLmxvZyh5ZWFyR3JvdXBzKTtcbiAgcmV0dXJuIHllYXJHcm91cHM7XG59XG5cbi8qKlxuICogXHU2ODM5XHU2MzZFIFx1NjdEMFx1NUMwRlx1OEJGRS9cdTVFOEZcdTUzRjctXHU1MjA2XHU3RUM0L1x1NUU4Rlx1NTNGNy14eHgubWQgXHU3Njg0XHU3NkVFXHU1RjU1XHU2ODNDXHU1RjBGLCBcdTgzQjdcdTUzRDZcdTRGQTdcdThGQjlcdTY4MEZcdTUyMDZcdTdFQzRcdTUzQ0FcdTUyMDZcdTdFQzRcdTRFMEJcdTY4MDdcdTk4OThcbiAqXG4gKiBjb3Vyc2VzL215YmF0aXMvMDEtTXlCYXRpc1x1NTdGQVx1Nzg0MC8wMS14eHgubWRcbiAqXG4gKiBAcGFyYW0gcGF0aCBcdTYyNkJcdTYzQ0ZcdTU3RkFcdTc4NDBcdThERUZcdTVGODRcbiAqIEByZXR1cm5zIHtEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXX1cbiAqL1xuZnVuY3Rpb24gZ2V0SXRlbXMgKHBhdGg6IHN0cmluZykge1xuICAvLyBcdTRGQTdcdThGQjlcdTY4MEZcdTUyMDZcdTdFQzRcdTY1NzBcdTdFQzRcbiAgbGV0IGdyb3VwczogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10gPSBbXTtcbiAgLy8gXHU0RkE3XHU4RkI5XHU2ODBGXHU1MjA2XHU3RUM0XHU0RTBCXHU2ODA3XHU5ODk4XHU2NTcwXHU3RUM0XG4gIGxldCBpdGVtczogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10gPSBbXTtcbiAgbGV0IHRvdGFsID0gMDtcbiAgLy8gXHU1RjUzXHU1MjA2XHU3RUM0XHU1MTg1XHU2NTg3XHU3QUUwXHU2NTcwXHU5MUNGXHU1QzExXHU0RThFIDIgXHU3QkM3XHU2MjE2XHU2NTg3XHU3QUUwXHU2MDNCXHU2NTcwXHU2NjNFXHU3OTNBXHU4RDg1XHU4RkM3IDIwIFx1N0JDN1x1NjVGNlx1RkYwQ1x1ODFFQVx1NTJBOFx1NjI5OFx1NTNFMFx1NTIwNlx1N0VDNFxuICBjb25zdCBncm91cENvbGxhcHNlZFNpemUgPSAyO1xuICBjb25zdCB0aXRsZUNvbGxhcHNlZFNpemUgPSAyMDtcblxuICAvLyAxLlx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NTIwNlx1N0VDNFx1NzZFRVx1NUY1NVxuICBzeW5jKGBkb2NzLyR7cGF0aH0vKmAsIHtcbiAgICBvbmx5RGlyZWN0b3JpZXM6IHRydWUsXG4gICAgb2JqZWN0TW9kZTogdHJ1ZSxcbiAgfSkuZm9yRWFjaCgoeyBuYW1lIH0pID0+IHtcbiAgICBsZXQgZ3JvdXBOYW1lID0gbmFtZTtcbiAgICAvLyAyLlx1ODNCN1x1NTNENlx1NTIwNlx1N0VDNFx1NEUwQlx1NzY4NFx1NjI0MFx1NjcwOVx1NjU4N1x1N0FFMFxuICAgIHN5bmMoYGRvY3MvJHtwYXRofS8ke2dyb3VwTmFtZX0vKmAsIHtcbiAgICAgIG9ubHlGaWxlczogdHJ1ZSxcbiAgICAgIG9iamVjdE1vZGU6IHRydWUsXG4gICAgfSkuZm9yRWFjaCgoYXJ0aWNsZSkgPT4ge1xuICAgICAgY29uc3QgYXJ0aWNsZUZpbGUgPSBtYXR0ZXIucmVhZChgJHthcnRpY2xlLnBhdGh9YCk7XG4gICAgICBjb25zdCB7IGRhdGEgfSA9IGFydGljbGVGaWxlO1xuICAgICAgLy8gXHU1NDExXHU1MjREXHU4RkZEXHU1MkEwXHU2ODA3XHU5ODk4XG4gICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgdGV4dDogZGF0YS50aXRsZSxcbiAgICAgICAgbGluazogYC8ke3BhdGh9LyR7Z3JvdXBOYW1lfS8ke2FydGljbGUubmFtZS5yZXBsYWNlKCcubWQnLCAnJyl9YCxcbiAgICAgIH0pO1xuICAgICAgdG90YWwgKz0gMTtcbiAgICB9KVxuXG4gICAgLy8gMy5cdTU0MTFcdTUyNERcdThGRkRcdTUyQTBcdTUyMzBcdTUyMDZcdTdFQzRcbiAgICAvLyBcdTVGNTNcdTUyMDZcdTdFQzRcdTUxODVcdTY1ODdcdTdBRTBcdTY1NzBcdTkxQ0ZcdTVDMTFcdTRFOEUgQSBcdTdCQzdcdTYyMTZcdTY1ODdcdTdBRTBcdTYwM0JcdTY1NzBcdTY2M0VcdTc5M0FcdThEODVcdThGQzcgQiBcdTdCQzdcdTY1RjZcdUZGMENcdTgxRUFcdTUyQThcdTYyOThcdTUzRTBcdTUyMDZcdTdFQzRcbiAgICBncm91cHMucHVzaCh7XG4gICAgICB0ZXh0OiBgJHtncm91cE5hbWUuc3Vic3RyaW5nKGdyb3VwTmFtZS5pbmRleE9mKCctJykgKyAxKX0gKCR7aXRlbXMubGVuZ3RofSlgLFxuICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgIC8vIGNvbGxhcHNlZDogaXRlbXMubGVuZ3RoIDwgZ3JvdXBDb2xsYXBzZWRTaXplIHx8IHRvdGFsID4gdGl0bGVDb2xsYXBzZWRTaXplLFxuICAgIH0pXG5cbiAgICAvLyA0Llx1NkUwNVx1N0E3QVx1NEZBN1x1OEZCOVx1NjgwRlx1NTIwNlx1N0VDNFx1NEUwQlx1NjgwN1x1OTg5OFx1NjU3MFx1N0VDNFxuICAgIGl0ZW1zID0gW107XG4gIH0pXG5cbiAgLy8gXHU2REZCXHU1MkEwXHU1RThGXHU1M0Y3XG4gIGFkZE9yZGVyTnVtYmVyKGdyb3Vwcyk7XG4gIHJldHVybiBncm91cHM7XG59XG5cblxuLyoqXG4gKiBcdTZERkJcdTUyQTBcdTVFOEZcdTUzRjdcbiAqXG4gKiBAcGFyYW0gZ3JvdXBzIFx1NTIwNlx1N0VDNFx1NjU3MFx1NjM2RVxuICovXG5mdW5jdGlvbiBhZGRPcmRlck51bWJlcihncm91cHMpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdyb3Vwc1tpXS5pdGVtcy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgaXRlbXMgPSBncm91cHNbaV0uaXRlbXM7XG4gICAgICBjb25zdCBpbmRleCA9IGogKyAxO1xuICAgICAgbGV0IGluZGV4U3R5bGUgPSBgPGRpdiBjbGFzcz1cInRleHQtY29sb3ItZ3JheSBtci1bNnB4XVwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6IDU1MDsgZGlzcGxheTogaW5saW5lLWJsb2NrO1wiPiR7aW5kZXh9PC9kaXY+YDtcbiAgICAgIGlmIChpbmRleCA9PSAxKSB7XG4gICAgICAgIGluZGV4U3R5bGUgPSBgPGRpdiBjbGFzcz1cInRleHQtY29sb3ItcmVkIG1yLVs2cHhdXCIgc3R5bGU9XCJmb250LXdlaWdodDogNTUwOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+JHtpbmRleH08L2Rpdj5gO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCA9PSAyKSB7XG4gICAgICAgIGluZGV4U3R5bGUgPSBgPGRpdiBjbGFzcz1cInRleHQtY29sb3Itb3JhbmdlIG1yLVs2cHhdXCIgc3R5bGU9XCJmb250LXdlaWdodDogNTUwOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+JHtpbmRleH08L2Rpdj5gO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCA9PSAzKSB7XG4gICAgICAgIGluZGV4U3R5bGUgPSBgPGRpdiBjbGFzcz1cInRleHQtY29sb3IteWVsbG93IG1yLVs2cHhdXCIgc3R5bGU9XCJmb250LXdlaWdodDogNTUwOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+JHtpbmRleH08L2Rpdj5gO1xuICAgICAgfVxuICAgICAgaXRlbXNbal0udGV4dCA9IGAke2luZGV4U3R5bGV9JHtpdGVtc1tqXS50ZXh0fWA7XG4gICAgfVxuICB9XG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy90aGVtZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvdGhlbWUvdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvdGhlbWUvdXRpbHMudHNcIjsvKipcbiAqIFx1NjgzQ1x1NUYwRlx1NTMxNlx1NjVGNlx1OTVGNFxuICpcbiAqIEBwYXJhbSBkYXRlIFx1NUY4NVx1NjgzQ1x1NUYwRlx1NTMxNlx1NjVGNlx1OTVGNFxuICogQHJldHVybnMgXHU2ODNDXHU1RjBGXHU1MzE2XHU1NDBFXHU3Njg0XHU2NUY2XHU5NUY0KFlZWVkvTU0vZGQgQU0gaGg6bW0pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGUpIHtcbiAgY29uc3QgZm9ybWF0RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICByZXR1cm4gZm9ybWF0RGF0ZS50b0xvY2FsZVN0cmluZygnemgnLCB7eWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJywgaG91cjogJ251bWVyaWMnLCBtaW51dGU6ICdudW1lcmljJ30pO1xufVxuXG4vKipcbiAqIFx1ODNCN1x1NTNENiBVUkwgXHU4REVGXHU1Rjg0XHU0RTJEXHU3Njg0XHU2MzA3XHU1QjlBXHU1M0MyXHU2NTcwXG4gKlxuICogQHBhcmFtIHBhcmFtTmFtZSBcdTUzQzJcdTY1NzBcdTU0MERcbiAqIEByZXR1cm5zIFx1NTNDMlx1NjU3MFx1NTAzQ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVlcnlQYXJhbShwYXJhbU5hbWUpIHtcbiAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIrIHBhcmFtTmFtZSArXCI9KFteJl0qKSgmfCQpXCIpO1xuICBsZXQgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkpLm1hdGNoKHJlZyk7XG4gIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlKHZhbHVlWzJdKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBcdThERjNcdThGNkNcdTUyMzBcdTYzMDdcdTVCOUFcdTk0RkVcdTYzQTVcbiAqXG4gKiBAcGFyYW0gcGFyYW1OYW1lIFx1NTNDMlx1NjU3MFx1NTQwRFxuICogQHBhcmFtIHBhcmFtVmFsdWUgXHU1M0MyXHU2NTcwXHU1MDNDXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnb1RvTGluayh1cmwsIHBhcmFtTmFtZSwgcGFyYW1WYWx1ZSkge1xuICBpZiAocGFyYW1OYW1lKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmwgKyAnPycgKyBwYXJhbU5hbWUgKyAnPScgKyBwYXJhbVZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICB9XG59XG5cbi8qKlxuICogXHU4M0I3XHU1M0Q2XHU3NTFGXHU4MDk2XHU1NkZFXHU2ODA3XG4gKlxuICogQHBhcmFtIHllYXIgXHU1RTc0XHU0RUZEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGluZXNlWm9kaWFjKHllYXIpIHtcbiAgY29uc3QgYXJyID0gWydtb25rZXknLCAncm9vc3RlcicsICdkb2cnLCAncGlnJywgJ3JhdCcsICdveCcsICd0aWdlcicsICdyYWJiaXQnLCAnZHJhZ29uJywgJ3NuYWtlJywgJ2hvcnNlJywgJ2dvYXQnXTtcbiAgcmV0dXJuIGFyclt5ZWFyICUgMTJdO1xufVxuXG4vKipcbiAqIFx1ODNCN1x1NTNENlx1NzUxRlx1ODA5Nlx1NTQwRFx1NzlGMFxuICpcbiAqIEBwYXJhbSB5ZWFyIFx1NUU3NFx1NEVGRFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hpbmVzZVpvZGlhY0FsaWFzKHllYXIpIHtcbiAgY29uc3QgYXJyID0gWydcdTczMzRcdTVFNzQnLCAnXHU5RTIxXHU1RTc0JywgJ1x1NzJEN1x1NUU3NCcsICdcdTczMkFcdTVFNzQnLCAnXHU5RjIwXHU1RTc0JywgJ1x1NzI1Qlx1NUU3NCcsICdcdTg2NEVcdTVFNzQnLCAnXHU1MTU0XHU1RTc0JywgJ1x1OUY5OVx1NUU3NCcsICdcdTg2QzdcdTVFNzQnLCAnXHU5QTZDXHU1RTc0JywgJ1x1N0Y4QVx1NUU3NCddO1xuICByZXR1cm4gYXJyW3llYXIgJSAxMl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb250aE5hbWUobW9udGgpIHtcbiAgY29uc3QgYXJyID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XG4gIHJldHVybiBhcnJbbW9udGggLSAxXTtcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9yb290L3Z1ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9zZWFyY2hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L3Z1ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzL2NvbmZpZy9zZWFyY2gvYWxnb2xpYS1zZWFyY2gudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvY29uZmlnL3NlYXJjaC9hbGdvbGlhLXNlYXJjaC50c1wiO2ltcG9ydCB0eXBlIHsgQWxnb2xpYVNlYXJjaE9wdGlvbnMgfSBmcm9tICd2aXRlcHJlc3MnO1xuXG5leHBvcnQgY29uc3QgYWxnb2xpYVNlYXJjaE9wdGlvbnM6IEFsZ29saWFTZWFyY2hPcHRpb25zID0ge1xuICBhcHBJZDogJ0RCWjBHOUhCVVknLFxuICBhcGlLZXk6ICcwMGNlZjQ4MGE1NDMwMDNkMDVkOTgwODExMGVhNWY2NScsXG4gIGluZGV4TmFtZTogJ2NoYXJsZXM3YycsXG4gIGxvY2FsZXM6IHtcbiAgICByb290OiB7XG4gICAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaCcsXG4gICAgICB0cmFuc2xhdGlvbnM6IHtcbiAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgYnV0dG9uVGV4dDogJ1NlYXJjaCcsXG4gICAgICAgICAgYnV0dG9uQXJpYUxhYmVsOiAnU2VhcmNoJ1xuICAgICAgICB9LFxuICAgICAgICBtb2RhbDoge1xuICAgICAgICAgIHNlYXJjaEJveDoge1xuICAgICAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ0NsZWFyIHNlYXJjaCBxdWVyeScsXG4gICAgICAgICAgICByZXNldEJ1dHRvbkFyaWFMYWJlbDogJ0NsZWFyIHNlYXJjaCBxdWVyeScsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkFyaWFMYWJlbDogJ0NhbmNlbCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdGFydFNjcmVlbjoge1xuICAgICAgICAgICAgcmVjZW50U2VhcmNoZXNUaXRsZTogJ1NlYXJjaCBIaXN0b3J5JyxcbiAgICAgICAgICAgIG5vUmVjZW50U2VhcmNoZXNUZXh0OiAnTm8gcmVjZW50IHNlYXJjaGVzJyxcbiAgICAgICAgICAgIHNhdmVSZWNlbnRTZWFyY2hCdXR0b25UaXRsZTogJ1NhdmUgcmVjZW50IHNlYXJjaCcsXG4gICAgICAgICAgICByZW1vdmVSZWNlbnRTZWFyY2hCdXR0b25UaXRsZTogJ1JlbW92ZSByZWNlbnQgc2VhcmNoJyxcbiAgICAgICAgICAgIGZhdm9yaXRlU2VhcmNoZXNUaXRsZTogJ0Zhdm9yaXRlcycsXG4gICAgICAgICAgICByZW1vdmVGYXZvcml0ZVNlYXJjaEJ1dHRvblRpdGxlOiAnUmVtb3ZlIGZyb20gZmF2b3JpdGUnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3JTY3JlZW46IHtcbiAgICAgICAgICAgIHRpdGxlVGV4dDogJ0Vycm9yJyxcbiAgICAgICAgICAgIGhlbHBUZXh0OiAnUGxlYXNlIHRyeSBhZ2FpbiBsYXRlcicsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgIHNlbGVjdFRleHQ6ICdTZWxlY3QnLFxuICAgICAgICAgICAgbmF2aWdhdGVUZXh0OiAnU3dpdGNoJyxcbiAgICAgICAgICAgIGNsb3NlVGV4dDogJ0Nsb3NlJyxcbiAgICAgICAgICAgIHNlYXJjaEJ5VGV4dDogJ1Byb3ZpZGVyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbm9SZXN1bHRzU2NyZWVuOiB7XG4gICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiAnTm8gcmVzdWx0cyBmb3VuZCcsXG4gICAgICAgICAgICBzdWdnZXN0ZWRRdWVyeVRleHQ6ICdEaWQgeW91IG1lYW4nLFxuICAgICAgICAgICAgcmVwb3J0TWlzc2luZ1Jlc3VsdHNUZXh0OiAnUmVwb3J0IG1pc3NpbmcgcmVzdWx0cycsXG4gICAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c0xpbmtUZXh0OiAnaGVyZScsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59OyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC92dWVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9jb25maWcvdGhlbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvdnVlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvY29uZmlnL3RoZW1lLnRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnO1xuaW1wb3J0IHsgbmF2IH0gZnJvbSAnLi9uYXYnO1xuaW1wb3J0IHsgc2lkZWJhciB9IGZyb20gJy4vc2lkZWJhcic7XG5pbXBvcnQgeyBhbGdvbGlhU2VhcmNoT3B0aW9ucyB9IGZyb20gJy4vc2VhcmNoL2FsZ29saWEtc2VhcmNoJztcbmltcG9ydCB7IGxvY2FsU2VhcmNoT3B0aW9ucyB9IGZyb20gJy4vc2VhcmNoL2xvY2FsLXNlYXJjaCc7XG5cbmV4cG9ydCBjb25zdCB0aGVtZUNvbmZpZzogRGVmYXVsdFRoZW1lLkNvbmZpZyA9IHtcbiAgbmF2LCAvLyBcdTVCRkNcdTgyMkFcdTY4MEZcdTkxNERcdTdGNkVcbiAgc2lkZWJhciwgLy8gXHU0RkE3XHU4RkI5XHU2ODBGXHU5MTREXHU3RjZFXG5cbiAgbG9nbzogXCIvbG9nby5wbmdcIixcbiAgb3V0bGluZToge1xuICAgIGxldmVsOiBcImRlZXBcIiwgLy8gXHU1M0YzXHU0RkE3XHU1OTI3XHU3RUIyXHU2ODA3XHU5ODk4XHU1QzQyXHU3RUE3XG4gICAgbGFiZWw6IFwiVGFibGUgb2YgQ29udGVudFwiLCAvLyBcdTUzRjNcdTRGQTdcdTU5MjdcdTdFQjJcdTY4MDdcdTk4OThcdTY1ODdcdTY3MkNcdTkxNERcdTdGNkVcbiAgfSxcbiAgZGFya01vZGVTd2l0Y2hMYWJlbDogXCJzd2l0Y2ggbGlnaHQvZGFyayBtb2RlXCIsXG4gIHNpZGViYXJNZW51TGFiZWw6IFwiQXJ0aWNsZVwiLFxuICByZXR1cm5Ub1RvcExhYmVsOiBcIkJhY2sgdG8gVG9wXCIsXG4gIGxhc3RVcGRhdGVkVGV4dDogXCJMYXN0IFVwZGF0ZVwiLCAvLyBcdTY3MDBcdTU0MEVcdTY2RjRcdTY1QjBcdTY1RjZcdTk1RjRcdTY1ODdcdTY3MkNcdTkxNERcdTdGNkUsIFx1OTcwMFx1NTE0OFx1OTE0RFx1N0Y2RWxhc3RVcGRhdGVkXHU0RTNBdHJ1ZVxuICAvLyBcdTY1ODdcdTY4NjNcdTk4NzVcdTgxMUFcdTY1ODdcdTY3MkNcdTkxNERcdTdGNkVcbiAgZG9jRm9vdGVyOiB7XG4gICAgcHJldjogXCJQcmV2aW91c1wiLFxuICAgIG5leHQ6IFwiTmV4dFwiLFxuICB9LFxuICAvLyBcdTdGMTZcdThGOTFcdTk0RkVcdTYzQTVcdTkxNERcdTdGNkVcbiAgZWRpdExpbms6IHtcbiAgICBwYXR0ZXJuOlxuICAgICAgXCJodHRwczovL2dpdGh1Yi5jb20vQ2hvY29sYXRlQWNlQ3JlYW0vdnVlcHJlc3MtYmxvZy9lZGl0L21haW4vZG9jcy86cGF0aFwiLFxuICAgIHRleHQ6IFwiUGxlYXNlIGhlbHAgbWUgaW1wcm92ZSB0aGlzIHBhZ2UhXCIsXG4gIH0sXG4gIC8vIFx1NjQxQ1x1N0QyMlx1OTE0RFx1N0Y2RVx1RkYwOFx1NEU4Q1x1OTAwOVx1NEUwMFx1RkYwOVxuICBzZWFyY2g6IHtcbiAgICBwcm92aWRlcjogXCJhbGdvbGlhXCIsXG4gICAgb3B0aW9uczogYWxnb2xpYVNlYXJjaE9wdGlvbnMsXG4gICAgLy8gXHU2NzJDXHU1NzMwXHU3OUJCXHU3RUJGXHU2NDFDXHU3RDIyXG4gICAgLy8gcHJvdmlkZXI6ICdsb2NhbCcsXG4gICAgLy8gb3B0aW9uczogbG9jYWxTZWFyY2hPcHRpb25zXG4gIH0sXG4gIC8vIFx1NUJGQ1x1ODIyQVx1NjgwRlx1NTNGM1x1NEZBN1x1NzkzRVx1NEVBNFx1OTRGRVx1NjNBNVx1OTE0RFx1N0Y2RVxuICBzb2NpYWxMaW5rczogW1xuICAgIHsgaWNvbjogXCJnaXRodWJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vQ2hvY29sYXRlQWNlQ3JlYW1cIiB9LFxuICAgIC8vIHtcbiAgICAvLyAgIGljb246IHtcbiAgICAvLyAgICAgc3ZnOiAnPHN2ZyByb2xlPVwiaW1nXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48dGl0bGU+XHU3ODAxXHU0RTkxPC90aXRsZT48cGF0aCBkPVwiTTExLjk4NCAwQTEyIDEyIDAgMCAwIDAgMTJhMTIgMTIgMCAwIDAgMTIgMTIgMTIgMTIgMCAwIDAgMTItMTJBMTIgMTIgMCAwIDAgMTIgMGExMiAxMiAwIDAgMC0uMDE2IDB6bTYuMDkgNS4zMzNjLjMyOCAwIC41OTMuMjY2LjU5Mi41OTN2MS40ODJhLjU5NC41OTQgMCAwIDEtLjU5My41OTJIOS43NzdjLS45ODIgMC0xLjc3OC43OTYtMS43NzggMS43Nzh2NS42M2MwIC4zMjcuMjY2LjU5Mi41OTMuNTkyaDUuNjNjLjk4MiAwIDEuNzc4LS43OTYgMS43NzgtMS43Nzh2LS4yOTZhLjU5My41OTMgMCAwIDAtLjU5Mi0uNTkzaC00LjE1YS41OTIuNTkyIDAgMCAxLS41OTItLjU5MnYtMS40ODJhLjU5My41OTMgMCAwIDEgLjU5My0uNTkyaDYuODE1Yy4zMjcgMCAuNTkzLjI2NS41OTMuNTkydjMuNDA4YTQgNCAwIDAgMS00IDRINS45MjZhLjU5My41OTMgMCAwIDEtLjU5My0uNTkzVjkuNzc4YTQuNDQ0IDQuNDQ0IDAgMCAxIDQuNDQ1LTQuNDQ0aDguMjk2WlwiLz48L3N2Zz4nLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIGxpbms6IFwiaHR0cHM6Ly9naXRlZS5jb20vQ2hhcmxlczdjL2NoYXJsZXM3Y1wiLFxuICAgIC8vIH0sXG4gICAge1xuICAgICAgaWNvbjoge1xuICAgICAgICBzdmc6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSAwaC0xNGMtMi43NjEgMC01IDIuMjM5LTUgNXYxNGMwIDIuNzYxIDIuMjM5IDUgNSA1aDE0YzIuNzYyIDAgNS0yLjIzOSA1LTV2LTE0YzAtMi43NjEtMi4yMzgtNS01LTV6bS0xMSAxOWgtM3YtMTFoM3YxMXptLTEuNS0xMi4yNjhjLS45NjYgMC0xLjc1LS43OS0xLjc1LTEuNzY0cy43ODQtMS43NjQgMS43NS0xLjc2NCAxLjc1Ljc5IDEuNzUgMS43NjQtLjc4MyAxLjc2NC0xLjc1IDEuNzY0em0xMy41IDEyLjI2OGgtM3YtNS42MDRjMC0zLjM2OC00LTMuMTEzLTQgMHY1LjYwNGgtM3YtMTFoM3YxLjc2NWMxLjM5Ni0yLjU4NiA3LTIuNzc3IDcgMi40NzZ2Ni43NTl6XCIvPjwvc3ZnPmAsXG4gICAgICB9LFxuICAgICAgbGluazogXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vZGktc2hlbmctNGI2OWIyODAvXCIsXG4gICAgfSxcbiAgXSxcblxuICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTYyNjlcdTVDNTU6IFx1NjU4N1x1N0FFMFx1NTE0M1x1NjU3MFx1NjM2RVx1OTE0RFx1N0Y2RVxuICAvLyBAdHMtaWdub3JlXG4gIGFydGljbGVNZXRhZGF0YUNvbmZpZzoge1xuICAgIGF1dGhvcjogXCJEaVwiLCAvLyBcdTY1ODdcdTdBRTBcdTUxNjhcdTVDNDBcdTlFRDhcdThCQTRcdTRGNUNcdTgwMDVcdTU0MERcdTc5RjBcbiAgICBhdXRob3JMaW5rOiBcIi9hYm91dC9tZVwiLCAvLyBcdTcwQjlcdTUxRkJcdTRGNUNcdTgwMDVcdTU0MERcdTY1RjZcdTlFRDhcdThCQTRcdThERjNcdThGNkNcdTc2ODRcdTk0RkVcdTYzQTVcbiAgICBzaG93Vmlld0NvdW50OiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBXHU2NTg3XHU3QUUwXHU5NjA1XHU4QkZCXHU2NTcwLCBcdTk3MDBcdTg5ODFcdTU3MjggZG9jcy8udml0ZXByZXNzL3RoZW1lL2FwaS9jb25maWcuanMgXHU1M0NBIGludGVyZmFjZS5qcyBcdTkxNERcdTdGNkVcdTU5N0RcdTc2RjhcdTVFOTQgQVBJIFx1NjNBNVx1NTNFM1xuICB9LFxuICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTYyNjlcdTVDNTU6IFx1NjU4N1x1N0FFMFx1NzI0OFx1Njc0M1x1OTE0RFx1N0Y2RVxuICBjb3B5cmlnaHRDb25maWc6IHtcbiAgICBsaWNlbnNlOiBcIkNDIEJZLVNBIDQuMCBERUVEXCIsXG4gICAgbGljZW5zZUxpbms6IFwiaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvNC4wL1wiLFxuICB9LFxuICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTYyNjlcdTVDNTU6IFx1OEJDNFx1OEJCQVx1OTE0RFx1N0Y2RVxuICBjb21tZW50Q29uZmlnOiB7XG4gICAgdHlwZTogXCJnaXRhbGtcIixcbiAgICBzaG93Q29tbWVudDogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQVx1OEJDNFx1OEJCQVxuICB9LFxuICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTYyNjlcdTVDNTU6IFx1OTg3NVx1ODExQVx1OTE0RFx1N0Y2RVxuICBmb290ZXJDb25maWc6IHtcbiAgICBzaG93Rm9vdGVyOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBXHU5ODc1XHU4MTFBXG4gICAgaWNwUmVjb3JkQ29kZTogXCJcdTZEMjVJQ1BcdTU5MDcyMDIyMDA1ODY0XHU1M0Y3LTJcIiwgLy8gSUNQXHU1OTA3XHU2ODQ4XHU1M0Y3XG4gICAgcHVibGljU2VjdXJpdHlSZWNvcmRDb2RlOiBcIlx1NkQyNVx1NTE2Q1x1N0Y1MVx1NUI4OVx1NTkwNzEyMDExMjAyMDAwNjc3XHU1M0Y3XCIsIC8vIFx1ODA1NFx1N0Y1MVx1NTkwN1x1Njg0OFx1NTNGN1xuICAgIGNvcHlyaWdodDogYENvcHlyaWdodCBcdTAwQTkgMjAxOS0ke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gQ2hhcmxlczdjYCwgLy8gXHU3MjQ4XHU2NzQzXHU0RkUxXHU2MDZGXG4gIH0sXG59OyJdLAogICJtYXBwaW5ncyI6ICI7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QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7IiwKICAibmFtZXMiOiBbIm5hbWUiXQp9Cg==
