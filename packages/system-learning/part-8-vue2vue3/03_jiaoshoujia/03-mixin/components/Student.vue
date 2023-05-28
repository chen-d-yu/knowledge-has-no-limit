<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>

    <button @click="showName">点我展示姓名</button>
  </div>
</template>

<script>
import mixin from "../mixin/mixin";
export default {
  name: "Student",
  data() {
    return {
      name: "张三",
      age: 18,
    };
  },
  mixins: [mixin],
};
</script>

<style></style>
