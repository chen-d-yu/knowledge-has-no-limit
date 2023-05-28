<template>
  <div id="app">
    <School />
  </div>
</template>

<script>
import School from "./components/School.vue";
export default {
  name: "App",
  components: {
    School,
  },
  mounted() {
    // 3.监听发射过来的sendInfo事件
    this.$bus.$on("sendInfo", this.getInfo);
  },
  beforeDestroy() {
    // 4.最好在组件卸载之际，取消订阅
    this.$bus.$off("sendInfo");
  },
  methods: {
    getInfo(...params) {
      console.log(params);
    },
  },
};
</script>

<style>
#app {
  padding: 10px;
  height: 100vh;
  background-color: #2c9678;
}
</style>
