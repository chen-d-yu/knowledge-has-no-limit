<template>
  <div id="app" class="app">
    <School />
    <hr />
    <Student />
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";
export default {
  name: "App",
  components: {
    School,
    Student,
  },
};
</script>
<style scoped>
/* 
样式穿透：
  School为普通css，使用 >>> 穿透
  Student为less，使用 /deep/ 或者 ::v-deep 穿透
*/

/*
 原生css
*/
.app >>> .addr {
  background-color: palevioletred;
}
</style>
<style lang="less" scoped>
// /deep/
/deep/ .name {
  background-color: #fff;
}
.app /deep/ .name {
  background-color: #ed3333;
}

// ::v-deep
/deep/ .sno {
  background-color: #fff;
}
.app /deep/ .sno {
  background-color: #862617;
}
</style>
