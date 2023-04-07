<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

const { Layout } = DefaultTheme

// 获取当前颜色模式，dark or auto
const { isDark } = useData()

// event
// 当前滚动高度
const { y } = useWindowScroll()
const scrollFlag = computed(() => y.value > 200)

/**
 * 滚动计算样式
 * 1.样式初始化
 * 2.设置滚动 [200px] 样式
 */
const navBarStyle = computed(() => ({
  background: isDark.value ? 'var(--vp-c-bg)' : scrollFlag.value ? '#fff' : 'initial',
  color: isDark.value ? '#fff' : scrollFlag.value ? 'var(--vp-c-text-1)' : '#fff',
  backdrop: isDark.value ? 'initial' : scrollFlag.value ? 'blur(16px)' : 'blur(20px)'
}))
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <div class="banner-wrap absolute top-0 left-0 w-full">
        <div class="banner-img bg-center bg-cover w-full bg-no-repeat" style="background-image: url('/bg12.jpg')" />
      </div>
    </template>
    <!--    feature部分会嵌进banner，用空盒子撑开-->
    <template #home-hero-after>
      <div class="empty-box h-6 sm:hidden lg:block lg:h-44"></div>
    </template>
  </Layout>
</template>

<style lang="less" scoped>
// 640px
.banner-img {
  height: 540px;
}

:deep(.VPNav) {
  .active {
    color: var(--vp-c-brand) !important;
  }

  .VPNavBar .VPNavBarTitle .title {
    color: #fff;
  }

  .VPNavBar:not(.has-sidebar) {
    background: v-bind("isDark ? 'var(--vp-c-bg)' : 'transparent'");
    border-bottom: v-bind("isDark ? '1px solid #000' : '1px solid transparent'");
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
        background-color: #fff;
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
    top: v-bind(
      "isDark ? 'calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px))' : 'calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px)'"
    );
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
      color: #fff;
    }

    .VPNavBarMenuGroup .text {
      color: #fff;
    }

    .VPNavBarExtra .icon {
      fill: #fff;
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
      background-color: #fff;

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
