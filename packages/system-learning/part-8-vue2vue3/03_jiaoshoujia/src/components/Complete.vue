<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" :checked="isAll" @change="allSelectedHanle" />
    </label>
    <span>
      <span>已完成{{ completedNum }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="clearCompleted">
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  name: "Complete",
  props: {
    list: {
      type: Array,
    },
  },
  computed: {
    // `todo`项总数
    total() {
      return this.list.length;
    },
    // 已完成项数量
    completedNum() {
      return this.list.filter((item) => item.completed).length;
    },
    // 是否全选
    isAll() {
      return this.completedNum === this.total && this.list.length;
    },
  },

  methods: {
    // 全选/取消全选
    allSelectedHanle(e) {
      this.$emit("selectedAll", e.target.checked);
    },
    clearCompleted() {
      this.$emit("clearCompleted");
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
