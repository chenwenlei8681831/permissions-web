<template>
  <div class="views b_s mr_color01 h_bottom">
    <div class>
      <bot-header :link="link"></bot-header>
      <div class="views_100ch_1 pad_all_30 bg_fff">
        <div class="ct_title">任务信息</div>
        <div class="flex row mar_t_30 baseInfo pad_b_20">
          <div class="flex_1 flex col">
            <div class="flex_1 flex row">
              <div class="flex_1 flex col pad_l_20">
                <div v-for="(item,index) in leftArr01" :key="index" class="font14 item">
                  <span class="span_color mar_r_20">{{item.title}}</span>
                  {{item.value}}
                </div>
              </div>
            </div>
          </div>
          <div class="flex_1 flex col">
            <div class="flex_1 flex col pad_l_20">
              <div v-for="(item,index) in rightArr01" :key="index" class="font14 item">
                <span class="span_color mar_r_20">{{item.title}}</span>
                {{item.value}}
              </div>
            </div>
          </div>
          <div class="flex col flex_1"></div>
        </div>
        <div class="ct_title">接单人基本信息</div>
        <div class="flex row mar_t_30 baseInfo pad_b_20">
          <div class="flex_1 flex col">
            <div class="flex_1 flex row">
              <div class="flex_1 flex col pad_l_20">
                <div v-for="(item,index) in leftArr02" :key="index" class="font14 item">
                  <span class="span_color mar_r_20">{{item.title}}</span>
                  {{item.value}}
                </div>
              </div>
            </div>
          </div>
          <div class="flex_1 flex col">
            <div class="flex_1 flex col pad_l_20">
              <div v-for="(item,index) in rightArr02" :key="index" class="font14 item">
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
            <div v-else class="img red"></div>
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
      link: "/home/apply/applyOne/applyList",
      leftArr01: [],
      rightArr01: [],
      leftArr02: [],
      rightArr02: [],
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
      vue_Post(THIS, "/apply/get", data, callback, 1, 1, 1, 0);
      function callback(msg) {
        //任务信息
        let task_info = msg.task_info;
        let cycle_obj = {
          1: "按单结算",
          2: "按小时结算",
          3: "按月结算",
          4: "按日结算"
        };
        let cycle = cycle_obj[task_info.cycle];
        THIS.leftArr01 = [
          { title: "任务名称:", value: task_info.name ? task_info.name : "--" },
          {
            title: "任务城市:",
            value: task_info.address ? task_info.address : "--"
          },
          {
            title: "验收标准:",
            value: task_info.standard ? task_info.standard : "--"
          },
          { title: "结算周期:", value: cycle ? cycle : "--" },
          {
            title: "合作周期:",
            value:
              task_info.cooperation_start + " ~ " + task_info.cooperation_end
          },
          {
            title: "报名周期:",
            value: task_info.report_start + " ~ " + task_info.report_end
          },
          {
            title: "发布时间:",
            value: task_info.created_at ? task_info.created_at : "--"
          }
        ];
        THIS.rightArr01 = [
          {
            title: "发包方:",
            value: task_info.m_name ? task_info.m_name : "--"
          },
          { title: "任务描述:", value: task_info.desc ? task_info.desc : "--" },
          { title: "服务费:", value: task_info.fee ? task_info.fee : "--" },
          {
            title: "服务商:",
            value: task_info.p_name ? task_info.p_name : "--"
          },
          {
            title: "需求人数:",
            value: task_info.number ? task_info.number : "0"
          },
          {
            title: "学历要求:",
            value: task_info.education_name ? task_info.education_name : "--"
          },
          { title: "", value: "" }
        ];
        //接单人基本信息
        let user_info = msg.user_info;
        THIS.leftArr02 = [
          {
            title: "姓名:",
            value: user_info.username ? user_info.username : "--"
          },
          {
            title: "性别:",
            value: user_info.sex_name ? user_info.sex_name : "--"
          },
          {
            title: "身份证号:",
            value: user_info.id_card ? user_info.id_card : "--"
          },
          {
            title: "银行卡号:",
            value: user_info.bank_code ? user_info.bank_code : "--"
          }
        ];
        THIS.rightArr02 = [
          {
            title: "手机号:",
            value: user_info.mobile ? user_info.mobile : "--"
          },
          {
            title: "出生日期:",
            value: user_info.birthday ? user_info.birthday : "--"
          },
          {
            title: "户籍地址:",
            value: user_info.address ? user_info.address : "--"
          },
          { title: "开户银行:", value: user_info.bank ? user_info.bank : "--" }
        ];
        //照片信息
        THIS.bank_img = user_info.bank_img;
        THIS.id_card_zm = user_info.id_card_zm;
        THIS.id_card_fm = user_info.id_card_fm;
      }
    }
  },
  mounted() {
    THIS = this;
    THIS.store.commit("setPageText", "当前位置：报名管理 / 报名详情");
    THIS.id = THIS.$route.params.id;
    THIS.get_detail();
  },
  beforeDestroy() {
    THIS.store.commit("setPageText", "当前位置：报名管理 / 报名列表");
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
