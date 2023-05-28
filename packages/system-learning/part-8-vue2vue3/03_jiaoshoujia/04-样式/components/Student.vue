<template>
  <div class="demo">
    <h2 class="name">学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <h2 class="sno">学生学号：{{ sno }}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "张三",
      age: 18,
      sno: 10001,
    };
  },
};
</script>

<style scoped lang="less">
.demo {
  background-color: orange;
  .name {
    color: #2c9678;
  }
  .sno {
    color: #ef632b;
  }
}
</style>
