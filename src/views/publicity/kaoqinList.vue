<template>
  <div class="views b_s mr_color01 h_bottom">
    <div class="bg_fff">
      <bot-header></bot-header>
      <div class="views_100ch_1">
        <!--输入框、下拉筛选-->
        <div class="flex row header_item h_60px b_s pad_r_30 pad_l_30">
          <div class="flex_1 w_25 flex row b_s h_100">
            <span class="font12">选择年份：</span>
            <el-date-picker
              class="flex_1"
              v-model="year"
              size="mini"
              value-format="yyyy"
              placeholder="选择年份"
              type="year"
            ></el-date-picker>
          </div>
          <div class="h_100 mar_l_30">
            <el-button type="primary" size="mini" @click="sub(1)">查询</el-button>
            <el-button size="mini" @click="sub(2)">重置</el-button>
          </div>
          <div class="flex_1 w_25"></div>
          <div class="flex_1 w_25"></div>
        </div>
        <!--下载、上传-->
        <div class="w_100 header_item h_60px b_s font14">
          <span
            v-if="false"
            @click="dowm_load"
            class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line"
          >下载考勤表</span>
          <span
            @click="up_load"
            class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line"
          >上传考勤表</span>
          <div class="clearfix"></div>
        </div>
        <el-table
          :data="list"
          style="width: 100%"
          height="544"
          stripe
          :header-cell-style="{background:'#f5f5f5'}"
        >
          <el-table-column prop="name" label="商户名称" min-width="100">
            <template v-slot="{row}">{{row.name ? row.name: '--'}}</template>
          </el-table-column>
          <el-table-column prop="1" label="1月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[1]?'':'col03'"
                @click="download(row[1])"
              >{{row[1]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="2" label="2月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[2]?'':'col03'"
                @click="download(row[2])"
              >{{row[2]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="3" label="3月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[3]?'':'col03'"
                @click="download(row[3])"
              >{{row[3]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="4" label="4月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[4]?'':'col03'"
                @click="download(row[4])"
              >{{row[4]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="5" label="5月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[5]?'':'col03'"
                @click="download(row[5])"
              >{{row[5]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="6" label="6月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[6]?'':'col03'"
                @click="download(row[6])"
              >{{row[6]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="7" label="7月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[7]?'':'col03'"
                @click="download(row[7])"
              >{{row[7]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="8" label="8月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[8]?'':'col03'"
                @click="download(row[8])"
              >{{row[8]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="9" label="9月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[9]?'':'col03'"
                @click="download(row[9])"
              >{{row[9]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="10" label="10月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[10]?'':'col03'"
                @click="download(row[10])"
              >{{row[10]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="11" label="11月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[11]?'':'col03'"
                @click="download(row[11])"
              >{{row[11]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="12" label="12月份" min-width="80">
            <template v-slot="{row}">
              <el-button
                type="text"
                :class="row[12]?'':'col03'"
                @click="download(row[12])"
              >{{row[12]?'下载':'未上传'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        </div>
      </div>
    </div>
    <!--上传模板-->
    <el-dialog
      title="上传考勤表(支持:.xls,.xlsx格式文件)"
      :before-close="v_close"
      :visible.sync="show_flag"
      :closeOnClickModal="false"
      width="400px"
    >
      <div class="flex_1 w_100 flex col b_s h_100 mar_b_20">
        <p class="mar_b_10 font14">
          <span style="color:red;">*</span>请选择考勤表时间
        </p>
        <el-date-picker
          style="width:100%"
          v-model="month"
          value-format="yyyy-MM"
          placeholder="选择年月"
          type="month"
        ></el-date-picker>
      </div>
      <div v-if="userType==1" class="flex_1 w_100 flex col b_s h_100 mar_b_30">
        <p class="mar_b_10 font14">
          <span style="color:red;">*</span>请选择商户
        </p>
        <el-select class="flex_1" v-model="service" filterable clearable placeholder="请选择商户">
          <el-option
            v-for="(item,index) in serviceArr"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <el-upload
        class="upload-demo"
        accept=".xls, .xlsx"
        :headers="{token:token}"
        :action="commonhost+'/common/upload'"
        :on-success="upSuccess"
        :on-error="upError"
        :file-list="fileList"
        :limit="1"
        name="file"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button>
      </el-upload>
    </el-dialog>
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
      userType: "",
      seleteIndex: 0,
      commonhost: window.localStorage.host,
      up_host: window.localStorage.host,
      token: window.localStorage.flexible_manage_token,
      month: "",
      page: 1,
      count: 10,
      total: 0,
      list: [],
      year: "",
      fileList: [],
      show_flag: false,
      path: "",
      service: "",
      serviceArr: []
    };
  },
  methods: {
    sub(type) {
      THIS.page = 1;
      if (type == 2) {
        THIS.year = "";
      }
      THIS.getList();
    },

    getList() {
      var data = {
        token: window.localStorage.rl_company_token,
        page: THIS.page,
        count: THIS.count
      };
      if (THIS.year) {
        data.year = THIS.year;
      }
      vue_Post(THIS, "/attendance/list", data, callback, 0, 0, 0, 0);
      function callback(msg) {
        THIS.list = msg.list;
        THIS.total = msg.count;
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
    },

    download(link) {
      if (link) {
        window.location.href = link;
      }
    },

    up_load() {
      THIS.show_flag = true;
    },

    //下载模板
    dowm_load() {
      var bb =
        window.localStorage.host +
        "Report.TemplateDown&token=" +
        window.localStorage.rl_company_token +
        "&type=1" +
        "&sign=" +
        sign({}).sign +
        "&timestamp=" +
        sign({}).timestamp;
      window.location.href = bb;
    },

    close02() {
      THIS.month = "";
      THIS.fileList = [];
      THIS.show_flag = false;
    },

    submitUpload() {
      if (!THIS.month) {
        THIS.$message({
          type: "error",
          message: "请先选择日期!",
          dangerouslyUseHTMLString: true
        });
        return false;
      }
      if (!THIS.service && THIS.userType == 1) {
        THIS.$message({
          type: "error",
          message: "请先选择服务商!",
          dangerouslyUseHTMLString: true
        });
        return false;
      }
      THIS.submitFunc();
    },

    submitFunc() {
      var data = sign({
        date: THIS.month,
        file_url: THIS.path,
        mid: THIS.service
      });
      vue_Post(THIS, "/attendance/add", data, callback, 1, 1, 1, 0);
      function callback(msg) {
        THIS.v_close();
        THIS.getList();
      }
    },

    v_close() {
      THIS.month = "";
      THIS.fileList = [];
      THIS.show_flag = false;
      THIS.path = "";
      THIS.service = "";
    },

    upSuccess(event, file, fileList) {
      if (file.response.code == 200) {
        THIS.path = file.response.data.path[0];
      } else {
        THIS.upError();
      }
    },

    upError(msg) {
      THIS.$message({
        type: "error",
        message: "上传失败!",
        dangerouslyUseHTMLString: true
      });
      THIS.fileList = [];
    },

    up_serve(path) {
      var year = THIS.month ? THIS.month.split("-")[0] : "";
      var month = THIS.month ? THIS.month.split("-")[1] : "";
      var data = sign({
        token: window.localStorage.rl_company_token
          ? window.localStorage.rl_company_token
          : "",
        year: year,
        month: month,
        type: 1,
        path: path
      });
      vue_Post(THIS, "Report.Add", data, callback, 0, 0, 0, 0);
      function callback(msg) {
        THIS.close02();
        THIS.getList();
      }
    },

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
    }
  },
  mounted() {
    THIS = this;
    THIS.data = sign({
      token: window.localStorage.rl_company_token
        ? window.localStorage.rl_company_token
        : ""
    });
    THIS.userType = window.localStorage.userType;
    THIS.year = new Date().getFullYear().toString();
    THIS.store.commit("setPageText", "当前位置：公示 / 考勤表公示");
    THIS.getList();
    THIS.get_service();
  }
};
</script>

<style scoped>
.list_header,
.list_main ol,
.list_main > li {
  height: 70px;
}
.el-input__inner {
  padding-left: 15px !important;
}
.v_title {
  height: 40px;
  line-height: 40px;
}
.h_70px {
  height: 70px;
  line-height: 70px;
}
</style>
