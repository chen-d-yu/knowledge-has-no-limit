<template>
  <div>
    <button @click="flag = !flag">切换</button>
    <transition name="fade"> <div v-if="flag" class="box"></div></transition>
  </div>
</template>

<script>
/*
  1.props
  name：属性定义动画class的类名前缀
  appear：是否初次渲染
  duration：设置过渡的时间

  2.动画class
  在进入（也就是控制显隐的变量为true）时，有三个经过的样式
  .v-enter：在进入动画的下一帧移除
  .v-enter-active：在进入动画后挂载到元素上，在进入动画完成后移除
  .v-enter-to：在进入动画后挂载到元素上，在进入动画完成后移除

  在离开（也就是控制显隐的变量为false）时，同样也会经过三个样式
  .v-leave：在离开动画的下一帧移除
  .v-leave-active：在离开动画后挂载到元素上，在离开动画完成后移除
  .v-leave-to：在离开动画后挂载到元素上，在离开动画完成后移除

  3.生命周期
  监听过渡组件生命周期
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

  4.transition-group
  v-for出来的列表，使用<transition-group>
  通过tag 属性指定是什么元素标签
  <transition-group>必须为每一个元素设置上key
  多个元素，比如v-for出来的列表，需要用group包裹，单独的元素可以用<transition>
  <div id="list-demo" class="demo">
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name="list" tag="p">
      <span v-for="item in items" v-bind:key="item" class="list-item">
        {{ item }}
      </span>
    </transition-group>
  </div>

  5.可以配合一些动画库，完成过渡，比如 animate.css

  6.技巧：进入的起点恰巧是离开的终点，进入的终点恰巧是离开的起点，它们可以成对

*/
export default {
  data() {
    return {
      flag: true
    }
  }
}
</script>
<style>
.box {
  background: yellow;
  width: 200px;
  height: 200px;
}
.fade-enter {
  background: red;
  width: 0;
  height: 0;
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
  width: 0;
  height: 0;
}
</style>
