<template>
  <div id="app">
    <!-- 1.props传回调给子组件，子组件调用并传递数据 —— getInfoOfProp -->
    <SchoolProp :getInfoViaProp="getInfo" />

    <!-- 2.$emit 和 v-on 组合，子组件发射事件，父组件绑定事件，事件处理定义在父组件 -->
    <SchoolEmit @getInfoViaEmit="getInfo" />

    <!-- 3.$emit 和 $on 组合，在父组件挂载时，用 ref 监听绑定子组件发射的事件 -->
    <SchoolOn ref="schoolOn" />

    <!-- 4.$off 解绑事件 -->
    <SchoolOn ref="schoolOn" />

    <!-- 5.$once 只触发一次：修饰符或者$once -->
    <!-- <SchoolOnce @testEmitOnce.once="getInfo" /> -->
    <SchoolOnce ref="schoolOnce" />

    <!-- 6.给组件绑定原生事件 -->
    <SchoolNative @click.native="getInfo" />
  </div>
</template>

<script>
import SchoolProp from "./components/School.vue";
import SchoolEmit from "./components/School1.vue";
import SchoolOn from "./components/School2.vue";
import SchoolOnce from "./components/School3.vue";
import SchoolNative from "./components/School4.vue";
export default {
  name: "App",
  components: {
    SchoolProp,
    SchoolEmit,
    SchoolOn,
    SchoolOnce,
    SchoolNative,
  },
  mounted() {
    this.$refs.schoolOn.$on("getInfoViaOn", this.getInfo);
    // 箭头函数写法，正确得到当前组件实例的this
    // this.$refs.schoolOn.$on("getInfoViaOn", (...params) => {
    //   console.log(params);
    // });

    this.$refs.schoolOnce.$once("testEmitOnce", this.getInfo);
  },
  destroyed() {
    this.$refs.schoolOn.$off("getInfoViaOn");
  },
  methods: {
    getInfo(...params) {
      console.log(params);
    },
  },
};
</script>

<style>
#app {
  padding: 10px;
  height: 100vh;
  background-color: #2c9678;
}
</style>
