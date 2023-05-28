<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <Header @receive="receive" />
        <TodoList
          :list="list"
          @checkTodo="checkTodo"
          @removeTodo="removeTodo"
          v-if="list.length"
        />
        <div v-else>内容为空</div>
        <Complete
          :list="list"
          @clearCompleted="clearCompleted"
          @selectedAll="selectedAll"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import TodoList from "./components/TodoList.vue";
import Complete from "./components/Complete.vue";
export default {
  name: "App",
  components: {
    Header,
    TodoList,
    Complete,
  },
  data() {
    return {
      list: [
        {
          id: "10001",
          title: "吃饭",
          completed: true,
        },
        {
          id: "10002",
          title: "睡觉",
          completed: true,
        },
        {
          id: "10003",
          title: "打豆豆",
          completed: true,
        },
      ],
    };
  },
  methods: {
    // 新增todo项
    receive(todo) {
      this.list.unshift(todo);
    },
    // [取消]勾选todo项
    checkTodo(id) {
      console.log(id);
      this.list.forEach((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
      });
    },
    // 删除todo项
    removeTodo(id) {
      this.list = this.list.filter((item) => item.id !== id);
    },
    // 清除已完成项
    clearCompleted() {
      if (!this.list.length) {
        return;
      }
      this.list = this.list.filter((item) => !item.completed);
    },
    // 全选/取消全选
    selectedAll(isAll) {
      this.list.forEach((l) => {
        l.completed = isAll;
      });
    },
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
