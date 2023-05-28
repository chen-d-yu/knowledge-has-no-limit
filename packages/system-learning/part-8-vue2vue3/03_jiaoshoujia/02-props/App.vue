<template>
  <div id="app">
    <School
      :name="name"
      :copyName="copyName"
      addr="广州·番禺"
      @changeNameEmit="changeNameMapHandle"
    />
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
  data() {
    return {
      name: "中心小学",
      copyName: "中心小学",
    };
  },
  methods: {
    changeNameMapHandle() {
      console.log(123);
      this.copyName = "自定义事件大学";
    },
  },
};
</script>
