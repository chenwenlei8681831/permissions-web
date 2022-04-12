<template>

  <div class="content">
      <!-- 顶部内容 -->
      <el-header class="header pad_none f_x w_100 bg_color01">
          <div class="logo f_l h_100"></div>
          <div @click="login_out" class="list_co02 f_r h_100 big_btn font12" style="width:60px">退出</div>
          <!--用户信息-->
          <div class="mar_r_30 r_home f_r b_s h_100 big_btn big_btn01 po_r text_btn flex row a_center">
            <span class="v_img d_l_block mar_r_10">A</span>
            <span>{{username?username:'--'}}</span>
          </div>
          <div class="clearfix"></div>
      </el-header>
      <!-- 底部内容 -->
      <el-container class="container">
          <!-- 侧边导航菜单 -->
          <my-aside :msg='msg' style="width:200px"></my-aside>
          <!-- 导航展示内容 -->
          <div class="scroll_bar views_box w_100 margin_bottom">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
      </el-container>
  </div>

</template>

<script>
var THIS;
import my_request from '@/utils/request.js';
import alertMixins from '@/mixins/alertMixins';
import myAside from "@/views/components/my-aside/my-aside";
export default {
  name: "home",
  components:{
      myAside
  },
  mixins:[alertMixins],
  data() {
    THIS = this;
    return {
        userType: 1, //身份 1：管理员  2：员工
        user: {},
        username: window.localStorage.user,
        //权限
        permissions: "",
        tabIndex: window.localStorage.tabIndex ? window.localStorage.tabIndex : 0,
        pageText: THIS.store.state.pageText,
        msg: [],
    };
  },
  methods: {

    login_out() {
        THIS.operationWarn('确定退出登录吗?',()=>{
            my_request("/logout");
            window.localStorage.flexible_manage_token = "";
            window.localStorage.userInfo = "";
            THIS.$router.replace("/login");
            THIS.message('退出成功');
        });
    },


  },
  mounted() {

    THIS = this;
    //先从缓存中获取
    //console.log(12,window.localStorage.szrl_navmsg);
    let nav_obj = JSON.parse(window.localStorage.szrl_navmsg);
    console.log('nav_obj',nav_obj);
    THIS.msg = nav_obj;
    //监听浏览器返回事件
    window.addEventListener("popstate", () =>{
        THIS.store.commit("setNavIndex", window.localStorage.beforNavIndex);
      },
      false
    );

  },
};
</script>


<style scoped>
    .content {
      width: 100%;
      height: 100vh;
      box-sizing: border-box;
      margin: 0;
      color: #000;
      overflow: hidden;
    }
    .header {
      height: 0.64rem !important;
    }
    .header .logo {
      width: 2.5rem;
      background: url(../assets/images/logo.png) no-repeat 0.3rem center / 1.3rem;
    }
    .nav_title {
      width: 0.8rem;
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      color: #262626;
    }
    .nav_title.current {
      color: #007df2;
      background: rgba(0, 125, 242, 0.1);
    }
    .header .big_btn {
      width: 20px;
      line-height: 0.64rem;
      cursor: pointer;
      background: no-repeat center / 18px;
      font-size: 14px;
      color: #262626;
      padding: 0 15px;
    }
    .big_btn.big_btn01 {
      min-width: 130px !important;
      padding: 0;
    }
    .container {
      box-sizing: border-box;
    }
    .son_title {
      color: #007df2;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      box-sizing: border-box;
      padding-left: 20px;
      /*background: url(../assets/images/bottom_arrow01.png) no-repeat right 10px center /12px;*/
    }
    .nav {
      height: 100vh;
      padding-top: 0.64rem;
    }
    .nav a {
      display: block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      box-sizing: border-box;
      padding-left: 40px;
      color: #333;
    }
    .nav a.router-link-active {
      color: #409eff;
      background: rgba(0, 125, 242, 0.1);
    }
    .nav_icon {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.05rem;
      width: 0.24rem;
      height: 0.24rem;
      text-align: center;
      font-size: 0.18rem;
      border: red 0.01rem solid;
      box-sizing: border-box;
    }
    .views_box {
      width: calc(100% - 2.56rem);
      height: 100vh;
      box-sizing: border-box;
      background: #f4f9ff;
      overflow: auto;
      padding-top: 0.64rem;
    }
    .nav_item.current {
      color: red;
    }
    .color_box {
      width: 360px;
      height: 180px;
      top: 0.6rem;
      right: 0.6rem;
      z-index: 999;
      border-radius: 10px;
      display: none;
      box-shadow: 0px 2px 10px 0px rgba(207, 228, 255, 0.7);
    }
    .color_box .sjx {
      left: 162px;
    }
    .color_item {
      width: 60px;
      height: 60px;
      margin: 15px;
      cursor: pointer;
    }
    .color_change:hover .color_box {
      display: block;
    }
    .accountInfo_box {
      width: 360px;
      top: 0.6rem;
      right: 0.6rem;
      z-index: 999;
      border-radius: 10px;
      display: none;
      box-shadow: 0px 2px 10px 0px rgba(207, 228, 255, 0.7);
    }
    .accountInfo_box .sjx {
      left: 240px;
    }
    .accountInfo_box .title {
      height: 40px;
      line-height: 40px;
      color: #262626;
    }
    .accountInfo_box p {
      height: 32px;
      line-height: 32px;
      color: #262626;
    }
    .accountInfo_box p span {
      color: #8c8c8c;
    }
    .gn_box {
      width: 360px;
      top: 0.6rem;
      right: 0.6rem;
      z-index: 999;
      border-radius: 10px;
      display: none;
      box-shadow: 0px 2px 10px 0px rgba(207, 228, 255, 0.7);
    }
    .gn_box .sjx {
      left: 112px;
    }
    .big_btn01:hover .accountInfo_box {
      display: none;
    }
    .gn_change:hover .gn_box {
      display: block;
    }
    .gn_box ul li {
      line-height: 32px;
      font-size: 14px;
    }
    .co_red {
      color: #f35149;
    }
    .left_line {
      width: 4px;
      height: 20px;
      background: green;
      left: 0;
      top: 15px;
    }
    .info_box {
      width: 5rem;
      height: 3rem;
      top: 0.6rem;
      right: 0;
      z-index: 999;
      display: none;
    }
    .big_btn:hover .info_box {
      display: block;
    }
    .circle {
      right: 0.1rem;
      top: 0.1rem;
      font-size: 0.18rem;
    }
    .f_x {
      left: 0;
      top: 0;
    }
    .text_btn {
      width: 70px !important;
    }
    .r_home {
      padding-left: 24px;
      color: #262626;
    }
    .v_img {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      border-radius: 50%;
      color: #fff;
      background-color: #5db1ff;
    }
    .yuan {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: red;
      left: 50%;
      top: 50%;
      margin-top: -10px;
      margin-left: 4px;
    }
    /deep/ .red{
      border: solid red 1px;
    }
</style>
