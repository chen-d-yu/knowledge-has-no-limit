# todo-list

学习四要素：(道法术器式学习公式)

1. 是什么：当前知识点是什么，也就是拆解需求
2. 为什么：为什么要怎么做，理解需求
3. 怎么做：理解做的过程
4. 用什么做：用什么方案实现
5. 分享：费曼学习法

- [ ] 出：大话系列 -> 大话原型链...
- [ ] 学习计划路线：js 高级 -> vue3 -> node -> nest -> java -> 算法
- [ ] 学完网络请求，就复习
- [x] 正则表达式跳过
- [x] 封装日期 formatter 函数跳过

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- defer的代码总会在另外两个之后解析执行 -->
    <script src="./test.js" defer></script>
  </head>
  <body>
    <!-- 
      结论：
       1.没有加defer、onload事件的script标签，总会先解析运行，无论位置
       2.加了defer的script标签，不会阻塞dom树的构建
       3.加了defer的script标签，总是会比onload事件（不限位置）之前先解析执行
       4.没有onload事件、没有defer属性、不限位置的script标签的js代码，总会先解析运行
       5.defer属性仅适用于外部文件，对于script标签的内容会被忽略
     -->
    <div class="box"></div>
    <script>
      // 这里的onload事件的代码只会在dom树构建完成之后运行，不限位置
      window.onload = function () {
        console.log("box", document.querySelector(".box"));
        console.log("-----no defer onload----");
      };

      // 同 onload事件，但是该事件会比onload先行
      window.addEventListener("DOMContentLoaded", () => {
        console.log("box", document.querySelector(".box"));
        console.log("-----no defer DOMContentLoaded----");
      });

      // 这里的代码无论是放在body元素最下面还是head标签内，都是最先行的
      console.log("box", document.querySelector(".box"));
      console.log("-----no defer default----");
    </script>
  </body>
</html>
```
