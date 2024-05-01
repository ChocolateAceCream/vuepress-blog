import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "Categories",
    items: [
      {
        text: "Bug万象集",
        link: "/categories/issues/index",
        activeMatch: "/categories/issues/",
      },
      {
        text: "fragments",
        link: "/categories/fragments/index",
        activeMatch: "/categories/fragments/",
      },
      {
        text: "工具四海谈",
        link: "/categories/tools/index",
        activeMatch: "/categories/tools/",
      },
      {
        text: "方案春秋志",
        link: "/categories/solutions/index",
        activeMatch: "/categories/solutions/",
      },
    ],
    activeMatch: "/categories/",
  },
  {
    text: "Tags",
    link: "/tags",
    activeMatch: "/tags",
  },
  {
    text: "Archives",
    link: "/archives",
    activeMatch: "/archives",
  },
  {
    text: "About Me",
    link: "/about/me",
    activeMatch: "/about/me",
  },
];