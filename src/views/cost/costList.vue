<template>
  <div class="views b_s mr_color01 h_bottom">
    <div class="bg_fff">
      <bot-header></bot-header>
      <div class="views_100ch_1">
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
            <span class="font12">结算月份：</span>
            <el-date-picker
              class="flex_1"
              v-model="timer"
              value-format="yyyy-MM"
              placeholder="选择结算月份"
              type="month"
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
        <div class="w_100 header_item h_60px b_s font14 flex row">
          <span @click="download_demo" class="b_s pad_r_20 pad_l_20 pointer bg_blue co_fff">下载样表</span>
          <span @click="upload" class="b_s pad_r_20 pad_l_20 pointer bg_blue co_fff mar_l_20">上传结算表</span>
          <span
            @click="dao_choose"
            class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer mar_l_20"
          >全部导出</span>
        </div>
        <div class="list">
          <ol class="list_header flex row">
            <li class="h_50px pad_l_20 b_s" style="width:5%">ID</li>
            <li class="h_50px pad_l_20 b_s flex_1">姓名</li>
            <li class="h_50px pad_l_20 b_s flex_1">手机号</li>
            <li class="h_50px pad_l_20 b_s flex_1">证件号</li>
            <li class="h_50px pad_l_20 b_s flex_1">银行卡号</li>
            <li class="h_50px pad_l_20 b_s flex_1">任务名称</li>
            <li class="h_50px pad_l_20 b_s flex_1">单价</li>
            <li class="h_50px pad_l_20 b_s flex_1">最终费用</li>
            <li class="h_50px pad_l_20 b_s flex_1">个税申报</li>
            <li class="h_50px pad_l_20 b_s flex_1">结算月份</li>
            <li class="h_50px pad_l_20 b_s" style="width:13%">操作</li>
          </ol>
          <ul class="list_main">
            <li @click.stop="view(1,item)" v-for="(item,index) in list" :key="index">
              <ol class="flex row" :class="index%2==1?'list_bg':''">
                <li class="pad_l_20 b_s" style="width:5%">{{item.id}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.name?item.name:'--'"
                >{{item.name?item.name:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.mobile?item.mobile:'--'"
                >{{item.mobile?item.mobile:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.id_card?item.id_card:'--'"
                >{{item.id_card?item.id_card:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.bank_code?item.bank_code:'--'"
                >{{item.bank_code?item.bank_code:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.task_name?item.task_name:'--'"
                >{{item.task_name?item.task_name:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.price?item.price:'--'"
                >{{item.price?item.price:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.cost?item.cost:'--'"
                >{{item.cost?item.cost:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.tax?item.tax:'--'"
                >{{item.tax?item.tax:'--'}}</li>
                <li
                  class="h_50px pad_l_20 b_s flex_1"
                  :title="item.month?item.month:'--'"
                >{{item.month?item.month:'--'}}</li>
                <li class="pad_l_20 b_s flex row" style="width:13%">
                  <span class="edit_button flex_1" @click.stop="view(1,item)">查看</span>
                  <span class="edit_button flex_1" @click.stop="view(2,item)">上传图片</span>
                  <span class="edit_button flex_1"></span>
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
    <el-dialog
      title="上传结算表"
      :before-close="close"
      :visible.sync="show_flag"
      :closeOnClickModal="false"
      width="400px"
    >
      <div class="flex_1 w_100 flex col b_s h_100 mar_b_20">
        <p class="mar_b_10 font14">
          <span style="color:red;">*</span>请选择结算表时间
        </p>
        <el-date-picker
          style="width: 100%;"
          v-model="timer"
          value-format="yyyy-MM"
          type="month"
          placeholder="结算表时间"
        ></el-date-picker>
      </div>
      <div v-if="userType==1" class="flex_1 w_100 flex col b_s h_100 mar_b_20">
        <p class="mar_b_10 font14">
          <span style="color:red;">*</span>请选择商户
        </p>
        <el-select class="flex_1" v-model="up_service" filterable clearable placeholder="请选择商户">
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
        ref="upload"
        accept=".xls, .xlsx"
        :headers="{token:token}"
        :action="up_url"
        :data="{ date:timer,mid:up_service }"
        :on-success="upSuccess"
        :on-error="upError"
        :file-list="fileList"
        :limit="1"
        name="file"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button>
      </el-upload>
    </el-dialog>
    <el-dialog
      title="上传图片"
      :visible.sync="show_flag_img"
      :before-close="close_img"
      :closeOnClickModal="false"
      width="800px"
    >
      <div class="w_100 mar_b_20">
        <p class="mar_b_10 font14">回单图片(限三张图片)</p>
        <el-upload
          :action="up_imgurl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :limit="3"
          :headers="{token:token}"
          :on-success="upload_img01"
          :on-remove="deleteImg01"
          :file-list="img_value01"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <p class="mar_b_10 mar_t_10 font14">发票图片(限三张图片)</p>
        <el-upload
          :action="up_imgurl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :limit="3"
          :headers="{token:token}"
          :on-success="upload_img02"
          :on-remove="deleteImg02"
          :file-list="img_value02"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <p class="mar_b_10 mar_t_10 font14">个税凭证图(限三张图片)</p>
        <el-upload
          :action="up_imgurl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :limit="3"
          :headers="{token:token}"
          :on-success="upload_img03"
          :on-remove="deleteImg03"
          :file-list="img_value03"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog append-to-body :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="img_submitUpload"
      >确定上传</el-button>
    </el-dialog>
  </div>
</template>

<script>
var THIS;
import botHeader from "@/views/components/bot-header/bot-header";
import downLoad from "@/views/components/list/down-load.vue";
export default {
  components: {
    botHeader,
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
      allFlag: false,
      keyword: "",
      timer: "",
      token: window.localStorage.flexible_manage_token,
      up_url: "",
      //导入表格
      timer: "",
      show_flag: false,
      fileList: [],
      //上传图片
      up_imgurl: "",
      show_flag_img: false,
      img_value01: [],
      img_path01: [],
      img_value02: [],
      img_path02: [],
      img_value03: [],
      img_path03: [],
      dialogImageUrl: "",
      dialogVisible: false, //放大图片展示框
      service: "",
      up_service: "",
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

    view(type, item) {
      if (type == 1) {
        THIS.$router.replace("/home/cost/costOne/costDetail/" + item.id);
      } else if (type == 2) {
        THIS.show_flag_img = true;
        THIS.id = item.id;
        THIS.img_path01 = item.receipt;
        THIS.img_value01 = item.receipt.map(item => {
          return { url: item, name: "" };
        });
        THIS.img_path02 = item.invoice;
        THIS.img_value02 = item.invoice.map(item => {
          return { url: item, name: "" };
        });
        THIS.img_path03 = item.credentials;
        THIS.img_value03 = item.credentials.map(item => {
          return { url: item, name: "" };
        });
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
      var data = sign({
        page: THIS.page,
        size: THIS.count,
        name: THIS.keyword,
        date: THIS.timer,
        mid: THIS.service
      });
      vue_Post(THIS, "/cost/list", data, callback, 1, 1, 1, 1);
      function callback(msg) {
        THIS.total = msg.count;
        THIS.list = msg.list;
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

    download_demo() {
      window.location.href =
        "http://qn.cdn.jszhr.com/labor/file_8f922f2a81dbd9091c113c4f5cef5491.xlsx";
    },

    //上传数据
    upload() {
      THIS.show_flag = true;
    },

    submitUpload() {
      if (!THIS.timer) {
        THIS.$message({
          type: "error",
          message: "请选择结算表时间!",
          dangerouslyUseHTMLString: true
        });
        return false;
      }
      if (!THIS.up_service && THIS.userType == 1) {
        THIS.$message({
          type: "error",
          message: "请选择商户!",
          dangerouslyUseHTMLString: true
        });
        return false;
      }
      THIS.$refs.upload.submit();
    },

    upSuccess(event, file, fileList) {
      if (file.response.code == 200) {
        THIS.$message({
          type: "success",
          message: "上传成功!",
          dangerouslyUseHTMLString: true
        });
        THIS.close();
        THIS.getList();
      } else {
        THIS.$message({
          type: "success",
          message: file.response.msg,
          dangerouslyUseHTMLString: true
        });
        console.log(file.response.msg);
        THIS.upError(file.response.msg);
      }
    },

    close() {
      THIS.fileList = [];
      THIS.timer = "";
      THIS.up_service = "";
      THIS.show_flag = false;
    },

    upError(msg) {
      THIS.$message({
        type: "error",
        message: msg ? msg : "上传失败!",
        dangerouslyUseHTMLString: true
      });
      THIS.fileList = [];
    },

    //上传图片开始
    upload_img01(event, file, fileList) {
      if (event.code == 200) {
        THIS.img_path01.push(event.data.path[0]);
      } else {
        THIS.$message({
          type: "error",
          message: event.msg,
          dangerouslyUseHTMLString: true
        });
      }
    },

    upload_img02(event, file, fileList) {
      if (event.code == 200) {
        THIS.img_path02.push(event.data.path[0]);
      } else {
        THIS.$message({
          type: "error",
          message: event.msg,
          dangerouslyUseHTMLString: true
        });
      }
    },

    upload_img03(event, file, fileList) {
      if (event.code == 200) {
        THIS.img_path03.push(event.data.path[0]);
      } else {
        THIS.$message({
          type: "error",
          message: event.msg,
          dangerouslyUseHTMLString: true
        });
      }
    },

    //查看大图
    handlePictureCardPreview(file) {
      //放大图片
      THIS.dialogImageUrl = file.url;
      THIS.dialogVisible = true;
    },

    deleteImg01(file, fileList) {
      THIS.img_path01 = fileList.map(item => {
        return item.url;
      });
      console.log(THIS.img_path01);
    },

    deleteImg02(file, fileList) {
      THIS.img_path02 = fileList.map(item => {
        return item.url;
      });
      //console.log(THIS.img_path02);
    },

    deleteImg03(file, fileList) {
      THIS.img_path03 = fileList.map(item => {
        return item.url;
      });
      console.log(THIS.img_path03);
    },

    img_submitUpload() {
      var data = {
        id: THIS.id,
        receipt: THIS.img_path01,
        invoice: THIS.img_path02,
        credentials: THIS.img_path03
      };
      vue_Post(THIS, "/cost/uploadImg", data, callback, 1, 1, 1, 0);
      function callback(msg) {
        THIS.show_flag_img = false;
        THIS.img_value01 = [];
        THIS.img_path01 = [];
        THIS.img_value02 = [];
        THIS.img_path02 = [];
        THIS.img_value03 = [];
        THIS.img_path03 = [];
        THIS.getList();
      }
    },

    close_img() {
      THIS.show_flag_img = false;
      THIS.img_value01 = [];
      THIS.img_path01 = [];
      THIS.img_value02 = [];
      THIS.img_path02 = [];
      THIS.img_value03 = [];
      THIS.img_path03 = [];
    },

    dao_choose() {
      var date_start = "";
      var date_end = "";
      if (THIS.timer) {
        date_start = THIS.timer[0];
        date_end = THIS.timer[1];
      }
      var bb =
        "/api/admin/cost/download?token=" +
        window.localStorage.flexible_manage_token +
        "&name=" +
        THIS.keyword +
        "&date_start=" +
        date_start +
        "&date_end=" +
        date_end;
      window.location.href = bb;
    }
  },
  mounted() {
    THIS = this;
    THIS.store.commit("setPageText", "当前位置：服务费管理 / 明细管理");
    THIS.getList();
    THIS.get_service();
    THIS.up_url = window.localStorage.host + "/cost/upload";
    THIS.up_imgurl = window.localStorage.host + "/common/upload";
    THIS.userType = window.localStorage.userType;
  }
};
</script>

<style scoped>
.list_header li,
.list_main ol li {
  width: 16%;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
