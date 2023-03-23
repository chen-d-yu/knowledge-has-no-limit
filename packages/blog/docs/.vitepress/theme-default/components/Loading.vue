<template>
  <transition name="fade">
    <div class="fixed top-0 left-0 w-full h-full bg-white" v-if="show">
      <div class="">
        <p>左右的个人博客</p>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps({
  show: Boolean,
});

const { show } = toRefs(props);
</script>
