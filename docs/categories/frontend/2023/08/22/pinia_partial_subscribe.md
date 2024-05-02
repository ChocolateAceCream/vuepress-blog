---
title: Pinia Partial Subscribe
author: ChocolateAceCream
date: 2023/08/22 19:00
isTop: false
categories:
 - frontend
tags:
 - Pinia
 - Vue3
---

# Pinia Partial Subscribe <Badge text="Pinia" type="warning" />

### Problem
In my App.vue entry file, I subscribed to the pinia store, capture the change of locale and then reload my app to apply the change. However, when I use store.$subscribe(), it actually watch the whole store state. Any change to any field of store state will trigger the reload() function and cause problems.

e.g. old subscribe function in App.vue
```javascript
const store = useSessionStore()

store.$subscribe(async(_, s) => {
  state.locale = elementPlusLocaleMapper[s.userInfo.locale]
  locale.value = s.userInfo.locale
  dayjs.locale(dayjsLocaleMapper[s.userInfo.locale])
  reload()
})
```

if any component make change to any field of store state, reload() is triggered. e.g.
```javascript
onBeforeUnmount(() => {
  const store = useSessionStore()
  window.clearInterval(state.autoSave)
  store.currentEditingArticle = null
})
```

### Solution
I have to modify the original code so that I only watch to the store.userInfo.locale property
```javascript
watch(
  () => store.userInfo.locale,
  (newValue, _) => {
    state.locale = elementPlusLocaleMapper[newValue]
    locale.value = newValue
    dayjs.locale(dayjsLocaleMapper[newValue])
    reload()
  }
)
```
Now the app will only reload() when any change made to store.userInfo.locale property.