import type { MarkdownOptions } from 'vitepress'

export const markdown: MarkdownOptions = {
  theme: 'one-dark-pro', // Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
  lineNumbers: true, // 启用行号

  // 在所有文档的<h1>标签后添加<ArticleMetadata/>组件
  // 感谢: https://github.com/vuejs/vitepress/issues/1050
  config: (md) => {
    md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
      let htmlResult = slf.renderToken(tokens, idx, options, env, slf)
      if (tokens[idx].tag === 'h1') htmlResult += `\n<ArticleMetadata v-if="$frontmatter?.aside ?? true"/>`
      return htmlResult
    }
  }
}