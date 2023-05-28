<template>
  <div>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ addr }}</h2>
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
};
</script>

<style></style>
