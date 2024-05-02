import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "Categories",
    items: [
      {
        text: "Frontend",
        link: "/categories/frontend/index",
        activeMatch: "/categories/frontend/",
      },
      {
        text: "Backend",
        link: "/categories/backend/index",
        activeMatch: "/categories/backend/",
      },
      {
        text: "DevOps",
        link: "/categories/DevOps/index",
        activeMatch: "/categories/DevOps/",
      },
      {
        text: "IoT",
        link: "/categories/IoT/index",
        activeMatch: "/categories/IoT/",
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