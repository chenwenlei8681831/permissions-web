<template>
  <div class="views b_s mr_color01 h_bottom">
    <div class="bg_fff">
      <bot-header></bot-header>
      <div class="views_100ch_1">
        <tab-car @selete="selete" :seleteArr="seleteArr" :seleteIndex="seleteIndex"></tab-car>
        <div class="w_100 header_item h_60px b_s pad_r_30 pad_l_30 flex row">
          <div class="w_25 b_s h_100 flex row">
            <span class="font12">任务名称：</span>
            <el-input class="flex_1 inp" v-model="keyword" placeholder="请输入任务名称" clearable></el-input>
            <div class="clearfix"></div>
          </div>
          <div v-show="userType==1" class="w_25 b_s h_100 flex row mar_l_30">
            <span class="font12">商户筛选：</span>
            <el-select class="flex_1" v-model="service" filterable clearable placeholder="请选择商户">
              <el-option
                v-for="(item,index) in serviceArr"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="w_25 flex row b_s h_100 mar_l_30">
            <span class="font12">接单时间：</span>
            <el-date-picker
              class="flex_1"
              v-model="timer"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div class="clearfix"></div>
          </div>
          <div class="w_25 b_s h_100 mar_l_30">
            <span
              @click="sub(1)"
              class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff"
              style="line-height:30px"
            >查询</span>
            <span
              @click="sub(2)"
              class="mar_l_30 f_l font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff"
              style="line-height:30px"
            >重置</span>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="list">
          <ol class="list_header flex row">
            <li class="h_50px pad_l_20 b_s" style="width:5%">ID</li>
            <li class="h_50px pad_l_20 b_s flex_1">任务名称</li>
            <li class="h_50px pad_l_20 b_s flex_1">发包方</li>
            <li class="h_50px pad_l_20 b_s flex_1">任务城市</li>
            <li class="h_50px pad_l_20 b_s flex_1">接单人</li>
            <li class="h_50px pad_l_20 b_s flex_1">手机号</li>
            <li class="h_50px pad_l_20 b_s flex_2">接单时间</li>
            <li class="h_50px pad_l_20 b_s" style="width:16%">操作</li>
          </ol>
          <ul class="list_main">
            <li v-for="(item,index) in list" :key="index">
              <ol @click.stop="view(1,item)" class="flex row" :class="index%2==1?'list_bg':''">
                <li class="pad_l_20 b_s" style="width:5%">{{item.id}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.task_name?item.task_name:'--'"
                >{{item.task_name?item.task_name:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.m_name?item.m_name:'--'"
                >{{item.m_name?item.m_name:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.address?item.address:'--'"
                >{{item.address?item.address:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.username?item.username:'--'"
                >{{item.username?item.username:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.mobile?item.mobile:'--'"
                >{{item.mobile?item.mobile:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_2"
                  :title="item.created_at?item.created_at:'--'"
                >{{item.created_at?item.created_at:'--'}}</li>
                <li class="pad_l_20 b_s flex row" style="width:16%">
                  <span
                    v-show="seleteIndex!=2"
                    class="edit_button flex_1"
                    @click.stop="view(1,item)"
                  >查看</span>
                  <span
                    v-show="seleteIndex==0"
                    class="edit_button flex_1"
                    @click.stop="view(2,item)"
                  >通过</span>
                  <span
                    v-show="seleteIndex==0"
                    class="edit_button flex_1 col01"
                    @click.stop="view(3,item)"
                  >不通过</span>
                  <span
                    v-show="seleteIndex==1&&item.status==1"
                    class="edit_button flex_1"
                    @click.stop="view(4,item)"
                  >签约</span>
                  <span v-show="seleteIndex==1&&item.status==3" class="edit_button flex_1 col02">已签约</span>
                  <span
                    v-show="seleteIndex==2"
                    class="edit_button flex_2"
                    @click.stop="view(5,item)"
                  >查看原因</span>
                  <span v-show="seleteIndex==1" class="edit_button flex_1"></span>
                </li>
              </ol>
            </li>
          </ul>
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
    <el-dialog title="不通过理由" :before-close="close" :visible.sync="show_flag" width="440px">
      <div class="content alert_gj">
        <el-form ref="ruleForm" label-width="60px" :model="ruleForm" :rules="rules">
          <div class="flex col">
            <el-form-item class="w_100" label="理由" prop="reason">
              <el-input type="textarea" v-model="ruleForm.reason" placeholder="请输入不通过理由"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="w_100 dialog-footer">
        <el-button @click="gj_btnClikc(1)">取 消</el-button>
        <el-button @click="gj_btnClikc(2)" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
var THIS;
import botHeader from "@/views/components/bot-header/bot-header";
import downLoad from "@/views/components/list/down-load.vue";
import tabCar from "@/views/components/list/tab-car.vue";
export default {
  components: {
    botHeader,
    tabCar,
    downLoad
  },
  name: "serviceList",
  data() {
    return {
      id: "",
      userType: "",
      page: 1,
      count: 10,
      total: 0,
      currentPage: 0,
      list: [],
      keyword: "",
      timer: "",
      seleteIndex: 0,
      seleteArr: [
        { name: "待审核", number: "0", type: 0 },
        { name: "已通过", number: "0", type: 1 },
        { name: "未通过", number: "0", type: 2 }
      ],
      ruleForm: {
        reason: ""
      },
      rules: {
        reason: [{ required: true, message: "请输入不通过理由", trigger: [] }]
      },
      show_flag: false,
      service: "",
      serviceArr: []
    };
  },
  methods: {
    get_service() {
      var data = sign({
        page: 1,
        size: 9999
      });
      vue_Post(THIS, "/merchant/list", data, callback, 0, 0, 0, 0);
      function callback(msg) {
        THIS.serviceArr = msg.list.map(item => {
          return { name: item.m_name, id: item.id };
        });
      }
    },

    selete(index) {
      THIS.seleteIndex = index;
      THIS.list = [];
      THIS.page = 1;
      THIS.getList();
    },

    view(type, item) {
      THIS.id = item.id;
      if (type == 1) {
        THIS.$router.replace("/home/apply/applyOne/applyDetail/" + item.id);
      } else if (type == 2) {
        THIS.$confirm("确定通过吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            THIS.applyFunc(item.id, 1);
          })
          .catch(() => {});
      } else if (type == 3) {
        THIS.show_flag = true;
      } else if (type == 4) {
        THIS.$confirm("确定签约吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            THIS.applyFunc(item.id, 3);
          })
          .catch(() => {});
      } else if (type == 5) {
        THIS.open_reason(item.content);
      }
    },

    applyFunc(id, type) {
      var data = sign({
        id: id,
        status: type,
        content: type == 1 ? "" : THIS.ruleForm.reason
      });
      vue_Post(THIS, "/apply/check", data, callback, 1, 1, 1, 1);
      function callback(msg) {
        THIS.getList();
        THIS.$message({
          type: "success",
          message: "操作成功!",
          dangerouslyUseHTMLString: true
        });
        if (type == 2) {
          THIS.close();
        }
      }
    },

    sub(type) {
      THIS.page = 1;
      if (type == 2) {
        THIS.keyword = "";
        THIS.timer = "";
        THIS.service = "";
      }
      THIS.getList();
    },

    getList() {
      var date_start = "";
      var date_end = "";
      if (THIS.timer) {
        date_start = THIS.timer[0];
        date_end = THIS.timer[1];
      }
      var data = sign({
        page: THIS.page,
        size: THIS.count,
        name: THIS.keyword,
        status: THIS.seleteIndex,
        date_start: date_start,
        date_end: date_end,
        mid: THIS.service
      });
      vue_Post(THIS, "/apply/list", data, callback, 1, 1, 1, 1);
      function callback(msg) {
        THIS.total = msg.count;
        THIS.list = msg.list;
        THIS.seleteArr[0].number = msg.num0;
        THIS.seleteArr[1].number = msg.num1;
        THIS.seleteArr[2].number = msg.num2;
      }
    },

    handleCurrentChange(val) {
      THIS.page = val;
      THIS.getList();
    },

    handleSizeChange(val) {
      THIS.count = val;
      THIS.page = 1;
      THIS.getList();
    },

    gj_btnClikc(type) {
      if (type == 1) {
        THIS.show_flag = false;
        THIS.ruleForm = { reason: "" };
        THIS.$refs["ruleForm"].resetFields();
      } else if (type == 2) {
        THIS.$refs["ruleForm"].validate(valid => {
          if (valid) {
            THIS.applyFunc(THIS.id, 2);
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

    close() {
      THIS.show_flag = false;
      THIS.ruleForm = { reason: "" };
      THIS.$refs["ruleForm"].resetFields();
    },

    open_reason(reason) {
      THIS.$alert(reason, {
        title: "",
        showConfirmButton: false
      });
    }
  },
  mounted() {
    THIS = this;
    THIS.store.commit("setPageText", "当前位置：报名管理 / 报名列表");
    THIS.getList();
    THIS.get_service();
    THIS.userType = window.localStorage.userType;
  }
};
</script>

<style scoped>
</style>
