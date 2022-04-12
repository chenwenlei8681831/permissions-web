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
                  <span class="span_color">{{item.title}}：</span>
                  {{item.value}}
                </div>
              </div>
            </div>
          </div>
          <div class="flex_1 flex col">
            <div class="flex_1 flex col pad_l_20">
              <div v-for="(item,index) in rightArr" :key="index" class="font14 item">
                <div v-if="item.type==1">
                  <span class="span_color">{{item.title}}：</span>
                  {{item.value}}
                </div>
                <div v-if="item.type==2" class="flex a_start">
                  <span class="span_color">{{item.title}}：</span>
                  <el-image class="img" :preview-src-list="[item.value]" :src="item.value"></el-image>
                </div>
              </div>
            </div>
          </div>
          <div v-show="userType==1" class="flex col flex_1">
            <div class="top h_40px flex row j_end">
              <span class="d_block base_btn base_btn_co01 pointer" @click="edit(id)">编辑</span>
            </div>
          </div>
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
      userType: 2,
      link: "/home/service/serviceOne/serviceList",
      leftArr: [],
      rightArr: []
    };
  },
  methods: {
    get_detail() {
      var data = {
        id: THIS.id
      };
      vue_Post(THIS, "/platform/get", data, callback, 1, 1, 1, 0);
      function callback(msg) {
        msg = msg.info;
        THIS.leftArr = [
          { title: "公司名称", value: msg.name, type: 1 },
          { title: "法定代表人", value: msg.legal, type: 1 },
          { title: "地址", value: msg.address, type: 1 },
          { title: "开户行", value: msg.bank, type: 1 },
          { title: "经营范围", value: msg.scope, type: 1 }
        ];
        THIS.rightArr = [
          { title: "信用代码", value: msg.code, type: 1 },
          { title: "企业大写", value: msg.short, type: 1 },
          { title: "成立日期", value: msg.up_at, type: 1 },
          { title: "银行卡号", value: msg.bank_code, type: 1 },
          { title: "营业执照", value: msg.yy_url, type: 2 }
        ];
      }
    },

    edit(id) {
      THIS.$router.push("/home/service/serviceOne/serviceEdit/" + id);
    }
  },
  mounted() {
    THIS = this;
    THIS.userType = window.localStorage.userType;
    THIS.store.commit("setPageText", "服务商管理 / 服务商详情");
    THIS.id = THIS.$route.params.id;
    THIS.get_detail();
  },
  beforeDestroy() {
    THIS.store.commit("setPageText", "当前位置：服务商管理 / 服务商详情");
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
</style>
