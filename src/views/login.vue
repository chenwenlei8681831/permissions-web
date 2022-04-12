<template>
  <div class="views bg flex a_center j_center">
    <div class="box flex col b_s bg_fff">
      <div class="flex_1 b_s pad_t_20 inp_box">
        <p class="text_center" style="color:#333;font-size:22px">数字人力用工解决方案系统</p>
        <el-form class="demo-ruleForm" :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" >
            <!-- 账号 -->
            <div class="po_r mar_t_20 w_100">
              <el-form-item class="w_100" prop="account">
                <el-input class="b_s" v-model="ruleForm.account" placeholder="请输入账号" autocomplete="off" clearable >
                </el-input>
              </el-form-item>
            </div>
            <!-- 密码 -->
            <div class="po_r mar_t_40 w_100">
              <el-form-item class="w_100" prop="password">
                <el-input class="b_s" type="password" v-model="ruleForm.password" placeholder="请输入密码" auto-complete="on" @keyup.enter.native="submitForm('ruleForm')" clearable>
                </el-input>
              </el-form-item>
            </div>
            <!-- 按钮 -->
            <div class="bogin_btn pointer mar_t_40" @click="submitForm('ruleForm')">登录</div>
            <p class="font12 mar_t_10">
              <span :class="isflag?'current':''" class="c_span" @click="isJz()"></span>记住密码
            </p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import my_request from '@/utils/request.js';
var THIS;
export default {
  name: "",
  data() {
    return {
      isflag: true,
      username: "",
      password: "",
      success: false,
      ruleForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: [] }],
        password: [{ required: true, message: "请输入密码", trigger: [] }]
      }
    };
  },
  computed: {
    ...mapState(["navmsg"])
  },
  methods: {

    login() {
        var data = {
          account:this.ruleForm.account,
          password:this.ruleForm.password
        };
        my_request("/login", data,'post', success,false,[1,1,1],this);
        function success(msg){
            THIS.message('登录成功');
            window.localStorage.flexible_manage_token = msg.token;
            window.localStorage.userInfo = msg.username;
            THIS.store.dispatch('GET_MENU').then(()=>{
                console.log(12)
                THIS.$router.replace('/home');
            });
        };
    },

    isJz() {
      THIS.isflag = !THIS.isflag;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          THIS.login();
        } else {
          THIS.$message({
            type: "warning",
            message: "请将必填项完善后再提交",
            dangerouslyUseHTMLString: true
          });
          return false;
        }
      });
    }


  },
  mounted() {
    THIS = this;
    window.localStorage.tabIndex = 0;
    window.localStorage.son_tabIndex = 0;
    THIS.ruleForm.account = window.localStorage.username;
    THIS.ruleForm.password = window.localStorage.password;
    window.localStorage.szrl_navmsg = '[]';
  }
};
</script>

<style scoped>
    .views {
      position: relative;
      background: url(../assets/images/login/bg.png) no-repeat center / 100% 100%;
    }
    .box {
      width: 420px;
      height: 500px;
      padding-top: 100px;
      background: url(../assets/images/login/logo.png) no-repeat #fff center top
        40px /72px;
    }
    .box .h_60px {
      line-height: 60px;
    }
    .box .h_60px .current {
      color: #007df2;
      border-bottom: 3px solid #007df2;
    }
    .edit_button {
      display: block;
      margin: 60px auto 0;
    }
    .views {
      height: 100vh;
    }
    .bg_box {
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }
    .bg_box .po_b {
      width: 100%;
      height: 100%;
      background: url(../assets/images/login/success.png) no-repeat center 50px /50px;
      background-color: rgba(0, 0, 0, 0.7);
      left: 0;
      top: 0;
      z-index: 99;
      color: #fff;
      padding-top: 110px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    h1 {
      color: #8c8c8c;
      font-size: 16px;
    }
    .inp_box {
      padding: 40px 70px;
    }
    .bogin_btn {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 4px;
      background: #007df2;
      color: #fff;
    }
    span.d_block {
      width: 50px;
      text-align: center;
      top: 0;
      left: 0;
      line-height: 40px;
      z-index: 999;
    }
    .lo_span {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 5px;
      background: no-repeat center / 100%;
    }
    .lo_span01 {
      background-image: url(../assets/images/login/ewm01.png);
    }
    .lo_span02 {
      background-image: url(../assets/images/login/pic01.png);
    }
    .current .lo_span01 {
      background-image: url(../assets/images/login/ewm.png);
    }
    .current .lo_span02 {
      background-image: url(../assets/images/login/pic.png);
    }
    .mar_t_40 {
      margin-top: 40px;
    }
</style>