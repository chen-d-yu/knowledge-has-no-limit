<template>
  <div id="app">
    <School ref="school" />
    <hr />
    <Student ref="student" />
    <hr />
    <h2 ref="hello">hello world</h2>
    <button @click="getRef">获取组件实例</button>
  </div>
</template>

<script>
import School from "./components/School.vue";
import Student from "./components/Student.vue";
export default {
  name: "App",
  components: {
    School,
    Student,
  },
  methods: {
    getRef() {
      console.log(this.$refs.hello);
      console.log(this.$refs.school);
      console.log(this.$refs.student);
    },
  },
};
</script>
