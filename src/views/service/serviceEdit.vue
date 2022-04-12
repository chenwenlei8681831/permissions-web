<template>
  <div class="views h_bottom po_r pad_l_50 pad_r_50 b_s mr_color01">
    <bot-header :link="link"></bot-header>
    <el-form
      :model="ruleForm"
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      class="views_100ch_2 demo-ruleForm"
    >
      <div class="views_100ch_2">
        <div class="from_box">
          <div class="from_tltle">基本信息</div>
          <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
            <div class="w_100">
              <div class="w_100 flex row j_between">
                <el-form-item class="w_30" label="公司名称" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入公司名称" clearable></el-input>
                </el-form-item>
                <el-form-item class="w_30" label="信用代码" prop="code">
                  <el-input v-model="ruleForm.code" placeholder="请输入信用代码" clearable></el-input>
                </el-form-item>
                <el-form-item class="w_30" label="法定代表人" prop="legal">
                  <el-input v-model="ruleForm.legal" placeholder="请输入法定代表人" clearable></el-input>
                </el-form-item>
              </div>
              <div class="w_100 flex row j_between">
                <el-form-item class="w_30" label="企业大写" prop="short">
                  <el-input v-model="ruleForm.short" placeholder="请输入公司名称" clearable></el-input>
                </el-form-item>
                <el-form-item class="w_30" label="地址" prop="address">
                  <el-input v-model="ruleForm.address" placeholder="请输入地址" clearable></el-input>
                </el-form-item>
                <el-form-item class="w_30" label="成立日期" prop="up_at">
                  <el-date-picker
                    style="width:100%!important;"
                    value-format="yyyy-MM-dd"
                    v-model="ruleForm.up_at"
                    type="date"
                    placeholder="选择成立日期"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="w_100 flex row j_between">
                <el-form-item class="w_30" label="开户行" prop="bank">
                  <el-input v-model="ruleForm.bank" placeholder="请输入开户行" clearable></el-input>
                </el-form-item>
                <el-form-item class="w_30" label="银行卡号" prop="bank_code">
                  <el-input
                    v-model="ruleForm.bank_code"
                    placeholder="请输入银行卡号"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    maxlength="19"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item class="w_30" label="经营范围" prop="scope">
                  <el-input v-model="ruleForm.scope" placeholder="请输入经营范围" clearable></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="w_100">
              <el-form-item label="营业执照" class="w_100 mar_t_10 flex col" prop="imgUrl">
                <el-upload
                  :action="up_imgurl"
                  :limit="1"
                  list-type="picture-card"
                  :headers="{token:token}"
                  :on-preview="handlePictureCardPreview"
                  :on-success="upload"
                  :on-remove="deleteImg"
                  :file-list="img_value"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div class="po_b po_bottom bg_fff h_60px w_100">
      <submit-btn @submitForm="submitForm" @resetForm="resetForm"></submit-btn>
    </div>
  </div>
</template>

<script>
var THIS;
import botHeader from "@/views/components/bot-header/bot-header";
import submitBtn from "@/views/components/form-submit/submit-btn";
export default {
  components: {
    botHeader,
    submitBtn
  },
  name: "",
  data() {
    return {
      id: "",
      isBack: true,
      link: "/home/service/serviceOne/serviceList",
      msg: {},
      ruleForm: {
        name: "",
        code: "",
        legal: "",
        short: "",
        address: "",
        up_at: "",
        bank: "",
        bank_code: "",
        scope: "",
        imgUrl: ""
      },
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: [] }],
        code: [{ required: true, message: "请输入信用代码", trigger: [] }],
        legal: [{ required: true, message: "请输入法定代表人", trigger: [] }],
        short: [{ required: true, message: "请输入企业大写", trigger: [] }],
        address: [{ required: true, message: "请输入地址", trigger: [] }],
        up_at: [{ required: true, message: "请选择成立日期", trigger: [] }],
        bank: [{ required: true, message: "请输入开户行", trigger: [] }],
        bank_code: [{ required: true, message: "请输入银行卡号", trigger: [] }],
        scope: [{ required: true, message: "请输入经营范围", trigger: [] }],
        imgUrl: [{ required: true, message: "请上传营业执照", trigger: [] }]
      },
      up_imgurl: "",
      token: window.localStorage.flexible_manage_token,
      img_value: [],
      dialogImageUrl: "",
      dialogVisible: false //放大图片展示框
    };
  },
  methods: {
    submitForm(formName) {
      THIS.$refs[formName].validate(valid => {
        console.log("valid", valid);
        if (valid) {
          THIS.submit_from();
        } else {
          THIS.$message({
            type: "warning",
            message: "请将必填项完善后再提交",
            dangerouslyUseHTMLString: true
          });
          return false;
        }
      });
    },

    resetForm(formName) {
      THIS.$refs[formName].resetFields();
      THIS.img_value = [];
    },

    submit_from() {
      var data = {
        name: THIS.ruleForm.name,
        code: THIS.ruleForm.code,
        legal: THIS.ruleForm.legal,
        short: THIS.ruleForm.short,
        address: THIS.ruleForm.address,
        up_at: THIS.ruleForm.up_at,
        bank: THIS.ruleForm.bank,
        bank_code: THIS.ruleForm.bank_code,
        scope: THIS.ruleForm.scope,
        yy_url: THIS.ruleForm.imgUrl
      };
      var url = "";
      if (THIS.id) {
        data.id = THIS.id;
        url = "/platform/edit";
      } else {
        url = "/platform/add";
      }
      vue_Post(THIS, url, data, callback, 1, 1, 1, 1);
      function callback(msg) {
        THIS.$message({
          type: "success",
          message: THIS.id ? "编辑成功" : "创建成功",
          dangerouslyUseHTMLString: true
        });
        THIS.isBack = false;
        // let link = THIS.id
        //   ? "/home/service/serviceOne/serviceDetail/" + THIS.id
        //   : THIS.link;
        THIS.$router.go(-1);
      }
    },

    upload(event, file, fileList) {
      if (event.code == 200) {
        THIS.ruleForm.imgUrl = event.data.path[0];
      } else if (event.code == "-999") {
        //登录失败
      } else {
        THIS.$message({
          type: "error",
          message: event.msg,
          dangerouslyUseHTMLString: true
        });
      }
    },

    deleteImg(file, fileList) {
      THIS.ruleForm.imgUrl = "";
      THIS.img_value = [];
    },

    handlePictureCardPreview(file) {
      THIS.dialogImageUrl = file.url;
      THIS.dialogVisible = true;
    },

    get_detail() {
      var data = {
        id: THIS.id
      };
      vue_Post(THIS, "/platform/get", data, callback, 1, 1, 1, 0);
      function callback(msg) {
        msg = msg.info;
        THIS.ruleForm = {
          name: msg.name,
          code: msg.code,
          legal: msg.legal,
          short: msg.short,
          address: msg.address,
          up_at: msg.up_at,
          bank: msg.bank,
          bank_code: msg.bank_code,
          scope: msg.scope,
          imgUrl: msg.yy_url
        };
        if (msg.yy_url) {
          THIS.img_value = [{ url: msg.yy_url, name: "" }];
        }
      }
    }
  },
  mounted() {
    THIS = this;
    THIS.store.commit("setPageText", "服务商管理 / 创建服务商");
    THIS.up_imgurl = window.localStorage.host + "/common/upload";
    THIS.id = THIS.$route.params.id ? THIS.$route.params.id : "";
    if (THIS.id) {
      THIS.get_detail();
      THIS.link = "/home/service/serviceOne/serviceDetail/" + THIS.id;
    }
  },
  beforeDestroy() {
    THIS.store.commit("setPageText", "当前位置：服务商管理 / 服务商详情");
  },
  beforeRouteLeave(to, from, next) {
    //删除：清除缓存页面缓存  返回：缓存上一页面
    if (!THIS.isBack) {
      to.meta.keepAlive = false;
    }
    next();
  }
};
</script>

<style scoped>
</style>
