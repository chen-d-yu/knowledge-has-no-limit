<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import {useData} from 'vitepress'
import {useWindowScroll} from '@vueuse/core'
import {computed, onMounted, ref} from 'vue'

const {Layout} = DefaultTheme

// 每日一言
const daily = ref({
  content: "",
  author: ""
})


// 获取当前颜色模式，dark or auto
const {isDark, page, frontmatter} = useData()

// event
// 当前滚动高度
const {y} = useWindowScroll()
const scrollFlag = computed(() => y.value > 200)

/**
 * 滚动计算样式
 * 1.样式初始化
 * 2.设置滚动 [200px] 样式
 */
const navBarStyle = computed(() => ({
  background: isDark.value ? 'var(--vp-c-bg)' : scrollFlag.value ? '#fff' : 'initial',
  color: isDark.value ? '#fff' : scrollFlag.value ? 'var(--vp-c-text-1)' : '#fff',
  backdrop: isDark.value ? 'initial' : scrollFlag.value ? 'blur(16px)' : 'blur(20px)',
  top: isDark.value ? `calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) - ${y.value}px)` : `calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px - ${y.value}px)`
}))


// request
onMounted(() => {
  dailyWord()
})

/**
 * 每日一言：放在footer
 */
const dailyWord = async () => {
  try {
    const res: any = await dailyWordRequest({
      count: 1,
      app_id: "ltuct8nnnqxjcbiu",
      app_secret: "YzhxS2hhTFRCS2IvSlRMT3RTSkpaUT09"
    })
    daily.value = res.data[0]
  } catch (e) {
    console.log(e)
  } finally {

  }

}
const dailyWordRequest = (params: { count?: number, app_id: string, app_secret: string }) => {
  return new Promise((resolve, reject) => {
    let url = "https://www.mxnzp.com/api/daily_word/recommend"
    const paramsArr = Object.keys(params).map((item, index, arr) => {
      return `${item}=${params[item]}`
    })
    if (Object.keys(params).length !== 0) {
      url = url + "?" + paramsArr.join("&")
    }
    fetch(url, {
      method: "GET"
    })
        .then(res => res.json())
        .then(res => resolve(res))
  })
}

const test = () => {
  console.log(daily.value)
}
</script>

<template>
  <Layout @click="test">
    <!-- 背景图 -->
    <template #home-hero-before>
      <div class="banner-wrap absolute top-0 left-0 w-full">
        <div class="banner-img bg-center bg-cover w-full bg-no-repeat" style="background-image: url('/bg12.jpg')"/>
      </div>
    </template>
    <!-- feature部分会嵌进banner，用空盒子撑开 -->
    <template #home-hero-after>
      <div class="empty-box h-6 sm:hidden lg:block lg:h-44"></div>
    </template>

    <!-- home-hero-info -->
    <template #home-hero-info>
      <div class="flex flex-col">
        <h1 class="name">
          <span class="clip">{{ frontmatter.hero.name }}</span>
        </h1>
        <p class="text">{{ frontmatter.hero.text }}</p>
        <p class="tagline">{{ frontmatter.hero.tagline }}</p>
      </div>
    </template>
    <!-- home-hero-image -->
    <!--    <template #home-hero-image>-->
    <!--      <img src="/logo.svg" alt="">-->
    <!--    </template>-->
    <template #home-features-after>
      <div class="footer-daily flex flex-col">
        <p class="content">{{ daily.content }}</p>
        <div class="author self-end">{{ `- ${daily.author}` || '--' }}</div>
      </div>
    </template>
  </Layout>
</template>

<style lang="less" scoped>


:deep(.VPHero.has-image) {
  .name, .text, .tagline {
    margin: 0 auto;
  }
}

.name {
  color: var(--vp-home-hero-name-color);

  .clip {
    background: var(--vp-home-hero-name-background);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: var(--vp-home-hero-name-color);
  }
}

.name, .text {
  max-width: 392px;
  letter-spacing: -.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

.text {
  color: rgba(255, 255, 245, 0.95);
}

.tagline {
  color: rgba(235, 235, 245, 0.7);
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
}


:deep(.VPNav) {
  .active {
    color: var(--vp-c-brand) !important;
  }

  .VPNavBar .VPNavBarTitle .title {
    color: v-bind("page.isNotFound ? '#00' :'#fff'");
  }

  .VPNavBar:not(.has-sidebar) {
    background: v-bind("isDark ? 'var(--vp-c-bg)' : 'transparent'");
    border-bottom: v-bind("isDark ? '1px solid #000' : page.isNotFound ? '1px solid var(--vp-c-gutter)' : '1px solid transparent'");
    backdrop-filter: blur(20px);

    .VPMenuGroup {
      .title {
        color: #fff;
        //color: v-bind("page.isNotFound ? '#00' :'#fff'");
      }
    }

    .VPNavBarHamburger {
      .top,
      .middle,
      .bottom {
        background-color: v-bind("isDark ? '#fff' : page.isNotFound ? '#000' :'#fff'");
      }
    }

    .VPNavBarSearch {
      .DocSearch-Search-Icon {
        color: #fff;
      }
    }
  }

  .VPNavBar .has-sidebar {
    .title {
      color: var(--vp-c-text-1);
    }

    .VPNavBarHamburger {
      .top,
      .middle,
      .bottom {
        background-color: var(--vp-c-text-1);
      }
    }
  }

  .VPNavScreen {
    top: v-bind("navBarStyle.top");
  }
}


.footer-daily {
  margin: 40px auto 0;
  max-width: 392px;
  font-size: 16px;
  font-weight: 600;

  .author {
    margin-top: 10px;
    font-weight: normal;
    font-size: 14px;
    opacity: 0.7;
  }
}

// 640px
@media screen and  (max-width: 640px) {
  .banner-img {
    height: 540px;
  }
}

// 640px ~ 960px
@media screen and  (min-width: 640px) {
  .name, .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }

  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }

  .footer-daily {
    margin: 60px auto 0;
    max-width: 576px;
    font-size: 18px;

    .author {
      margin-top: 20px;
      font-size: 16px;
    }
  }
}


// 640 - 768
@media screen and (max-width: 768px) and (min-width: 640px) {
  .banner-img {
    height: 650px;
  }
}

// 768 - 960
@media screen and (max-width: 960px) and (min-width: 768px) {
  .banner-img {
    height: 650px;
  }
}

@media screen and (min-width: 768px) {
  :deep(.VPNav) {
    .VPNavBar:not(.has-sidebar) {
      .VPMenuGroup {
        .title {
          color: var(--vp-c-text-2);
        }
      }
    }

    .VPNavBarMenu .VPNavBarMenuLink {
      color: v-bind("page.isNotFound  ? 'var(--vp-c-text-1)' : '#fff' ");
    }

    .VPNavBarMenuGroup .text {
      color: v-bind("page.isNotFound  ? 'var(--vp-c-text-1)' : '#fff' ");
    }

    .VPNavBarExtra .icon {
      fill: v-bind("page.isNotFound  ? 'var(--vp-c-text-1)' : '#fff' ");
    }

    .DocSearch-Button {
      background-color: var(--vp-c-bg-alt);
      color: var(--vp-c-text-2);
    }

    .DocSearch-Search-Icon {
      color: var(--vp-c-text-2) !important;
    }
  }
}

// 960 +
@media screen and (min-width: 960px) {

  :deep(.VPHero.has-image) {
    .name, .text, .tagline {
      margin: 0;
    }
  }

  .name, .text {
    line-height: 64px;
    font-size: 56px;
  }


  .tagline {
    line-height: 36px;
    font-size: 24px;
  }

  .banner-img {
    height: 600px;
  }

  :deep(.VPNav) {
    .VPNavBar.fill:not(.has-sidebar) {
      background-color: v-bind('navBarStyle.background');
      backdrop-filter: v-bind('navBarStyle.backdrop');

      .content-body {
        background-color: initial;
      }

      .VPNavBarTitle .title {
        color: v-bind('navBarStyle.color');
      }

      .VPNavBarMenu .VPNavBarMenuLink {
        color: v-bind('navBarStyle.color');
      }

      .VPNavBarMenuGroup .text {
        color: v-bind('navBarStyle.color');
      }
    }

    .VPNavBar.has-sidebar {
      background: v-bind("isDark ? 'var(--vp-c-bg)' : '#fff'");

      .container > .title {
        .VPNavBarTitle {
          position: relative;
          z-index: 1;
        }

        &:after {
          z-index: 0;
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: var(--vp-sidebar-bg-color);
        }
      }

      .content-body {
        background-color: initial;
      }

      .VPNavBarTitle .title {
        color: var(--vp-c-text-1);
      }

      .VPNavBarMenu .VPNavBarMenuLink {
        color: var(--vp-c-text-1);
      }

      .VPNavBarMenuGroup .text {
        color: var(--vp-c-text-1);
      }
    }
  }
}
</style>
