<script lang="ts" setup>
import NavBarToggleButton from "./NavBarToggleButton.vue";
</script>

<template>
  <div class="nav-bar fixed top-0 right-0 left-0 flex z-10">
    <NavBarToggleButton />nav bar
  </div>
</template>

<style>
.nav-bar {
  height: 58px;
  border: 1px solid red;
  background: hsla(0, 0%, 100%, 0);
  backdrop-filter: blur(2px);
}
</style>
