<template>
  <div class="container">
    <Count />
  </div>
</template>

<script>
import Count from '@/components/Count.vue'
export default {
  name: 'App',
  components: { Count }
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
}
</style>
