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
        <div v-for="(item,index) in imgArr" :key="index">
          <div v-if="item.img.length>0" class="ct_title mar_t_30 col04">{{item.title}}</div>
          <div class="flex row mar_t_30">
            <div class="img_box" v-for="(v_item,v_index) in item.img" :key="v_index">
              <el-image class="img" :preview-src-list="[v_item]" :src="v_item"></el-image>
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
      link: "/home/cost/costOne/costList",
      leftArr: [],
      rightArr: [],
      imgArr: [
        { title: "回单图片", img: [] },
        { title: "发票图片", img: [] },
        { title: "个税完税凭证", img: [] }
      ]
    };
  },
  methods: {
    get_detail() {
      var data = {
        id: THIS.id
      };
      vue_Post(THIS, "/cost/get", data, callback, 1, 1, 1, 0);
      function callback(msg) {
        msg = msg.info;
        THIS.leftArr = [
          { title: "姓名:", value: msg.name ? msg.name : "--" },
          { title: "证件号:", value: msg.id_card ? msg.id_card : "--" },
          { title: "任务名称:", value: msg.task_name ? msg.task_name : "--" },
          { title: "单价:", value: msg.price ? msg.price : "--" },
          { title: "个税申报:", value: msg.tax ? msg.tax : "--" },
          { title: "结算月份:", value: msg.month ? msg.month : "--" },
          { title: "上传时间:", value: msg.created_at ? msg.created_at : "--" }
        ];
        THIS.rightArr = [
          { title: "手机号:", value: msg.mobile ? msg.mobile : "--" },
          { title: "银行卡号:", value: msg.bank_code ? msg.bank_code : "--" },
          { title: "类别:", value: msg.type ? msg.type : "--" },
          { title: "最终费用:", value: msg.cost ? msg.cost : "--" },
          { title: "需求人数:", value: msg.num ? msg.num : "--" },
          { title: "结算周期:", value: msg.cycle_date ? msg.cycle_date : "--" },
          { title: "", value: "" }
        ];
        //回单图片、发票图片、个税凭证图片
        THIS.imgArr[0].img = msg.receipt;
        THIS.imgArr[1].img = msg.invoice;
        THIS.imgArr[2].img = msg.credentials;
      }
    }
  },
  mounted() {
    THIS = this;
    THIS.store.commit("setPageText", "服务费管理 / 费用明细详情");
    THIS.id = THIS.$route.params.id;
    THIS.get_detail();
  },
  beforeDestroy() {
    THIS.store.commit("setPageText", "当前位置：服务费管理 / 费用明细");
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
