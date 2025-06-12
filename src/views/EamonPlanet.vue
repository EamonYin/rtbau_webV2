<template>
  <el-container v-loading.fullscreen.lock="fullscreenLoading">
    <span style="display: none">{{ isExistflg }}</span>
    <!-- 改为组件等待加载动画 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <el-header>
      <a
        >CSDN博客专家
        <img alt="Vue logo" src="../assets/good.png" width="20" height="20" />
        <img alt="Vue logo" src="../assets/expert.png" width="20" height="20" />
        ：
        <a
          href="https://blog.csdn.net/Tianc666?type=blog"
          target="_blank"
          class="buttonText"
          >进阶的小名</a
        >
      </a>
    </el-header>
    
    <!-- 独立的标题布局 -->
    <el-row type="flex" justify="center" align="middle" class="title-row">
      <el-col :span="24">
        <div class="title-container">
          <h1>欢迎进入EamonPlanet！</h1>
        </div>
      </el-col>
    </el-row>
    
    <el-main>
      <table align="center">
        <tr>
          <td>
            <el-row justify="start">
              <a><b>您当前所处：</b>{{ myLocation }}</a>
            </el-row>
            <el-row justify="start">
              <a><b>明天的天气：</b>{{ tomorrowWeather }}</a>
            </el-row>
          </td>
        </tr>
      </table>

      <el-row type="flex" justify="center" align="middle">
        <!-- <el-form label-position="right" label-width="auto"> -->
        <!-- 
        <el-form-item label="您当前所处：">
          {{ myLocation }}
        </el-form-item>
        <el-form-item label="您的uid为：" v-if="isExistflg">
          {{ myuid }}
        </el-form-item>
        <el-form-item label="明天的天气：">
          {{ tomorrowWeather }}
        </el-form-item>
      </el-form> -->

        <span>{{ userId }}</span>

        <el-col>
          <el-tabs
            >请使用微信"扫一扫"扫描下方二维码,以获取坏天气信息推送</el-tabs
          >
        </el-col>
        <el-col>
          <el-tabs>
            产品使用开源的<a
              href="https://wxpusher.zjiecode.com/"
              target="_blank"
              class="buttonText"
              >WxPusher</a
            >实现推送，请放心扫码
          </el-tabs>
        </el-col>
        <el-col>
          <el-image :src="imageUrl" alt="" v-show="imageFlag" style="transform: scale(0.8);"></el-image>
          <!-- <el-row type="flex" justify="center" align="middle"> -->
        </el-col>
        <el-col>
          <el-tabs>{{ imageCode }}</el-tabs>
        </el-col>
        <el-col>
          <el-tabs>{{ isExist }}</el-tabs>
        </el-col>
        <!-- </el-row> -->
      </el-row>
    </el-main>
    <!-- </div> -->
  </el-container>
</template>

<script>
import { watch, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  data() {
    return {
      myLocation: "",
      myLocationCode: "",
      myuid: "",
      myuidIsShow: false,
      tomorrowWeather: "",
      list: [],
      input: "",
      imageUrl: "",
      blog: "",
      imageFlag: false,
      loaded: false,
      data: null,
      imageCode: "",
      isExist: "",
      isExistflg: "",
      userId: "",
      fullscreenLoading: true,
      success: false,
      error: false,
    };
  },
  created: function () {
    const route = useRouter();
    watch(route.currentRoute, () => {
      console.log("接收到的username：" + this.$route.query.uid);
      this.isExistflg = this.$route.query.uid;
    });
  },

  //页面一进入就加载
  mounted: function () {

    // 1:获取ip信息
    this.axios.get("/rtbau-user/getIPLocation").then((response) => {
      console.log("【后端返回的地址为：】" + response.data);
      this.myLocation = response.data.locationName;
      this.myLocationCode = response.data.locationCode;
      if (this.isExistflg) {
        this.myuid = this.isExistflg;
        // 判断用户是否存在且开启
        this.axios
          .post("/rtbau-user/userIsExist", {
            uid: this.isExistflg,
          })
          .then((response) => {
            console.log(
              "【后端返回判断用户是否存在且开启结果：】" + response.data
            );
            if (response.data) {
              this.isExist = "您已注册，无需扫码！";
              this.loaded = true;
              this.fullscreenLoading = false;
            } else {
              // 2:发送API请求，并将返回的图片URL存储到imageUrl属性中
              this.axios
                .post("/rtbau-user/getUserQR", {
                  cityCode: this.myLocationCode,
                  cityName: this.myLocation,
                })
                .then((response) => {
                  console.log("【后端返回的QR为Url：】" + response.data.qrUrl);
                  this.imageUrl = response.data.qrUrl;
                  this.imageCode = response.data.qrCode;
                  this.imageFlag = true;
                  this.loaded = true;
                  this.fullscreenLoading = false;
                });
            }
          });
      } else {
        // 2:发送API请求，并将返回的图片URL存储到imageUrl属性中
        this.axios
          .post("/rtbau-user/getUserQR", {
            cityCode: this.myLocationCode,
            cityName: this.myLocation,
          })
          .then((response) => {
            console.log("【后端返回的QR为Url：】" + response.data.qrUrl);
            this.imageUrl = response.data.qrUrl;
            this.imageCode = response.data.qrCode;
            this.imageFlag = true;
            this.loaded = true;
            this.fullscreenLoading = false;
          });
      }
    });
    this.axios.get("/weather/get").then((res) => {
      console.log("【后端返回的结果为：】" + res.data);
      if (res.data) {
        this.tomorrowWeather = "有雨雪🥶,记得带🌂哦～";
      } else {
        this.tomorrowWeather = "无雨雪😄，无需带🌂";
      }
    });
    // setTimeout(() => {
    //       this.loaded = true;
    //     }, 2000); // 等待3秒后渲染页面
  },

  methods: {
    goSubmitBtn() {
      console.log("这里是goSubmitBtn：" + this.$route.query.uid);
      const param = { uid: this.$route.query.uid };
      this.axios
        .post("/weather/get", {
          uid: this.$route.query.uid,
          nickName: this.input,
          regionCode: this.mybox,
        })
        .then((res) => {
          console.log("【后端返回的结果是】" + res.data);
          if (res.data) {
            this.success = true;
          } else {
            this.error = true;
          }
        });
    },
  },
  // components: {},
  // created() {
  //   this.axios
  //     .get("/weather/get")
  //     .then((res) => {
  //       this.list = res.data;
  //       // for (var i = 0; i < res.data.length; i++) {
  //       //   this.list.push(res.data[i].regionName);
  //       // }
  //     });
  //   let uid = this.$route.query.uid;
  //   this.myuid = uid;
  // },
};


let colors = [
  "#FFFF00",
  "#FFD700",
  "#FFA500",
  "#32CD32",
  "#00FF00",
  "#98FB98",
  "#FF4500",
  "#DC143C",
  "#00FFFF",
  "#40E0D0",
  "#1E90FF",
  "#EE82EE",
  "#DA70D6",
  "#9370DB",
];
let currentColorIndex = 0;
document.documentElement.style.setProperty(
  "--text-color",
  colors[currentColorIndex]
);
setInterval(() => {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  document.documentElement.style.setProperty(
    "--text-color",
    colors[currentColorIndex]
  );
}, 800);
</script>

<style>
/* 定义放大缩小动画关键帧 */
@keyframes scale-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

body {
     height: 100vh;
 }

.grid-container {
     display: grid;
     place-items: center;
 }

/* 标题相关样式 */
.title-row {
  margin: 0;
  background-color: transparent;
  border-radius: 8px;
  padding: 0;
}

.title-container {
  text-align: center;
  transform: translateX(12px);
  margin: 0;
}

h1 {
  font-size: 25px;
  -webkit-animation: scale-animation 2s infinite;
  animation: scale-animation 2s infinite;
  transition: color 0.5s ease; /* 添加颜色过渡效果 */
  color: var(--text-color);
  max-width: 100%;
  width: 100%;
  font-size: clamp(25px, 8vw, 60px); /* 响应式字体大小 */
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 0;
}
</style>