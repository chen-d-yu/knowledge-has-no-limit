<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, watchEffect } from 'vue'
import Loading from '@/theme/pages/Loading.vue'
import Avatar from '@/theme/pages/Avatar.vue'

const { Layout } = DefaultTheme

// 每日一言
const daily = ref<Partial<DailyVO>>({})
const loadingShow = ref(true)

// 获取当前颜色模式，dark or auto
const { isDark, page, frontmatter } = useData()

// banner
const banners = [
  'https://minio.sciento.cn/st-public/2/52f18f0ed63d4ae9a7be90d11db0793a@bg12.jpg',
  'https://minio.sciento.cn/st-public/2/81b8f1f296c54ce9a019b786a1096009@bg13.jpg'
]
const banner = computed(() => banners[Math.floor(Math.random() * banners.length)])

// event
// 当前滚动高度
const { y } = useWindowScroll()
const scrollFlag = computed(() => y.value > 200)

onMounted(() => {
  dailyWord()

  setTimeout(() => {
    loadingShow.value = false
  }, 2000)
})

/**
 * 滚动计算样式
 * 1.样式初始化
 * 2.设置滚动 [200px] 样式
 */
const navBarStyle = computed(() => ({
  background: isDark.value ? 'var(--vp-c-bg)' : scrollFlag.value ? '#fff' : 'initial',
  color: isDark.value ? '#fff' : scrollFlag.value ? 'var(--vp-c-text-1)' : '#fff',
  backdrop: isDark.value ? 'initial' : scrollFlag.value ? 'blur(16px)' : 'blur(20px)',
  top: isDark.value
    ? `calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) - ${y.value}px)`
    : `calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px - ${y.value}px)`
}))

// request
/**
 * 每日一言：放在footer
 */
const dailyWord = async () => {
  try {
    const res = await dailyWordRequest({
      collection: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'],
      max_length: 30
    })
    daily.value = { ...res }
  } catch (e) {
    console.log(e)
  }
}
const dailyWordRequest = (params: DailyWordDTO) => {
  return new Promise<DailyVO>((resolve, reject) => {
    // 处理参数，拼接为c=a&c=b...
    let url = 'https://v1.hitokoto.cn'
    const paramsArr = Object.keys(params).reduce((prev, item, index, arr) => {
      item === 'collection'
        ? prev.push(
            ...params[item].reduce((prev, item) => {
              prev.push(`c=${item}`)
              return prev
            }, [] as string[])
          )
        : prev.push(`${item}=${params[item]}`)

      return prev
    }, [] as string[])

    if (Object.keys(params).length !== 0) {
      url = url + '?' + paramsArr.join('&')
    }

    fetch(url, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((res) => resolve(res))
  })
}
</script>

<template>
  <Loading :show="loadingShow" />
  <Layout>
    <!-- 背景图 -->
    <template #home-hero-before>
      <div class="banner-wrap absolute top-0 left-0 w-full">
        <div class="banner-img bg-center bg-cover w-full bg-no-repeat" :style="{ backgroundImage: `url(${banner})` }" />
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

    <!-- home-hero-image 头像 -->
    <template #home-hero-image>
      <Avatar />
    </template>

    <!-- daily每日一言 -->
    <template #home-features-after>
      <div class="footer-daily flex flex-col">
        <p class="content">{{ daily.hitokoto }}</p>
        <div class="author self-end">{{ `- ${daily.creator}` || '--' }}</div>
      </div>
    </template>
  </Layout>
</template>

<style lang="less" scoped>
// banner
@media screen and (max-width: 640px) {
  // 640px
  .banner-img {
    height: 540px;
  }
}

@media screen and (max-width: 768px) and (min-width: 640px) {
  // 640px ~ 768px
  .banner-img {
    height: 650px;
  }
}

@media screen and (max-width: 960px) and (min-width: 768px) {
  // 768px ~ 960px
  .banner-img {
    height: 650px;
  }
}

@media screen and (min-width: 960px) {
  // 960px +
  .banner-img {
    height: 600px;
  }
}

// 导航栏
:deep(.VPNav) {
  .active {
    color: var(--vp-c-brand) !important;
  }

  .VPNavBar .VPNavBarTitle .title {
    color: v-bind("page.isNotFound ? '#00' :'#fff'");
  }

  .VPNavBar:not(.has-sidebar) {
    background: v-bind("isDark ? 'var(--vp-c-bg)' : 'transparent'");
    border-bottom: v-bind(
      "isDark ? '1px solid #000' : page.isNotFound ? '1px solid var(--vp-c-gutter)' : '1px solid transparent'"
    );
    backdrop-filter: blur(20px);

    .VPMenuGroup {
      .title {
        color: #fff;
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
    top: v-bind('navBarStyle.top');
  }
}

@media screen and (min-width: 768px) {
  // 768px +
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

@media screen and (min-width: 960px) {
  // 960px +
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

// hero插槽
:deep(.VPHero.has-image) {
  .name,
  .text,
  .tagline {
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

.name,
.text {
  max-width: 392px;
  letter-spacing: -0.4px;
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

@media screen and (min-width: 640px) {
  // 640px ~ 960px
  .name,
  .text {
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
}

@media screen and (min-width: 960px) {
  // 960px +
  .name,
  .text {
    line-height: 64px;
    font-size: 56px;
  }

  :deep(.VPHero.has-image) {
    .name,
    .text,
    .tagline {
      margin: 0;
    }
  }

  .tagline {
    line-height: 36px;
    font-size: 24px;
  }
}

// feature每日一言
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

@media screen and (min-width: 640px) {
  // 640px ~ 960px
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
</style>
