<template>
  <div class="list">
    <h3>{{ title }}</h3>
    <!--默认插槽-->
    <slot></slot>

    <!-- 具名插槽 -->
    <slot name="content"></slot>

    <!-- 作用域插槽 -->
    <slot name="movie" :movies="movies"></slot>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['title'],
  data() {
    return {
      movies: [
        '肖申克的救赎',
        '阿甘正传',
        '星际穿越',
        '泰坦尼克号',
        '盗梦空间',
        '复仇者联盟',
        '少年派的奇幻漂流',
        '这个杀手不太冷',
        '霸王别姬',
        '海上钢琴师'
      ]
    }
  }
}
</script>

<style scoped>
.list {
  background-color: skyblue;
  width: 200px;
  height: 300px;
  margin-right: 10px;
}
</style>
