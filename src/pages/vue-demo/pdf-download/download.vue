<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="Efforts to generate PDF">
    <div class="article__heading">
      <div class="article__heading__title">
        {{ article.title }}
      </div>
    </div>
    <div style="color: #ccc">
      This article is from Evan You on
      <a target="_blank" href="https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf">medium</a>
    </div>
    <div ref="content" class="node-article-content" v-html="article.content" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: '',
      fullscreenLoading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      import('./content.js').then(data => {
        const { title } = data.default
        document.title = title
        this.article = data.default
        setTimeout(() => {
          this.fullscreenLoading = false
          this.$nextTick(() => {
            window.print()
          })
        }, 3000)
      })
    }
  }
}
</script>

<style lang="scss">
@mixin clearfix {
  &:before {
    display: table;
    clear: both;
    content: '';
  }

  &:after {
    display: table;
    clear: both;
    content: '';
  }
}

.main-article {
  display: block;
  width: 740px;
  padding: 20px;
  margin: 0 auto;
  background: #fff;
}

.article__heading {
  position: relative;
  padding: 0 0 20px;
  overflow: hidden;
}

.article__heading__title {
  display: block;
  display: -webkit-box;
  overflow: hidden;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  color: #333;
  word-wrap: break-word;
  overflow-wrap: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.node-article-content {
  margin: 20px 0 0;
  margin-bottom: 30px;
  font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman', Times, serif;
  font-size: 16px;
  line-height: 28px;
  color: #333;
  letter-spacing: 0.5px;
  @include clearfix;

  & > :last-child {
    margin-bottom: 0;
  }

  b,
  strong {
    font-weight: inherit;
    font-weight: bolder;
  }

  img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    border: 0;
    /* 解决 IE6-7 图片缩放锯齿问题 */
    -ms-interpolation-mode: bicubic;
  }

  p {
    font-size: 21px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.58;
    letter-spacing: -0.003em;
  }

  ul {
    margin-bottom: 30px;
  }

  li {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    margin-bottom: 14px;
    margin-left: 30px;
    font-size: 21px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.58;

    letter-spacing: 0.01rem;
    letter-spacing: -0.003em;
  }

  a {
    padding: 0 6px;
    text-decoration: none;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.84) 100%, rgba(0, 0, 0, 0) 0);
    background-repeat: repeat-x;
    background-position: 0 calc(1em + 1px);
    background-size: 1px 1px;
  }

  code {
    display: inline-block;
    padding: 3px 4px;
    margin: 0 2px;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.05);
  }

  blockquote {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    padding-bottom: 2px;
    padding-left: 20px;
    margin-left: -23px;
    font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman', Times, serif;
    font-size: 21px;
    font-style: italic;
    font-weight: 400;
    line-height: 1.58;
    letter-spacing: 0.01rem;
    letter-spacing: -0.003em;
    border-left: 3px solid rgba(0, 0, 0, 0.84);
  }

  h2,
  h3,
  h4 {
    margin: 53px 0 0;
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -0.015em;
  }

  h4 {
    font-size: 26px;
  }
}
</style>
