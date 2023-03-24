<template>
  Home
  <!-- <Loading :show="show" /> -->
  <Content></Content>
</template>
<script setup lang="ts">
import Loading from "./Loading.vue";
import { reactive, ref, onMounted } from "vue";
let show = ref(false);

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 1000);
});
</script>
