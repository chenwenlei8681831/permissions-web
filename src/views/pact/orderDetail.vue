<template>
  <div class="views b_s mr_color01 h_bottom">
    <div class>
      <bot-header :link="link"></bot-header>
      <div class="views_100ch_1 pad_all_30 bg_fff">
        <div class="ct_title">基本信息</div>
        <div class="flex row mar_t_30 baseInfo pad_b_20">
          <div class="flex_1 flex col">
            <div class="flex_1 flex row">
              <div class="flex_1 flex col pad_l_20">
                <div v-for="(item,index) in leftArr" :key="index" class="font14 item">
                  <span class="span_color mar_r_20">{{item.title}}</span>
                  {{item.value}}
                </div>
              </div>
            </div>
          </div>
          <div class="flex_1 flex col">
            <div class="flex_1 flex col pad_l_20">
              <div v-for="(item,index) in rightArr" :key="index" class="font14 item">
                <span class="span_color mar_r_20">{{item.title}}</span>
                {{item.value}}
              </div>
            </div>
          </div>
          <div class="flex col flex_1"></div>
        </div>
        <div class="ct_title">图片信息</div>
        <div class="flex row mar_t_30">
          <div class="img_box">
            <el-image
              class="img"
              v-if="id_card_zm"
              :preview-src-list="[id_card_zm]"
              :src="id_card_zm"
            ></el-image>
            <div v-else class="img"></div>
            <p class="flex flex_1 a_center j_center mar_t_20 font14">身份证正面</p>
          </div>
          <div class="img_box">
            <el-image
              class="img"
              v-if="id_card_fm"
              :preview-src-list="[id_card_fm]"
              :src="id_card_fm"
            ></el-image>
            <div v-else class="img red"></div>
            <p class="flex flex_1 a_center j_center mar_t_20 font14">身份证反面</p>
          </div>
          <div class="img_box">
            <el-image class="img" v-if="bank_img" :preview-src-list="[bank_img]" :src="bank_img"></el-image>
            <div v-else class="img red"></div>
            <p class="flex flex_1 a_center j_center mar_t_20 font14">银行卡图片</p>
          </div>
          <!-- <div class='img_box'>
                                <el-image class="img" v-if="social_img" :preview-src-list="[social_img]" :src="social_img"></el-image>
                                <div v-else class="img red"></div>
                                <p class='flex flex_1 a_center j_center mar_t_20 font14'>社保图片</p>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var THIS;
import botHeader from "@/views/components/bot-header/bot-header";
export default {
  components: {
    botHeader
  },
  name: "",
  data() {
    return {
      id: "",
      link: "/home/pact/pactTwo/orderList",
      leftArr: [],
      rightArr: [],
      bank_img: "",
      id_card_fm: "",
      id_card_zm: ""
    };
  },
  methods: {
    get_detail() {
      var data = {
        id: THIS.id
      };
      vue_Post(THIS, "/user/get", data, callback, 1, 1, 1, 0);
      function callback(msg) {
        msg = msg.info;
        THIS.leftArr = [
          { title: "姓名:", value: msg.username ? msg.username : "--" },
          { title: "性别:", value: msg.sex == 1 ? "男" : "女" },
          { title: "身份证号:", value: msg.id_card ? msg.id_card : "--" },
          { title: "银行卡号:", value: msg.bank_code ? msg.bank_code : "--" }
        ];
        THIS.rightArr = [
          { title: "手机号:", value: msg.mobile ? msg.mobile : "--" },
          { title: "出生日期:", value: msg.created_at ? msg.created_at : "--" },
          { title: "户籍地址:", value: msg.address ? msg.address : "--" },
          { title: "开户银行:", value: msg.bank ? msg.bank : "--" }
        ];
        THIS.bank_img = msg.bank_img;
        THIS.id_card_zm = msg.id_card_zm;
        THIS.id_card_fm = msg.id_card_fm;
      }
    }
  },
  mounted() {
    THIS = this;
    THIS.store.commit("setPageText", "合同管理 / 接单人合同详情");
    THIS.id = THIS.$route.params.id;
    THIS.get_detail();
  },
  beforeDestroy() {
    THIS.store.commit("setPageText", "当前位置：合同管理 / 接单人合同");
  }
};
</script>

<style scoped>
.img {
  width: 1rem;
  height: 1rem;
  border-radius: 2px;
}
.item {
  min-height: 40px;
}
.img_box {
  width: 120px;
  height: 160px;
  margin-right: 20px;
}
.img {
  width: 120px;
  height: 120px;
}
.red {
  border-color: #ccc;
  background: #ccc;
}
</style>
