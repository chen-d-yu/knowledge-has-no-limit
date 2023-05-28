<template>
  <div class="demo">
    <h2>$once</h2>
    <h2>学校名称：{{ name }}</h2>
    <h2 class="addr">学校地址：{{ addr }}</h2>
    <button @click="testEmitOff">发送学校信息给父组件 —— $once</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "中心小学",
      addr: "广州·番禺",
    };
  },
  methods: {
    testEmitOff() {
      this.$emit("testEmitOnce", this.name, this.addr);
    },
  },
};
</script>

<style scoped>
.demo {
  background-color: burlywood;
}
.addr {
  color: #cc163a;
}
</style>
