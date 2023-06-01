# Vue 脚手架笔记

## 目录结构

```plain
vue.config.js - webpack 的配置文件
babel.config.js - babel 的配置文件
jsconfig.json - 相当于 tsconfig 的 js 版本
src - vue 工程的主要目录，编写的页面、组件等等都是在 src 下统一管理
    - main.js - 整个项目的入口文件
    - assets - 静态资源文件夹
    - components - 项目公共组件
    - views - 页面
    - App.vue - 项目的根组件

```

## options 编写顺序

```
name
components
props
mixin
data
computed
watch
生命周期函数
methods
```

## render 函数

在 cli 脚手架开发时，使用的是 Vue 的仅运行时版本，会阉割掉模板编译器，就导致 template 配置项不可用

因为 Vue 要减少开发时的包体积，Vue 包括了两块，Vue 核心+模板编译器，然而模板编译器可能占到 1/3，

在开发时，模板编译器会参与到我们的开发运行中，但是在构建阶段，经由 webpack 打包构建完之后，webpack 已经做了模板编译器的事了，

已经把 Vue 文件编译成为静态资源，这时用缺少编译器的 Vue 版本，可以减少生产打包的体积，

所以编译器只会在开发阶段有作用，在构建阶段为了打包产物的体积优化，

Vue 使用的 render 函数代替模板编译器的作用，组件/页面的 template 通过一个 vue-template-compiler 的库去转为虚拟 dom，并转成真实 dom 渲染

**参数**

render 函数有一个 createElement，调用它会返回一个虚拟 dom，也就是 VNode

createElelemt 也有三个函数，第一个是渲染的标签名称，第二个是配置，第三个是虚拟子节点（同样是 VNode）

在 render 函数中需要返回一个内容，返回 VNode 就会渲染在页面上

而 vue 文件就是一个 VNode，可以直接传入到 createElement 中

## 默认配置

Vue 脚手架隐藏了 webpack 的配置，需要命令才能显式

```bash
# 单纯输出配置让你看一下
vue inspect > output.js
```

Vue cli 提供了 vue.config.js 可选的配置文件个性化定制项目配置，配置在这个文件中，会在构建时，和 Vue 底层 webpack 的脚手架默认配置，进行一个整合

详情看：[Vue CLI](https://cli.vuejs.org/zh/)

## ref

ref 用于获取一个 dom 节点或者子组件实例，避免原生 dom 操作

1. 用在 dom 节点，获取的就是真实 dom
2. 用在组件实例，获取的是 VueComponent 实例，能使用该实例下所有的属性和方法

## 组件通信

> 案例代码等学习完状态管理之后再补充

组件通信的主要手段之一，用于父子组件之间的数据传递，针对不同的场景，还有其他不同的通信手段：

1. 单向数据流：`props` + `$emit/v-on`

   父组件通过 props 向子组件传递数据，子组件向父组件通过$emit 传递一个事件，在父组件中更改数据，因为是响应式的数据，父组件更改了 props 的变化，子组件也会跟着一起变化。如果在子组件中修改 props，会报错，同时也违背了父子组件单向数据流的原则。

   `props`向下传递数据，`$emit`通知上层组件修改数据

2. `$parent`、`$children`

   `$parent`、`$children`可直接在父子组件中调用各自的方法以及修改数据

3. `$attrs`、`$listeners`

   `$attrs`可以拿到父组件传过来的属性，用于属性跨级传递

   `$listeners`可以拿到父组件传过来的方法，用于方法跨级传递

   爷孙组件之间的通信，还需要父组件在中间做一层中转，比如：

   ```vue
    <!--爷组件-->
    <div>
        <div>我是祖父: 数字为：{{nums}}</div>
        <father :nums="nums" @up="up" @down="down"></father>
    </div>

    <!--父组件-->
    <son v-bind="$attrs" v-on="$listeners"></son>

    <!--子组件-->
    <div>我是儿子：<input type="button" value="儿子" @click="$listeners.up"/></div>
   ```

4. `provide`、`inject`

   这个方法需要成对使用，使用`provide`向子孙后代注入一个依赖对象，这个对象可以是 JavaScript 中的任意类型

   `inject`则是在子孙组件中，通过注入的 key，拿到注入的依赖

   但是这种方式的绑定可不是响应式的，也就是说，如果你在开始注入了个普通对象，Vue 不会帮我们对注入的变量进行响应式处理，如果一开始注入时的变量是响应式的，那在 vue 组件中注入的依赖对象就是响应式的

   - `inject`遵从就近原则，从最近的组件拿到注入的依赖
   - 这一对方法的数据流是双向的，`provide`注入了响应式数据，在子组件通过`inject`拿到后，可以修改响应式数据，不会报错，并且父组件也会发生改变

5. 事件总线 $bus

   在 vue2 中还是能这么使用的，但是在 vue3 版本，取消了事件总线的概念

6. `vuex`、`pina`

   状态管理，这两者的数据都是单向数据流，从 store 中获取数据，再通过 commit 触发修改

**优缺点分析**

- 父子间通信最常用的就是 `props/$emit` 和 `v-model`

- 如果是嵌套组件通信，开发组件库可以使用 `provide/inject`，中小型项目可以使用 `EventBus`

- 大型项目中使用`vuex`来进行兄弟之间和跨级之间通信

- 少用`$parent`和`$children`，它们的主要目的是作为访问组件的应急方法

- `$attrs`  和  `$listeners`更多是用来只传递数据不做中间件处理的时候，通过父组件进行中转数据传递给子组件

## mixin

混入，也就是把公共的配置项提取到外部文件，然后通过`mixin`配置，Vue 会将提取出去的配置项与当前组件实例的配置项进行一个合并

`mixin`说白了也就是复用配置，只要组件中能配置的，`mixin`也能配置，然后会组合在一起

多个组件的`mixin`变量不会相互污染影响，每个引用都是独立的

**优先级：**

- 对于`data`定义属性，组件中定义属性覆盖`mixins`中同名字段
- 对于`methods`中的同名方法，组件内的方法覆盖`mixins`中的方法
- 对于相同的`computed`属性，组件的`computed`属性覆盖`mixins`内的`computed`属性
- 对于`created、mounted`等生命周期函数，`mixins`中生命周期函数优先执行（执行顺序按`mixins`中顺序），再执行组件中生命周期函数
  `watch`监听，`mixins`中的`watch`监听先执行。
- 多个`mixin`存在时，后面的会把前面的给替换掉

`School.vue`

```vue
<template>
  <div>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ addr }}</h2>
    <button @click="showName">点我展示姓名</button>
  </div>
</template>

<script>
import mixin from '../mixin/mixin'
export default {
  name: 'School',
  data() {
    return {
      name: '中心小学',
      addr: '广州·番禺'
    }
  },
  mixins: [mixin]
}
</script>

<style></style>
```

`Student.vue`

```vue
<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <button @click="showName">点我展示姓名</button>
  </div>
</template>

<script>
import mixin from '../mixin/mixin'
export default {
  name: 'Student',
  data() {
    return {
      name: '张三',
      age: 18
    }
  },
  mixins: [mixin]
}
</script>

<style></style>
```

`mixin.js`

```js
export default {
  methods: {
    showName() {
      console.log(this.name)
    }
  }
}
```

**还有一种全局的 mxin：**

```js
import mixin from './mixins'
Vue.mixin(mixin)
```

## 插件

插件如果传递了一个对象，那么这个对象中必须要包含`install`方法，那么`Vue`会在实例化时，调用这个对象的`install`方法，

如果传递了一个函数，那么这个函数就作为`install`去调用

`install`函数的第一个参数为`Vue`实例，在使用插件时，还能从`Vue`中传递参数过来

`Vue实例`通过`Vue.use(plugins)`去应用插件

插件通常会注册一些全局组件、指令、过滤器、或者挂载一些实例方法

一个插件只能被安装一次，重复安装同一个插件会被忽略掉

比如常见的`饿了么ui`，就是使用`Vue.use`去安装的

## 样式

### scoped

如果直接在 style 标签中定义样式，那么多数没有进行样式隔离，多个组件的样式，最后会汇总到一起，就会出现样式冲突

在 style 标签上可以添加一个属性`scoped`，就能进行样式隔离，在其中编写的所有样式，只会作用于当前组件

实际上就是在使用样式的组件上添加了一个 hash 值的属性，再配合标签属性选择器，就完成了对样式的隔离

![image-20230528092933511](D:\code\chendiyu\knowledge-has-no-limit\packages\system-learning\part-8-vue2vue3\03_jiaoshoujia\README.assets\image-20230528092933511.png)

通常，在`App.vue`中的样式，一般是全局的样式，所以`App.vue`不需要加样式隔离

### lang

在标签上设置这个属性，可以支持`scss、sass、less`，

要注意，如果当前项目的`webpack`使用的 4 的版本，那么在安装 less-loader 时，也需要指定版本安装

其中`less-loader8、9`对应`webpack5`，`less-loader7`以下对应`webpack4`

如果是最新版的 webpack5，直接安装没问题

```bash
npm i less-loader -D
```

### 样式穿透

要想样式穿透，在使用穿透的地方也要定义上`scoped`属性才能进行穿透

原生 css

```css
/*
.父类 >>> .子类{ 样式}
*/

.abc >>> .d {
  /* 样式 */
}
```

less、sass

```less
/*
/deep/ .类名{样式}
父类 /deep/ 子类
*/

/deep/ .children {
  background: red;
}
.parent /deep/ .children {
  background: red;
}
```

less、sass

```less
/*
::v-deep .类名{样式}
父类 ::v-deep 子类
*/

::v-deep .children {
  background: red;
}
.parent ::v-deep .children {
  background: red;
}
```

## TodoList 案例

目前阶段还没学习兄弟组件通信和父子组件方法传递，所以当前先用父组件传递回调函数到子组件的方式，获取数据从而改变视图（在 react 就用的这种方式）

也就是状态提升，如果当前的组件不满足多个操作时，可以适当把数据的状态提升到它们共同的父组件上操作

## 组件自定义事件

所谓自定义事件，就是让父子组件进行通信方法

适用于子组件向父组件传递数据，子组件触发事件，并通知父组件，父组件可以在自定义事件触发时，借用回调传参，获取数据

1. props 传递函数，通过回调的方式获取数据，事件回调定义在父组件中，比如`getInfo`

   ```vue
   // 父组件
   <Child :getChildInfo="getInfo" />

   <script>
   export default {
     data() {
       return {
         info: null
       }
     },
     methods: {
       getInfo(info) {
         this.info = info
       }
     }
   }
   </script>

   // 子组件
   <!-- <button @click="()=> getChildInfo(info)">回调并传递info数据</button> -->
   <button @click="callbackAndSendInfo">回调并传递info数据</button>

   <script>
   export default {
     data() {
       return {
         info: {
           name: '张三',
           age: 18
         }
       }
     },
     methods: {
       callbackAndSendInfo() {
         this.getChildInfo(this.info)
       }
     }
   }
   </script>
   ```

2. 子组件`$emit`发射事件，父组件`v-on`接收事件

   $emit 传入一个自定义事件名称，接收方使用 @sendName="event" 接收这个事件，多余的参数按顺序传递，类型为：...args: any[]

   ```vue
   // 父组件
   <!-- <Child v-on:getChildInfo="getInfo"/> -->
   <Child @getChildInfo="getInfo" />

   <script>
   export default {
     data() {
       return {
         info: null
       }
     },
     methods: {
       getInfo(info) {
         this.info = info
       }
     }
   }
   </script>

   // 子组件
   <button @click="sendInfo">回调并传递info数据</button>

   <script>
   export default {
     data() {
       return {
         info: {
           name: '张三',
           age: 18
         }
       }
     },
     methods: {
       sendInfo() {
         this.$emit('getChildInfo', this.info)
       }
     }
   }
   </script>
   ```

3. 子组件`$emit`发射事件，父组件通过`ref`的`$on`绑定监听事件

   `this.$refs.xxx.$on(emitEventName, eventHandle)`接收子组件发射的事件，并将方法与发射的事件绑定监听在一起

   ```vue
   // 父组件
   <Child ref="child" />

   <script>
   export default {
     data() {
       return {
         info: null
       }
     },
     mounted() {
       this.$refs.child.$on('getChildInfo', this.getInfo)
       // this.$refs.xxx.$on的this指向了发射者，也就是Child组件实例，所以在这种方法的监听绑定事件，可以传递箭头函数
       // this.$refs.child.$on("getChildInfo", ()=>{
       //   this.info = info
       // })
     },
     methods: {
       getInfo(info) {
         this.info = info
       }
     }
   }
   </script>

   // 子组件
   <button @click="sendInfo">回调并传递info数据</button>

   <script>
   export default {
     data() {
       return {
         info: {
           name: '张三',
           age: 18
         }
       }
     },
     methods: {
       sendInfo() {
         this.$emit('getChildInfo', this.info)
       }
     }
   }
   </script>
   ```

4. 解绑事件

   ```vue
   // 父组件
   <Child ref="child" />

   <script>
   export default {
     // ...
     destroyed() {
       // 解绑事件
       this.$refs.child.$off('getChildInfo')
     }
   }
   </script>
   ```

5. 只触发一次的自定义事件，使用 once 修饰或者$once

   ```vue
   // 父组件
   <!-- 1.v-on使用once修饰符 -->
   <Child @getChildInfo.once="getInfo" />

   <script>
   export default {
     data() {
       return {
         info: null
       }
     },
     mounted() {
       // 2.ref使用$once绑定一次
       this.$refs.child.$once('getChildInfo', this.getInfo)
     },
     methods: {
       getInfo(info) {
         this.info = info
       }
     }
   }
   </script>

   // 子组件 // ...
   ```

6. 在组件身上绑定原生事件

   在组件身上绑定的事件，全都会被 Vue 当做自定义事件，如果想要当做原生事件解析，需要在自定义事件上加一个修饰符`native`

   ```vue
   <Child @click.native="getInfo" />
   ```

## 事件总线

可以跨组件通信，比如叔侄组件、爷孙组件、兄弟组件，任意组件间无障碍通信

事件总线是一套规则，只要满足这套规则，是可以实现组件间的通信

想要使用事件总线，需要满足两个条件：

1. 满足所有组件都能访问，要想满足这个条件，其实很简单，就是往`Vue实例`的原型对象上设置属性，因为`Vue实例的原型对象`，是`Vue实例`和`VueComponent`实例都能访问到的

2. 满足可以调用`$on、$off、$emit`，这些方法都在 Vue 的原型对象上，要满足这个条件，只能是`VueComponent`或`Vue`的实例，但是`VueComponent`是无法正常`new`出来的，所以只有`Vue`实例这条路能走，在`beforeCreate`中，`this`是当前实例，并且是`Vue`实例化的最开端

   ```js
   import Vue from 'vue'
   import App from './App.vue'

   // 关闭vue的生产提示
   Vue.config.productionTip = false

   new Vue({
     render: h => h(App),
     beforeCreate() {
       Vue.prototype.$bus = this
     }
   }).$mount('#app')
   ```

在使用事件总线时，随手在组件销毁阶段解绑总线事件，这是个好习惯，减少总线对象体积大小

## $nextTick

Vue 的响应式不是在数据发生后，页面立马跟着改变，而是按照一定策略去进行`dom`更新，这个策略跟`react`的`hooks`批次收集更新类似，会把当前批次的更新操作收集起来，然后集中更新渲染，因为频繁的更新`dom`是特别耗费性能的，所以搞了一个批处理更新

而`$nextTick`就是为了插队，将它的回调等到当前批次的处理更新完成之后，插队执行`$nextTick`的回调函数，此时在`$nextTick`中获取的就是最新的`dom`

一般的使用场景，就是在改变数据之后，想立马操作相关的 dom，比如 echarts 中，更新了数据，想要立马获取图表的宽高，这时是获取不到的，要用`$nextTick`才能获取最新的

这个 api 优于 setTimeout 的执行

什么时候用？

当数据改变时，想要操作【你认为的更新后的 dom，实则还没更新的 dom】，所以要在`$nextTick`的回调中执行

## 过渡组件

Vue 提供了一个过渡的封装组件，可以在下列的情形中，给任何元素、组件添加过渡的效果：

- 条件渲染 v-if / v-show
- 动态组件
- 组件根节点

需要你对 transtion 组件的 name 自定义，然后写入相对应的 css，如果不传 name 属性，那么会使用默认的 css 前缀`.v-enter-form`的这个`v`

如果传递了 name，就变成`.name-enter-form`

在进入/离开的过渡中，会经历 6 个阶段，6 个 class 的切换

1. v-enter：【进入】过渡开始阶段，在元素被插入前生效，插入后的下一帧移除
2. v-enter-active：【进入】过渡生效时的状态，整个元素进入过段的阶段，在过渡完成之后移除，这个类可以用来定义进入过渡的时间、贝塞尔曲线、延迟
3. v-enter-to：【进入】过渡结束的状态，一般将这个状态的样式设置跟初始样式一致
4. v-leave：【离开】过渡生效开始阶段，在离开过渡被触发时立即生效
5. v-leave-active：【离开】过渡生效开始被移除后，到过渡完成前一帧的状态，同样也能在这个类中定义过渡的事件、贝塞尔曲线、延迟等
6. v-leave-to：【离开】过渡结束时生效，在完成【离开】过渡的下一帧被移除

还可以监听这些类的生命周期函数

```vue
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
></transition>

<script>
export default {
  methods: {
    // --------
    // 进入中
    // --------

    beforeEnter: function (el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
      // ...
      done()
    },
    afterEnter: function (el) {
      // ...
    },
    enterCancelled: function (el) {
      // ...
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function (el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function (el, done) {
      // ...
      done()
    },
    afterLeave: function (el) {
      // ...
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function (el) {
      // ...
    }
  }
}
</script>
```

v-for 出来的列表，使用<transition-group>通过 tag 属性指定是什么元素标签

```vue
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```

[进入/离开 & 列表过渡 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/guide/transitions.html)

## $nextTick

Vue 的响应式不是在数据发生后，页面立马跟着改变，而是按照一定策略去进行`dom`更新，这个策略跟`react`的`hooks`批次收集更新类似，会把当前批次的更新操作收集起来，然后集中更新渲染，因为频繁的更新`dom`是特别耗费性能的，所以搞了一个批处理更新

而`$nextTick`就是为了插队，将它的回调等到当前批次的处理更新完成之后，插队执行`$nextTick`的回调函数，此时在`$nextTick`中获取的就是最新的`dom`

一般的使用场景，就是在改变数据之后，想立马操作相关的 dom，比如 echarts 中，更新了数据，想要立马获取图表的宽高，这时是获取不到的，要用`$nextTick`才能获取最新的

这个 api 优于 setTimeout 的执行

什么时候用？

当数据改变时，想要操作【你认为的更新后的 dom，实则还没更新的 dom】，所以要在`$nextTick`的回调中执行

## 过渡组件

Vue 提供了一个过渡的封装组件，可以在下列的情形中，给任何元素、组件添加过渡的效果：

- 条件渲染 v-if / v-show
- 动态组件
- 组件根节点

需要你对 transtion 组件的 name 自定义，然后写入相对应的 css，如果不传 name 属性，那么会使用默认的 css 前缀`.v-enter-form`的这个`v`

如果传递了 name，就变成`.name-enter-form`

在进入/离开的过渡中，会经历 6 个阶段，6 个 class 的切换

1. v-enter：【进入】过渡开始阶段，在元素被插入前生效，插入后的下一帧移除
2. v-enter-active：【进入】过渡生效时的状态，整个元素进入过段的阶段，在过渡完成之后移除，这个类可以用来定义进入过渡的时间、贝塞尔曲线、延迟
3. v-enter-to：【进入】过渡结束的状态，一般将这个状态的样式设置跟初始样式一致
4. v-leave：【离开】过渡生效开始阶段，在离开过渡被触发时立即生效
5. v-leave-active：【离开】过渡生效开始被移除后，到过渡完成前一帧的状态，同样也能在这个类中定义过渡的事件、贝塞尔曲线、延迟等
6. v-leave-to：【离开】过渡结束时生效，在完成【离开】过渡的下一帧被移除

还可以监听这些类的生命周期函数

```vue
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
></transition>

<script>
export default {
  methods: {
    // --------
    // 进入中
    // --------

    beforeEnter: function (el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
      // ...
      done()
    },
    afterEnter: function (el) {
      // ...
    },
    enterCancelled: function (el) {
      // ...
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function (el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function (el, done) {
      // ...
      done()
    },
    afterLeave: function (el) {
      // ...
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function (el) {
      // ...
    }
  }
}
</script>
```

v-for 出来的列表，使用<transition-group>通过 tag 属性指定是什么元素标签

```vue
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```

[进入/离开 & 列表过渡 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/guide/transitions.html)

## 配置代理

在`Vue`中推荐`Axios`发送网络请求，也可以直接用`JavaScript`内置的`fetch`，这两者都支持`Promise`范式

但是`Axios`支持更多的功能，包括请求、响应拦截器

```vue
<template>
  <div id="app">
    <button @click="getStudents">获取学生信息</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {},
  methods: {
    getStudents() {
      axios.get('http://localhost:5000/students').then(res => console.log(res))
    }
  }
}
</script>

```

如果点击页面上的按钮，立马就会报错，跨域错误，但是此时的请求已经送达了服务器，只不过是浏览器基于同源策略，给我们屏蔽掉了服务器的响应

常见的跨域解决方案：

- 服务器解决——cors，需要后端人员在服务器配置
- 前端通过绕过浏览器的方法——jsonp，利用script标签在引入外部资源不收同源策略的限制，只能解决get请求，其他类型处理不了
- 配置代理转发——在前端服务和后台服务之间，起一个服务，这个服务和前端的服务一样，将前台后台的所有请求，转发到这台代理服务器，经过处理变为了同源策略的请求

在Vue项目使用最多的就是第三个配置代理转发

开启代理转发的方式也有几种：

- 配置nginx，也是需要后端配合
- 在VueCli开启开发代理

只需要在`vue.config.js`中写上如下配置，就可以开启代理

vue.config.js

```js
// 方式一，简单代理，1.不能控制哪些走代理的资源  2.不能配置多台代理
devServer: {
  // 需要代理的请求接口，比如在实际项目就是 192.169.11.9240:8080 （公司开发服务器）
  proxy: 'http://localhost:5000'
},
  
// 方式二，常见的代理配置，解决方式一的两个问题
// '/api'：请求前缀，只会代理匹配了前缀的请求，比如 192.169.11.9240:8080/api/login => 这个请求就会走代理变为 => loaclhost:8080/api/login
// 但是这种处理还不够，需要把添加多的 /api 给处理，所以需要借助 pathRewrite 配置请求前缀的目标服务器的路由
// pathRewrite：重写路由，处理 /api 前缀
// ws：用于支持websocket
// changeOrigin：欺骗服务器获取动态的host，配置为true的话，请求后的host，与服务器的地址一模一样，为false时，就如实上报，比如本机的前台服务: 8080
devServer: {
  proxy: {
    '/api': {
      	target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' },
        ws: true,
        changeOrigin: true
    }，
    '/xxx': {
      target: 'http://localhost:50001',
        pathRewrite: { '^/xxx': '' },
          ws: true,
            changeOrigin: true
    }
  }
},
```

## 插槽slot

### 分类

插槽分为以下几类：

- 默认插槽：所有的不带名字的插槽都是默认插槽，会按照插入的顺序渲染在子组件中
- 具名插槽：给插槽添加上名字，需要和v-slot（#name）、template配合使用，且v-slot只能使用在template上，多个具名插槽被使用时，后面的具名插槽会替换前面的
- 作用域插槽：作用域插槽就是将数据放在定义者（子组件），但是在使用者（父组件）中也能访问数据，也就是子组件通过插槽传递参数给父组件，传递的参数是个对象
- 动态插槽

当组件没有传递插槽时，默认插槽的内容会渲染在页面上

所有的插槽内容会在使用时解析并传递，所以样式最好在父组件（使用者）中定义，当然在子组件（定义者）中定义样式也是可以的，一样生效

1. 默认插槽

```vue
<template>
  <div class="container">
    <List title="美食">
      <ul>
        <li v-for="item in foods" :key="item">{{ item }}</li>
      </ul>
      <p>测试</p>
    </List>
    <List />
  </div>
</template>

<script>
import List from '@/components/List.vue'

export default {
  name: 'App',
  components: { List },
  data() {
    return {
      foods: ['烤鸭', '小龙虾', '火锅', '汉堡包', '寿司', '披萨', '麻辣烫', '串串香', '烧烤', '拉面'],
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
```

展示结果如下图：List组件中的所有children都插入到了默认插槽中

![image-20230531231306921](D:\code\chendiyu\knowledge-has-no-limit\packages\system-learning\part-8-vue2vue3\03_jiaoshoujia\README.assets\image-20230531231306921.png)

2. 具名插槽

```vue
<template>
  <div class="container">
    <!-- 具名插槽 -->
    <List title="电影">
      <p>具名插槽</p>
      <template #content> 
      <!-- 或者使用  <template v-slot:content> -->
        <ul>
          <li v-for="item in movies" :key="item">{{ item }}</li>
        </ul>
      </template>
    </List>
  </div>
</template>

<script>
import List from '@/components/List.vue'

export default {
  name: 'App',
  components: { List },
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

<style>
.container {
  display: flex;
  align-items: center;
}
</style>

```

效果如下图展示：

![image-20230531232314412](D:\code\chendiyu\knowledge-has-no-limit\packages\system-learning\part-8-vue2vue3\03_jiaoshoujia\README.assets\image-20230531232314412.png)

3. 作用域插槽

```vue
<template>
  <div class="container">
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

export default {
  name: 'App',
  components: { List },
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
}
</style>

```



### 插槽的本质

插槽实际上是一个对象，大概长下面这样

```js
 {
   default: function(){} => VNode, // 默认插槽
   slotName1: function(){} => VNode, // 具名插槽
   slotName2: function({xxx}){} => VNode // 作用域插槽
 }
```

插槽的内容就是调用`this.$slot.xxx`的函数，获取的返回值（一个VNode），作为子节点插入到子组件插槽定义的位置中

比如下面这段代码，就是在定义插槽，插槽实际上就是个函数

```vue
<template>
  <div class="container">
    <Com>
      <p>默认插槽</p>
      <template v-slot:slot1>具名插槽</template>
      <template v-slot:slot2="slotProps">{{ slotProps.msg }}</template>
    </Com>
  </div>
</template>

<script>
import Vue from 'vue'

const Com = Vue.component('Com', {
  render(h) {
    return h('div', [
      this.$slots.default, // 默认插槽
      this.$slots.slot1, // 具名插槽
      h('div', this.$scopedSlots.slot2({ msg: '作用域插槽' })) // 作用域插槽
    ])
  }
})

export default {
  name: 'App',
  components: { Com },
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
}
</style>

```

## Vuex

是一个专门为vue应用开发的全局状态管理《插件》，与react系的redux对标，是一种单向数据流的模式

![image-20230601185847493](G:\repositories\chendiyu\knowledge-has-no-limit\packages\system-learning\part-8-vue2vue3\03_jiaoshoujia\README.assets\image-20230601185847493.png)

对于全局状态管理，建议全局只有一个唯一的状态管理库实例，以免单向数据流的结构遭到破坏

vuex可以无视组件进行数据单向传递

**什么时候用Vuex？**

它的作用和全局事件总线是对标的，当你想要多组件共享数据，并可以对数据进行操作时，用Vuex就没错了，但是它的使用是有额外的使用成本的，当你的程序足够“庞大”，再去考虑Vuex也不晚

> 事件总线的缺点，在于共享全局的数据多了，需要在组件中`$on、$off`的次数也会变多，不利于数据管理，他们之间的关系链会变得混乱

### Vuex工作原理

![image-20230601195558032](G:\repositories\chendiyu\knowledge-has-no-limit\packages\system-learning\part-8-vue2vue3\03_jiaoshoujia\README.assets\image-20230601195558032.png)

组件中通过`dispatch`派发一个时间，通知`actions`提交一个调用`mutations`，在`mutations`中可以拿到`dispatch`派发的事件，并且拿到`state`的内容，vuex底层会帮开发者调用事件修改`state`的数据，`state`数据改变之后，视图也会跟着改变

`actions`负责异步的派发的事件（网络请求），`mutations`负责同步修改`state`的数据

当然`vuex`允许不经过`actions`直接`commit`提交调用`mutations`去修改`state`

**以现实来举例子：**

`vueComponent`相当于去餐馆消费的客人，进入到`vuex餐馆`点单吃饭，作为服务员的`actions`点菜，并通知作为厨师的`mutations`，客人要吃什么菜（需要什么数据），厨师做好了菜（`state`），然后给客人上菜（`从state中取数据使用`）

如果客人对这家餐馆很熟悉，那么甚至可以跳过服务员这一步，直接跟厨师对话，让厨师拿出客人想要的菜品，也就是`vueComponent`直接跳过`actions`从`mutations`中调用获取`state`

不能跳过的服务员的情况，就是需要异步操作时，必须要经由`actions`

每一个`vuex`的核心就是`store`，可以把`store`看做一个数据容器，从仓库中取数据需要经过`store`，任意组件`commit`时也要经过`store`，也就是说，存取数据都不能从`store`上绕过去，它是一个及其重要的核心

### vuex初步

vuex需要安装`npm install vuex@next --save`

注意下：