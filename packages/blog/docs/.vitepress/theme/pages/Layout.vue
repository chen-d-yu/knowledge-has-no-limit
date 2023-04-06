<script lang='ts' setup>
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
const scrollFill = computed(() => y.value > 200)
// 滚动计算样式
/**
 * 1.样式初始化
 * 2.设置滚动 [200px] 样式
 */
// 白天主题
const autoNavBarStyle = computed(() => ({
  background: y.value > 200 ? '#fff' : 'initial',
  backdrop: y.value > 200 ? 'blur(4px)' : 'blur(20px)',
  color: y.value > 200 ? '#000' : '#fff'
}))

// 黑夜主题
const darkNavBarStyle = computed(() => ({
  background: isDark.value ? 'var(--vp-c-bg)' : y.value > 200 ? '#fff' : 'initial',
  navScreenTop: isDark.value ? 'calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px))' : 'calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px)',
  border: isDark.value ? '1px solid rgba(0,0,0,0.8)' : '1px solid transparent'
}))

const test = () => {
}
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <div class='banner-wrap absolute top-0 left-0 w-full'>
        <div
          class='banner-img bg-center bg-cover w-full bg-no-repeat'
          style="background-image: url('/bg12.jpg')"
          @click='test'
        />
      </div>
    </template>
    <!--    feature部分会嵌进banner，用空盒子撑开-->
    <template #home-hero-after>
      <div class='empty-box h-6 sm:hidden lg:block lg:h-44'></div>
    </template>
  </Layout>
</template>

<style lang='less' scoped>
.banner-img {
  height: 540px;
}

@media screen and (max-width: 960px) and (min-width: 640px) {
  .banner-img {
    height: 650px;
  }
}

@media screen and (min-width: 960px) {
  .banner-img {
    height: 600px;
  }
}

@media screen and (min-width: 768px) {
  :deep(.VPNav) {
    .VPNavBarMenu {
      .VPNavBarMenuLink,
      .VPNavBarMenuGroup .text {
        color: v-bind("isDark ? '#fff' :autoNavBarStyle.color");
      }
    }

    .VPNavBarExtra .icon {
      fill: #fff;
    }
  }
}

:deep(.VPNav) {
  .VPNavBar {
    backdrop-filter: blur(20px);
    background-color: v-bind('darkNavBarStyle.background');
    border-bottom: v-bind('darkNavBarStyle.border');

    .VPNavBarHamburger {
      .top, .bottom, .middle {
        background-color: #fff;
      }
    }

    .VPNavBarTitle .title {
      color: #ffffff;
    }
  }

  .VPNavScreen {
    top: v-bind('darkNavBarStyle.navScreenTop');
  }


  .VPNavBar:has(.has-sidebar) {
    background-color: transparent;

    .VPNavBarTitle .title {
      color: #000;
    }
  }
}

//--vp-c-bg


//.empty-box {
//  height: 100px; /* 高度不固定，暂定300px */ // 640下设置100px
//}
//@media (min-width: 640px) {
//}
//
//
//// 样式穿透
//:deep(.VPNav) {
//  //backdrop-filter: blur(20px);
//
//  //初始化背景颜色
//  .VPNavBar.fill:not(.has-sidebar) {
//    transition: backdrop-filter 0.4s ease, background-color 0.5s;
//    background-color: v-bind("isDark ? 'var(--vp-nav-bg-color)' : autoNavBarStyle.background");
//    backdrop-filter: v-bind('autoNavBarStyle.backdrop');
//    -webkit-backdrop-filter: v-bind('autoNavBarStyle.backdrop');
//  }
//
//  .container .content-body {
//    background-color: inherit;
//  }
//
//  //常态下导航栏字体颜色
//  .VPNavBar {
//    transition: color 0.5s;
//    background-color: v-bind("isDark ? 'var(--vp-nav-bg-color)' : 'initial'");
//
//    .VPNavBarTitle > .title {
//      color: #fff;
//    }
//
//    .VPNavBarMenu {
//      .VPNavBarMenuLink,
//      .VPNavBarMenuGroup .text {
//        color: #fff;
//      }
//    }
//
//    .VPNavBarHamburger {
//      .top,
//      .middle,
//      .bottom {
//        background-color: #fff;
//      }
//    }
//  }
//
//  //滚动 [200px] 导航栏字体颜色
//  .VPNavBar.fill:not(.has-sidebar) {
//    .VPNavBarTitle > .title {
//      color: v-bind("isDark ? '#fff' :autoNavBarStyle.color");
//    }
//
//    .VPNavBarMenu {
//      .VPNavBarMenuLink,
//      .VPNavBarMenuGroup .text {
//        color: v-bind("isDark ? '#fff' :autoNavBarStyle.color");
//      }
//    }
//  }
//}
</style>
