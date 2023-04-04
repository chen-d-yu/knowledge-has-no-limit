<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed, ref } from 'vue'

const { Layout } = DefaultTheme

// 获取当前颜色模式，dark or auto
const { isDark } = useData()
const appearanceMode = computed(() => (isDark.value ? `#1e1e20` : `transparent`))

// event
const test = () => {
  console.log(appearanceMode)
}

// const { y } = useWindowScroll()
// const { hasSidebar } = useSidebar()
//
// const classes = computed(() => ({
//     'has-sidebar': hasSidebar.value,
//     fill: y.value > 0
// }))
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <div class="banner-wrap absolute top-0 left-0 w-full">
        <div
          class="banner-img bg-center bg-cover w-full bg-no-repeat"
          style="background-image: url('/bg12.jpg'); height: 600px"
          @click="test"
        ></div>
      </div>
    </template>
    <template #home-hero-after>
      <div class="empty-box"></div>
    </template>
  </Layout>
</template>

<style lang="less" scoped>
.empty-box {
  height: 300px;
  border: 1px solid red;
}

// 样式穿透
:deep(.VPNavBar) {
  transition: backdrop-filter 0.4s ease;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  // 覆盖导航栏navLinks字体颜色
  .title,
  .VPNavBarMenuLink,
  .VPNavBarMenuGroup .text,
  .VPNavBarMenuGroup .VPMenu .item .menu .title {
    color: #fff;
  }

  //background-color: v-bind(appearanceMode);
}

@media (min-width: 960px) {
  :deep(.VPNavBar.fill:not(.has-sidebar)) {
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    // 覆盖导航栏navLinks字体颜色
    .title,
    .VPNavBarMenuLink,
    .VPNavBarMenuGroup .text {
      color: #000;
    }
  }
}
</style>
