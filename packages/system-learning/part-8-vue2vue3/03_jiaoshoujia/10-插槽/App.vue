<template>
  <div class="container">
    <!--默认插槽-->
    <List title="美食">
      <p>默认插槽</p>
      <ul>
        <li v-for="item in foods" :key="item">{{ item }}</li>
      </ul>
    </List>

    <!-- 具名插槽 -->
    <List title="电影">
      <p>具名插槽</p>
      <template #content>
        <ul>
          <li v-for="item in foods" :key="item">{{ item }}</li>
        </ul>
      </template>
    </List>

    <!--作用域插槽-->
    <List title="电影">
      <p>作用域插槽具名、默认</p>
      <template #movie="props">
        <!--具名插槽还能用另外的用法：<template v-slot:movie="props"> -->
        <!--如果是默认插槽作用域方式就是这样用：<template v-slot:default="props"> or <template #default="props">-->
        <ul>
          <li v-for="item in props.movies" :key="item">{{ item }}</li>
        </ul>
      </template>
    </List>
  </div>
</template>

<script>
import List from '@/components/List.vue'

/*
 * 1.分类
 * 插槽分为以下几类：
 * - 默认插槽
 * - 具名插槽
 * - 作用域插槽
 * - 动态插槽
 *
 * 2.插槽的本质
 * 而插槽实际上是一个对象，大概长成下面这样子
 * {
 *   default: function(){} => VNode
 *   slotName: function(){} => VNode
 *   scopedSlots: function({xxx}){} => VNode
 * }
 * 插槽的内容就是调用插槽函数获取返回的虚拟dom
 * vue把整个slot对象传递进子组件中，在解析子组件生成虚拟dom时，将插槽函数调用获取返回结果，它是一个虚拟dom
 * 把虚拟dom当做子组件的子节点插入
 *
 * 比如子组件List的虚拟dom生成过程是这样的（写点伪代码）
 * const Com = Vue.component('Com', {
 *   render(h) {
 *     return h('div', [
 *        this.$slots.default, // 默认插槽
 *        this.$slots.slot1, // 具名插槽
 *        h('div', this.$scopedSlots.slot2({ msg: '作用域插槽' })) // 作用域插槽
 *        ])
 *   }
 * })
 *
 * */

export default {
  name: 'App',
  components: { List },
  data() {
    return {
      foods: ['烤鸭', '小龙虾', '火锅', '汉堡包', '寿司', '披萨', '麻辣烫', '串串香', '烧烤', '拉面']
    }
  }
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
}
</style>
