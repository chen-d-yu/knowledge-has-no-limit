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

const test = () => {
}
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <div class='banner-wrap absolute top-0 left-0 w-full'>
        <div
          class='banner-img bg-center bg-cover w-full bg-no-repeat'
          style="background-image: url('/bg12.jpg'); height: 600px"
          @click='test'
        />
      </div>
    </template>
    <!--  feature部分会嵌进banner，用空盒子撑开  -->
    <template #home-hero-after>
      <div class='empty-box'></div>
    </template>
  </Layout>
</template>

<style lang='less' scoped>
.empty-box {
  height: 300px; /* 高度不固定，暂定300px */
}

// 样式穿透
:deep(.VPNavBar) {
  transition: backdrop-filter 0.4s ease;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);

  // 覆盖导航栏navLinks字体颜色
  .title,
  .VPNavBarMenuLink,
  .VPNavBarMenuGroup .button .text {
    color: #fff;
  }

  .VPNavBarMenuGroup .menu .VPMenu .items .VPMenuGroup .title {
    color: #000;
  }

  .content .content-body {
    transition: backdrop-filter 0.4s ease;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
  }
}

:deep(.has-sidebar) {
  backdrop-filter: blur(0px) !important;
  // 覆盖导航栏navLinks字体颜色

  .container {
    .title {
      color: inherit;
    }

    .content {
      .content-body {
        .VPNavBarMenuLink,
        .VPNavBarMenuGroup .button .text {
          color: inherit;
        }
      }
    }
  }

  .active {
    color: var(--vp-c-brand) !important;
  }
}

@media (min-width: 960px) {
  :deep(.VPNavBar.fill:not(.has-sidebar)) {
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);

    // 覆盖导航栏navLinks字体颜色
    .title,
    .VPNavBarMenuLink,
    .VPNavBarMenuGroup .text {
      color: v-bind("isDark ? '#fff' :'#000'");
    }

    .content .content-body {
      transition: backdrop-filter 0.4s ease, background-color 0.5s;
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
    }
  }
}
</style>
