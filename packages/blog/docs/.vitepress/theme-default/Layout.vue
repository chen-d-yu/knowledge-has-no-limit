<script setup lang="ts">
// page
import Home from "./pages/Home.vue";
// components
import Loading from "./components/Loading.vue";
import NavBar from "./components/NavBar.vue";
import { useData, useRoute } from "vitepress";
import { computed, onMounted, ref } from "vue";
import { debounce } from "../public/js/utils";

// hooks -> state
const { page, frontmatter, site } = useData();
const route = useRoute(); // vitepress的路由，也就是每个 .md 文件的 YAML 配置

const loadingStatus = ref(true);

// 生命周期
onMounted(() => {
  document.addEventListener("scroll", scrollWithDebounce);

  setTimeout(() => {
    loadingStatus.value = false;
  }, 1500);
});

// computed
const enableHome = computed(() => !!route.data.frontmatter.home);

const showNavbar = computed(() => {
  const { themeConfig } = site.value;
  const { frontmatter } = route.data;
  if (frontmatter.navbar === false || themeConfig.navbar === false) {
    return false;
  }
  return (
    site.value.title || themeConfig.logo || themeConfig.repo || themeConfig.nav
  );
});

// handler function
const scrollHandle = (e: any) => {
  console.log("🚀 ~ 芜湖，爷来辣", e);

  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  //变量windowHeight是可视区的高度
  let windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  //变量scrollHeight是滚动条的总高度
  let scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  //滚动条到底部的条件
  let thresold = scrollHeight - scrollTop - windowHeight;
  // _this.scrollTop = scrollTop;
  // if (thresold > -50 && thresold <= 100) {
  //   if (_this.blogInfo.blog.length != 0) {
  //     _this.pageChange();
  //   }
  // }
};
const scrollWithDebounce = debounce(scrollHandle, 1000);
</script>

<template>
  <div class="blog-container bg-gray-100">
    <Loading :show="loadingStatus" />
    <NavBar v-if="showNavbar" />
    <Home v-if="$frontmatter.home"></Home>
  </div>

  <!-- <NavBar v-if="showNavbar" @toggle="toggleSidebar">
      <template #search>
        <slot name="navbar-search">
          <AlgoliaSearchBox
            v-if="theme.algolia"
            :options="theme.algolia"
            :multilang="!!theme.locales"
            :key="siteRouteData.lang"
          />
        </slot>
      </template>
    </NavBar> -->
</template>

<style></style>
