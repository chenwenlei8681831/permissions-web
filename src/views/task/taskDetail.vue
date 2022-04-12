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

        <!--接单人列表-->
        <div class="ct_title mar_t_30">接单人信息</div>
        <div class="flex col mar_t_30">
          <ol class="w_100 row flex h_50px line_50px li_bg">
            <li class="flex_1 pad_l_30">接单人姓名</li>
            <li class="flex_1 pad_l_30">身份证号</li>
            <li class="flex_1 pad_l_30">手机号</li>
            <li class="flex_1 pad_l_30">接单时间</li>
          </ol>
          <ul class="w_100">
            <li class="w_100">
              <ol
                class="co03 row flex h_50px line_50px list_item"
                :class="index%2==1?'li_bg':''"
                v-for="(item,index) in ordersArr"
                :key="index"
              >
                <li class="font14 flex_1 pad_l_30">{{item.username?item.username:'--'}}</li>
                <li class="font14 flex_1 pad_l_30">{{item.id_card?item.id_card:'--'}}</li>
                <li class="font14 flex_1 pad_l_30">{{item.mobile?item.mobile:'--'}}</li>
                <li class="font14 flex_1 pad_l_30">{{item.created_at?item.created_at:'--'}}</li>
              </ol>
            </li>
          </ul>
        </div>
        <p
          class="font14 text_center list_co0"
          style="line-height:50px"
          v-if="ordersArr.length==0"
        >暂无数据</p>
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
      link: "/home/task/taskOne/taskList",
      leftArr: [],
      rightArr: [],
      ordersArr: []
    };
  },
  methods: {
    get_detail() {
      var data = {
        id: THIS.id
      };
      vue_Post(THIS, "/task/get", data, callback, 1, 1, 1, 0);
      function callback(msg) {
        let list = msg.list;
        msg = msg.info;
        let cycle = {
          1: "按单结算",
          2: "按小时结算",
          3: "按月结算",
          4: "按日结算"
        };
        let education = {
          1: "小学",
          2: "初中",
          3: "高中",
          4: "大学",
          5: "研究生",
          6: "博士"
        };
        THIS.leftArr = [
          { title: "任务名称 :", value: msg.name },
          { title: "任务城市 :", value: msg.address },
          { title: "验收标准 :", value: msg.standard },
          { title: "结算周期 :", value: cycle[msg.cycle] },
          {
            title: "合作周期 :",
            value: msg.cooperation_start + " ~ " + msg.cooperation_end
          },
          {
            title: "报名周期 :",
            value: msg.report_start + " ~ " + msg.report_end
          },
          { title: "发布时间 :", value: msg.created_at }
        ];
        THIS.rightArr = [
          { title: "发包方 :", value: msg.m_name },
          { title: "任务描述 :", value: msg.desc },
          { title: "服务费 :", value: msg.fee },
          { title: "平台公司 :", value: msg.p_name },
          { title: "需求人数 :", value: msg.number },
          { title: "学历要求 :", value: education[msg.education] },
          { title: "", value: "" }
        ];
        THIS.ordersArr = list;
      }
    },

    edit(id) {
      THIS.$router.replace("/home/service/serviceOne/serviceEdit/" + id);
    }
  },
  mounted() {
    THIS = this;
    THIS.store.commit("setPageText", "任务管理 / 任务详情");
    THIS.id = THIS.$route.params.id;
    THIS.get_detail();
  },
  beforeDestroy() {
    THIS.store.commit("setPageText", "当前位置： 任务管理 / 任务列表");
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
.li_bg {
  background: rgba(250, 250, 250, 1);
}
</style>
