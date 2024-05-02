---
title: Dayjs i18n
author: ChocolateAceCream
date: 2023/07/13 19:00
isTop: false
categories:
 - frontend
tags:
 - Dayjs
 - i18n
 - Vue3
---

# Dayjs i18n setting in vue3 <Badge text="Dayjs" type="warning" />

### purpose:
Import dayjs as a global instance and switching its locale according to user setting in a vue3 app

1. install dayjs
```bash
npm install dayjs --save
```

2. import dayjs in main.js
```js
import dayjs from 'dayjs'
// or import { dayjs } from 'element-plus' is you using element-plus

import relativeTime from 'dayjs/plugin/relativeTime' // dayjs plugin

const app = createApp(App)
dayjs.extend(relativeTime)
app.provide('dayjs', dayjs)

```

3. usage in vue3 file
```js
export default defineComponent({
  setup(props, ctx) {
    const dayjs = inject('dayjs')
    const state = reactive({
      timestamp: computed(() => {
        return dayjs(state.articleInfo.updatedAt).fromNow()
      })
    })
    return {
      ...toRefs(state)
    }
  }
})
```

4. i18n setting for dayjs in App.vue
According to dayjs documentation:
>- By default, Day.js comes with English locale only.
>- Once you load a locale, it becomes the active locale. To change active locales, simply call dayjs.locale with the key of a loaded locale to change global locale.
>- Changing the global locale doesn't affect existing instances.

In order to see the change for existing dayjs instance, we need to reload the page, so we first implement a reload() in app.vue and then call that method for each time user switch a locale

```vue
// App.vue
<template>
  <el-config-provider
    :locale="locale"
    :size="`default`"
    :z-index="3000"
  >
    <router-view
      v-if="isRouterAlive"
      :key="$route.fullPath"
    />
  </el-config-provider>

</template>
import 'dayjs/locale/zh-cn'

export default defineComponent({
  setup(props, ctx) {
    const dayjs = inject('dayjs')
    const dayjsLocaleMapper = {
      'cn': 'zh-cn',
      'en': 'en'
    }
    const state = reactive({
      locale: zhCn,
      isRouterAlive: true,
    })
    const store = useSessionStore()
    store.$subscribe(async(_, s) => {
      dayjs.locale(dayjsLocaleMapper[s.userInfo.locale])
      reload()
    })
    return {
      ...toRefs(state)
    }
  }
})
```