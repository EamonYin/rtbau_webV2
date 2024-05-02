<template>
  <div v-if="loaded">
    <h1>欢迎进入EamonPlanet！</h1>

    <br />
    <span>您当前所处：{{ myLocation }}</span>
    <span>{{ myLocationCode }}</span>
    <br />
    <span>您的uid为：{{ myuid }}</span>
    <br />
    <span>明天：{{ tomorrowWeather }}</span>
    <br />
    <!-- 提交表单 -->
    <el-input type="text" name="nickName" v-model="input" ref="nickName" />
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
    </el-alert>

    <el-image :src="imageUrl" alt=""></el-image>
    <el-tabs>{{ imageCode }}</el-tabs>
  </div>
</template>

<script>
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
      loaded: false,
      data: null,
      imageCode: "",
      success: false,
      error: false,
    };
  },

  // 页面一进入就加载
  mounted: function () {
    // 1:获取ip信息
    this.axios.get("/rtbau-user/getIPLocation").then((response) => {
      console.log("【后端返回的地址为：】" + response.data);
      this.myLocation = response.data.locationName;
      this.myLocationCode = response.data.locationCode;
      // 2:发送API请求，并将返回的图片URL存储到imageUrl属性中
      this.axios
        .post("/rtbau-user/getUserQR", {
          cityCode: this.myLocationCode,
        })
        .then((response) => {
          console.log("【前端传参：】" + this.myLocationCode);
          console.log("【后端返回的QR为：】" + response.data);
          this.imageUrl = response.data.qrUrl;
          this.imageCode = response.data.qrCode;
          this.loaded = true;
        });
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


