<template>
  <ul class="todo-main">
    <TodoItem
      v-for="item in list"
      :key="item.id"
      :todo="item"
      @checkTodo="checkTodo"
      @removeTodo="removeTodo"
    />
  </ul>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    checkTodo(id) {
      this.$emit("checkTodo", id);
    },
    removeTodo(id) {
      this.$emit("removeTodo", id);
    },
  },
};
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
