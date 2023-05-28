<template>
  <div class="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ addr }}</h2>
    <button @click="sendInfo">点击发送学校信息 —— 事件总线</button>
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
    sendInfo() {
      // 2.利用事件总线发射事件，并传递参数 -> App.vue 监听发送过来的事件
      this.$bus.$emit("sendInfo", this.name, this.addr);
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
