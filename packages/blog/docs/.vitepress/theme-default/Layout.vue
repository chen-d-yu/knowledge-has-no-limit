<script setup lang="ts">
import Home from "./components/Home.vue";
import { useData, useRoute } from "vitepress";
import { computed } from "vue";
const { page, frontmatter } = useData();
const route = useRoute();

const enableHome = computed(() => !!route.data.frontmatter.home);

console.log("🚀 ~ 芜湖，爷来辣", frontmatter.value);
</script>

<template>
  <Home v-if="enableHome"></Home>
</template>

<style></style>
