<script lang="ts" setup>

</script>

<template>
  <div class="avatar-wrap">
    <img src="/logo.svg" class="avatar-src"/>
  </div>
</template>


<style lang="less" scoped>
:root {

}

.avatar-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 192px;
  max-height: 192px;
}

.avatar-src {
  --border: 5px; /* border thickness */
  --border-c: #255b98; /* border color */
  --bgc: #f3bf99; /* background color */
  --f: 1;


  width: 100%;
  height: 100%;
  transition: 0.5s;
  transform-origin: center;
  //outline: 5px solid #000;
}

@media (min-width: 640px) {
  .avatar-wrap {
    max-width: 256px;
    max-height: 256px;
  }
}

@media (min-width: 960px) {
  .avatar-wrap {
    max-width: 320px;
    max-height: 320px;
  }
}


//body {
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  background-color: var(--body-bgc-color);
//}
//
//.container {
//  width: 400px;
//  height: 400px;
//  background-color: var(--container-bgc-clor);
//  border-radius: 2% 10%;
//  box-shadow: 10px 10px 10px 0px #616161;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//}
//
//img {
//  --s: 200px; /* image size */
//  --b: 5px; /* border thickness */
//  --c: #255b98; /* border color */
//  --cb: #f3bf99; /* background color */
//  --_g: content-box no-repeat center / calc(100% / var(--f)) 100%; /* content-box: 内容区域开始显示背景图 放大后背景图大小不变 */
//  --_o: calc((1 / var(--f) - 1) * var(--s) / 2 - var(--b)); /* offset 相对于原来的长度，所以放大的长度-原来的长度除以2在除以倍数 */
//  --f: 1; /* initial scale */
//  --mh: calc(1px - var(--_o)) / calc(100% / var(--f) - 2 * var(--b) - 2px);
//  width: var(--s);
//  aspect-ratio: 1;
//  padding-top: calc(var(--s) / 5); /* 防止上面挡住人物，保留上部分空间 */
//  cursor: pointer;
//  border-radius: 0 0 999px 999px;
//  outline: var(--b) solid var(--c);
//  outline-offset: var(--_o);
//  background: radial-gradient(circle closest-side,
//  var(--cb) calc(99% - var(--b)),
//  var(--c) calc(100% - var(--b)),
//  var(--c) 99%,
//  transparent 100%) var(--_g);
//  -webkit-mask: linear-gradient(#000 0 0) no-repeat center var(--mh) 50%,
//  radial-gradient(circle closest-side, #000 99%, #0000) var(--_g);
//  transform: scale(var(--f));
//  transition: 0.45s;
//}
//
//img:hover {
//  --f: 1.4; /* hover scale */
//}
</style>