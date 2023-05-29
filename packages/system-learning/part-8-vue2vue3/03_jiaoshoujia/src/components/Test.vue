<template>
  <div>
    <button @click="flag = !flag">切换</button>
    <transition name="fade" appear>
      <div v-if="flag" class="box"></div
    ></transition>
  </div>
</template>

<script>
/*
name属性定义动画class的类名前缀
appear定义初次渲染
duration设置过渡的时间

<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
methods: {
  ...
}
监听过渡组件生命周期

v-for出来的列表，使用<transition-group>通过tag 属性指定是什么元素标签
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>

*/
export default {
  data() {
    return {
      flag: false,
    };
  },
};
</script>
<style>
.box {
  background: yellow;
  width: 200px;
  height: 200px;
}
.fade-enter {
  background: red;
  width: 0px;
  height: 0px;
}
.fade-enter-active {
  transition: all 3s linear;
}
.fade-enter-to {
  background: yellow;
  width: 200px;
  height: 200px;
}
.fade-leave {
  width: 200px;
  height: 200px;
}
.fade-leave-active {
  transition: all 3s linear;
}

.fade-leave-to {
  width: 0px;
  height: 0px;
}
</style>
