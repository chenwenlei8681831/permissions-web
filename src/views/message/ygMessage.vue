<template>
  <div class="views b_s mr_color01 h_bottom">
    <div class="bg_fff">
      <bot-header></bot-header>
      <div class="views_100ch_1">
        <!--顶部数据-->
        <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">员工动态列表（{{total}}）</div>
        <!--输入框、下拉筛选-->
        <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
          <div class="flex_1 b_s h_100 flex row">
            <span class="font12">员工姓名：</span>
            <el-input class="flex_1 inp" v-model="keyword" placeholder="请输入员工姓名" clearable></el-input>
            <div class="clearfix"></div>
          </div>
          <div class="flex_1 b_s h_100 mar_l_30">
            <span
              @click="sub(1)"
              class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff"
              style="line-height:30px"
            >查询</span>
            <span
              @click="sub(2)"
              class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff"
              style="line-height:30px"
            >重置</span>
            <div class="clearfix"></div>
          </div>
          <div class="flex_1 b_s h_100 mar_l_30"></div>
          <div class="flex_1 b_s h_100 mar_l_30"></div>
        </div>
        <!--列表-->
        <div class="list">
          <ol class="list_header list_bg">
            <li class="h_50px pad_l_20 b_s f_l" style="width:10%">ID</li>
            <li class="h_50px pad_l_20 b_s f_l">员工姓名</li>
            <li class="h_50px pad_l_20 b_s f_l">消息详情</li>
            <li class="h_50px pad_l_20 b_s f_l">推送时间</li>
            <div class="clearfix"></div>
          </ol>
          <ul class="list_main">
            <li v-for="(item,index) in list" :key="index">
              <ol :class="index%2==1?'list_bg':''">
                <li class="f_l pad_l_20 b_s" style="width:10%">{{item.id}}</li>
                <li
                  class="f_l pad_l_20 b_s"
                  :title="item.username?item.username:'--'"
                >{{item.username?item.username:'--'}}</li>
                <li
                  class="f_l pad_l_20 b_s"
                  :title="item.title?item.title:'--'"
                >{{item.title?item.title:'--'}}</li>
                <li
                  class="f_l pad_l_20 b_s"
                  :title="item.createat?item.createat:'--'"
                >{{item.createat?item.createat:'--'}}</li>
                <div class="clearfix"></div>
              </ol>
            </li>
          </ul>
          <!--分页-->
          <div class="page_footer b_s w_100 h_60px">
            <el-pagination
              class="f_r"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="count"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import botHeader from "@/views/components/bot-header/bot-header";
export default {
  components: {
    botHeader
  },
  name: "companyList",
  data() {
    return {
      id: "",
      page: 1,
      count: 10,
      total: 0,
      keyword: "",
      list: []
    };
  },
  methods: {
    sub(type) {
      this.page = 1;
      if (type == 2) {
        this.keyword = "";
      }
      this.getList();
    },

    getList() {
      var THIS = this;
      var data = sign({
        page: THIS.page,
        count: THIS.count,
        keyword: THIS.keyword
      });
      vue_Post(THIS, "msg/msgListWithFlow", data, callback, 1, 1, 1, 1);
      function callback(msg) {
        THIS.total = msg.total;
        THIS.list = msg.list;
        for (let i = 0; i < THIS.list.length; i++) {
          var aa = THIS.list[i].addtime;
          THIS.list[i].createat = aa ? aa : "--";
        }
      }
    },

    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },

    handleSizeChange(val) {
      this.count = val;
      this.page = 1;
      this.getList();
    }
  },
  mounted() {
    THIS.store.commit("setPageText", "当前位置：消息 / 员工动态");
    this.getList();
  }
};
</script>

<style scoped>
.list_header li,
.list_main ol li {
  width: 30%;
}
.header_item {
  line-height: 60px;
  color: #262626;
}
</style>
