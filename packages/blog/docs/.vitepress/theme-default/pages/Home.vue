<script setup lang="ts">
import { ref, onMounted } from "vue";
import data from "../../public/js/test";
const show = ref(false);
const recommendCardImg = ref(
  new Array(30).fill(null).map((item, index) => ({
    img: getAssetsImages(`${index + 1}.jpg`),
    tiitle: data[index].title,
    url: data[index].url,
    createTime: "2023-03-26 00:42:22",
  }))
);

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 1000);
});

function getAssetsImages(name: string | number) {
  return new URL(`../../public/image/card/${name}`, import.meta.url).href;
}
</script>

<template>
  <div class="home flex flex-col items-center min-h-100vh">
    <div class="banner w-full">
      <div class="intro flex items-center justify-center h-full">
        <img
          src="../../public/image/shark-bee.png"
          alt=""
          class="rounded-full shadow-xl w-32 h-32 md:block hidden"
        />
        <p class="title flex flex-col items-center text-white mx-4">
          <!-- TODO:这里的励志话，调每日一句的接口 -->
          <span class="text-3xl font-bold">左右的个人博客</span>
          <span class="text-xl self-end mt-4"
            >生命本没有意义，你要能给它什么意义，它就有什么意义。</span
          >
          <span class="self-end">- 胡适</span>
        </p>
      </div>
    </div>
    <div class="recommend-container">
      <div
        class="recommend-card rounded-lg bg-white h-64 relative"
        v-for="(item, index) in recommendCardImg"
        :key="index"
        :style="{ backgroundImage: `url(${item.img})` }"
      >
        <div class="card-title text-lg absolute bottom-9 left-2 text-white">
          {{ item.tiitle }}
        </div>
        <div class="card-time mt-2 absolute bottom-2 left-2 text-white">
          {{ item.createTime }}
        </div>
      </div>
    </div>
    <footer>
      <div class="bg"></div>
      <div class="footer-wrap">
        <div class="copyright">©2019 - 2020 By Shn</div>
        <!-- <div class="framework-info">
          <span>Power by</span>
          <a
            href="https://vuepress.vuejs.org/zh/"
            rel="noopener"
            target="_blank"
          >
            <span>Vuepress</span>
          </a>
          &
          <a href="http://beian.miit.gov.cn/" style="font-size: 14px"
            >浙ICP备18029315号-2</a
          >
        </div> -->
      </div>
    </footer>
  </div>
</template>

<style lang="less">
.home {
  min-height: 100vh;
  background-color: rgb(148, 125, 125);
}
.banner {
  height: 600px;
  background-image: url(../../public/image/bg12.jpg);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
}

.recommend-container {
  @apply w-11/12 grid mt-4 grid-cols-1 gap-4;
  .recommend-card {
    box-shadow: 0 4px 8px 6px rgb(7 17 27 / 0.06);
    overflow: hidden;
    background-position: 50% 50%;
    background-size: cover;
  }
}

@screen md {
  .recommend-container {
    @apply grid-cols-2;
  }
  .recommend-card {
    @apply h-52;
  }
}
@screen lg {
  .recommend-container {
    @apply grid-cols-3 gap-5;
  }
  .recommend-card {
    @apply h-40;
  }
}

@screen xl-2xl {
  .recommend-container {
    @apply grid-cols-4  gap-6;
  }

  .recommend-card {
    @apply h-36;
  }
}

.card-title::after {
  background-color: #30b3ff;
  bottom: -4px;
  content: "";
  position: absolute;
  width: 40px;
  height: 3px;
  left: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 5px;
  box-shadow: 1px 1px 3px -1px #50bfff;
}
</style>
