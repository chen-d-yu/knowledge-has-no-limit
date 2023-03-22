<script setup lang="ts">
import { useData } from "vitepress";
const { page, frontmatter } = useData();
console.log("🚀 ~ 芜湖，爷来辣", page);
</script>

<template>
  <h1>Custom Layout!</h1>
  <div v-if="page.isNotFound">Custom 404 page!</div>
  <Content></Content>
</template>
