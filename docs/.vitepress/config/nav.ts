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
    text: "Readings",
    items: [
      {
        text: "MySQL",
        link: "/courses/MySQL/index",
        activeMatch: "/courses/MySQL/",
      },
      {
        text: "Orchestrator",
        link: "/courses/Orchestrator/index",
        activeMatch: "/courses/Orchestrator/",
      },
      {
        text: "Interview Questions",
        link: "/courses/InterviewQuestions/index",
        activeMatch: "/courses/InterviewQuestions/",
      },
      {
        text: "AWS Certification",
        link: "/courses/AWS/index",
        activeMatch: "/courses/AWS/",
      },
      // {
      //   text: "MyBatis快速入门",
      //   link: "/courses/mybatis/index",
      //   activeMatch: "/courses/mybatis/",
      // },
    ],
    activeMatch: "/courses/",
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