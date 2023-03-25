<script lang="ts" setup>
import { toRefs, defineProps, withDefaults } from "vue";

const props = withDefaults(
  defineProps<{ show: boolean; colors?: string[] }>(),
  {
    show: true,
    colors: () => ["#d9bbf9", "#cca7a2", "#a28ca6", "#7871aa"],
  }
);
const { show, colors } = toRefs(props);
</script>

<template>
  <transition name="fade">
    <div
      class="fixed top-0 left-0 w-full h-full bg-white items-center justify-center flex z-10"
      v-if="show"
    >
      <div class="loading-wrap w-16 flex flex-wrap">
        <span class="loading-item"></span>
        <span class="loading-item"></span>
        <span class="loading-item"></span>
        <span class="loading-item"></span>
      </div>
    </div>
  </transition>
</template>

<style>
.loading-wrap {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.loading-item {
  animation: scale 1.5s linear infinite;
  @apply block w-6 h-6 m-0.5;
}

.loading-wrap :nth-child(1) {
  border-radius: 50% 50% 0 50%;
  transform-origin: bottom right;
  animation-delay: 0.5s;
  background-color: v-bind(colors[0]);
}
.loading-wrap :nth-child(2) {
  border-radius: 50% 50% 50% 0;
  transform-origin: bottom left;
  animation-delay: 1s;
  background-color: v-bind(colors[1]);
}
.loading-wrap :nth-child(3) {
  border-radius: 50% 0 50% 50%;
  transform-origin: top right;
  animation-delay: 1.5s;
  background-color: v-bind(colors[2]);
}
.loading-wrap :nth-child(4) {
  border-radius: 0 50% 50% 50%;
  transform-origin: top left;
  animation-delay: 2s;
  background-color: v-bind(colors[3]);
}

@keyframes scale {
  50% {
    transform: scale(1.2);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
