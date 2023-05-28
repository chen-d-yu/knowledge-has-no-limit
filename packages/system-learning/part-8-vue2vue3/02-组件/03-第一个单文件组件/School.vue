<template>
  <div>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ addr }}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "星海中学",
      addr: "广州市番禺区市桥街道",
    };
  },
};
</script>
