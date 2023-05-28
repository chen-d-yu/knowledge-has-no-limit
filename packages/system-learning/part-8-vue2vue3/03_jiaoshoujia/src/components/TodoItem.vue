<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="tick(todo.id)"
      />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" @click="remove(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
    },
  },
  methods: {
    tick(id) {
      this.$bus.$emit("checkTodo", id);
    },
    remove(id) {
      // 删除当前选中的todo项
      if (confirm("确认删除该todo项吗？")) {
        this.$bus.$emit("removeTodo", id);
      }
    },
  },
};
</script>

<style>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none !important;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background: #ddd;
}
li:hover button {
  display: block !important;
}
</style>
