<template>
  <div>
    <h2>学校名称（原版）：{{ name }}</h2>
    <h2>学校名称（映射）：{{ localName }}</h2>
    <h2>学校名称（自定义事件）：{{ copyName }}</h2>
    <h2>学校地址：{{ addr }}</h2>

    <button @click="changeNameMapHandle">点我修改校名(映射版)</button>
    <button @click="changeNameEmitHandle">点我修改校名($emit版)</button>
  </div>
</template>

<script>
/*
1.props：
  如果不传递props，默认值就是undefined
  父子组件通信，单向数据流，在子组件中修改了props，会报错
  props的数据，优先级要高于 data、computed、watch

2.定义方式：
  - 字符串数组：一组props字符串键名数组
  - 对象：定义props的键名，加上类型约束（JavaScript的内置类型数）
  - 对象数组：定义props的键名，完整的写法配置：类型约束、是否必传、默认值'

3.修改数据的方式：
  子组件不允许修改props，如果想要修改，可以这么做
  1. 自定义事件：通过$emit向父组件传递一个自定义事件，通知并让父组件去修改，把修改的处理方法，放在父组件中处理
  2. 映射：在接收props数据时，在子组件本身用 data、watch、computed 去接收，《让这个props数据变成本地人》，修改处理也就能在本地实现了

4.使用方式
  在父组件中，属性传递使用 v-bind，自定义事件使用 v-on


*/
export default {
  name: "School",
  data() {
    return {
      localName: this.name,
    };
  },
  // 1.只接受
  props: ["name", "copyName", "addr"],

  // 2.类型约束
  // props: {
  //   name: String,
  //   addr: String,
  // },

  // 3.完整写法：类型约束、必传约束、指定默认值
  // props: {
  //   name: {
  //     type: String,
  //     default: "中心小学",
  //   },
  //   addr: {
  //     type: String,
  //     required: true,
  //   },
  // },
  methods: {
    // 1.自定义事件
    changeNameEmitHandle() {
      // $emit接收两个参数，第一个是事件名，第二个是参数，类型为 ...args: any[]
      this.$emit("changeNameEmit", "发射大学");
    },

    // 2.映射
    changeNameMapHandle() {
      this.localName = "映射大学";
    },
  },
};
</script>

<style></style>
