<template>
  <div class="demo">
    <h2>props</h2>
    <h2>学校名称：{{ name }}</h2>
    <h2 class="addr">学校地址：{{ addr }}</h2>
    <button @click="sendViaProp">发送学校信息给父组件 —— props</button>
  </div>
</template>

<script>
export default {
  name: "School",
  props: ["getInfoViaProp"],
  data() {
    return {
      name: "中心小学",
      addr: "广州·番禺",
    };
  },
  methods: {
    sendViaProp() {
      this.getInfoViaProp(this.name, this.addr);
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
