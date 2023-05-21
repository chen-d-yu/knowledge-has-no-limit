// 1.createApp返回一个vue实例，通过实例指定挂载到哪个元素
const app = Vue.createApp({
  template: `
    <div>
      hello vue3
    </div>
  `,
});

app.mount("#app");

// 2.也可以链式调用，组合到一起写
Vue.createApp({
  template: `
    <div>
      hello vue3
    </div>
  `,
}).mount("#app1");

// 3.template如果有内容，会替换掉容器中的所有内容，如果没有template，vue会去解析容器内容
Vue.createApp({}).mount("#app2");
