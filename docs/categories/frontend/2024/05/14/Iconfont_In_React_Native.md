---
title: Integrate Iconfont in RN
author: ChocolateAceCream
date: 2024/05/14 19:00
isTop: false
categories:
 - frontend
tags:
 - TypeScript
 - React Native
 - Iconfont
---

# Integrate Iconfont in React Native<Badge text="React Native" type="warning" />
Motivation: the default expo FontAwesome won't let you use your own svg. So I want to integrate Iconfont to manage my own svg set. It's always good to have control of what you using.

## How it works
use createIconSet from react-native-vector-icons to create a icon set which can be imported when use. However, createIconSet requires three params:
- glyphMap (map of icon name to glyph represent of icon, which we need to generate ourselves)
- fontFamily (we know it's iconfont)
- ttf file path (we can download the ttf file from your iconfont project)
if we open the css file download from iconfont, we can see each icon has a hex representation number, we used that number to generate our own glyphMap, which map the icon name to a decimal number which equal to that hex number.
We can write our own script to do that or use existing tools like [iconfonttojson](https://github.com/Jon-Millent/iconfont-to-json)

## Step by step instruction
1. download iconfont project as a font class
2. install iconfont-to-json, which is used to convert css file to a glyphMap
> npm i iconfont-to-json -g
3. add to your package.json
```json
{
  "scripts": {
    "build:iconfont": "iconfonttojson ./font/iconfont.css"
  },
}
```
4. run the script, generate glyphMap
5. create an iconfont component
```jsx
import { createIconSet } from "react-native-vector-icons";
import glyphMap from "@/font/iconfont.js";

const iconSet = createIconSet(
  glyphMap,
  "iconfont",
  require("@/assets/fonts/iconfont.ttf")
);

export default iconSet;

export const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  getImageSource,
} = iconSet;
```

6. used it in your project
```ts
import IconFont from "@/components/IconFont";
const buildTabBarIcon = (iconName: string, props: any) => (
  <IconFont name={iconName} size={18} style={{ color: props.tintColor }} />
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) =>
            buildTabBarIcon("icon-blog-menu", { tintColor: color }),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) =>
            buildTabBarIcon("icon-blog-home", { tintColor: color }),
        }}
      />
    </Tabs>
  );
}

```

p.s. remember to edit path to your files.