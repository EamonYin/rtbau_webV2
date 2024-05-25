<template>
<span style=display:none>{{ isExistflg }}</span>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <!-- 改为组件等待加载动画 -->
    <!-- <div v-if="loaded"> -->
    <h1>欢迎进入EamonPlanet！</h1>

    <br />
    <span>您当前所处：{{ myLocation }}</span>
    <span v-show=false>{{ myLocationCode }}</span>
    <br />
    <span>您的uid为：{{ myuid }}</span>
    <br />
    <span>明天：{{ tomorrowWeather }}</span>
    <br />
    <!-- 提交表单 -->
    <!-- <el-input type="text" name="nickName" v-model="input" ref="nickName" />
    <el-input
      type="submit"
      name="goSubmitBtn"
      value="提交"
      @click.native="goSubmitBtn"
    />

    <el-alert
      title="成功提示"
      type="success"
      v-show="success"
      description="注册成功！若未来的某一天是恶劣天气，您将提前一天收到小名的推送，提醒您带伞"
      show-icon
    >
    </el-alert>

    <el-alert
      title="错误提示"
      type="error"
      v-show="error"
      description="注册有误！"
      show-icon
    >
    </el-alert> -->

    <el-image :src="imageUrl" alt="" v-show="imageFlag"></el-image>
    <el-tabs>{{ imageCode }}</el-tabs>
    <el-tabs>{{ isExist }}</el-tabs>
  </div>
</template>

<script>
import { watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Home",
  data() {
    return {
      myLocation: "",
      myLocationCode: "",
      myuid: "",
      tomorrowWeather: "",
      list: [],
      input: "",
      imageUrl: "",
      imageFlag: false,
      loaded: false,
      data: null,
      imageCode: "",
      isExist: "",
      isExistflg:"",
      fullscreenLoading: true,
      success: false,
      error: false,
    };
  },
  created: function(){
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
</script>