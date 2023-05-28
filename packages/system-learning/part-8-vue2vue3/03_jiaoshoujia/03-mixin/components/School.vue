<template>
  <div>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ addr }}</h2>
    <button @click="showName">点我展示姓名</button>
  </div>
</template>

<script>
import mixin from "../mixin/mixin";
import mixin2 from "../mixin/mixin2";
export default {
  name: "School",
  data() {
    return {
      name: "中心小学",
      addr: "广州·番禺",
    };
  },
  mixins: [mixin, mixin2],
};
</script>

<style></style>
