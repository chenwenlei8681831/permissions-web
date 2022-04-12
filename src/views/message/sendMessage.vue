<template>

          <div class="views h_bottom po_r pad_l_50 pad_r_50 b_s mr_color01">
                <bot-header></bot-header>
                <el-form :model="ruleForm" label-position='left' :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                    <div class="from_box flex j_center">
                        <div class="b_s pad_l_30 pad_r_30 mar_t_30" style="width:780px;">
                            <div class="w_100 flex row j_between">
                                <p class="font14" style="width:100px;line-height:32px;"><span style="color:#F35149;">*</span>消息标题</p>
                                <el-form-item class="flex_1" label="" prop="title">
                                    <el-input v-model="ruleForm.title" clearable placeholder="请输入消息标题"></el-input>
                                </el-form-item>
                            </div>
                            <!--富文本编辑器-->
                            <div class="w_100 flex row mar_t_30" style="margin-bottom:60px">
                                <p class="font14" style="width:100px;line-height:42px;"><span style="color:#F35149;">*</span>内容详情</p>
                                <quill-editor 
                                    class="flex_1"
                                    style="height:200px;width:calc(100% - 100px);"
                                    v-model="content"
                                    ref="myQuillEditor" 
                                    :options="editorOption"
                                ></quill-editor>
                            </div>
                            <!--图片-->
                            <div class="w_100 flex row mar_t_30">
                                <p class="font14" style="width:100px;line-height:20px;">上传图片<br><span style="color:#BFBFBF;">(限9张)</span></p>
                                <div class="flex_1">
                                    <el-upload
                                        :action="up_imgurl"
                                        :limit=9
                                        list-type="picture-card"
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove='deleteImg'
                                        :on-success='upload'>
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                            </div>
                            <!--选择企业-->
                            <div class="w_100 flex row mar_t_30">
                                <p class="font14" style="width:100px;line-height:32px;">选择企业</p>
                                <el-form-item class="flex_1" label="" prop="fen_company">
                                    <el-select class="w_100" v-model="ruleForm.company" clearable filterable remote :remote-method='search_company'  placeholder="请选择企业">
                                        <el-option v-for="(item,index) in companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="flex row mar_t_30">
                                <p class="font14" style="width:100px;line-height:20px;"><span style="color:#F35149;">*</span>推送对象</p>
                                <div class="flex_1">
                                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="(city,index) in cities" :label="city" :key="index">{{city}}</el-checkbox>
                                    </el-checkbox-group>
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="po_b po_bottom bg_fff h_60px w_100">
                    <submit-btn @submitForm='submitForm' @resetForm='resetForm'></submit-btn>
                </div>
          </div>
  
</template>

<script>
import botHeader from '@/views/components/bot-header/bot-header';
import submitBtn from '@/views/components/form-submit/submit-btn';
import { quillEditor } from 'vue-quill-editor';
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image'],
    ['clean']
  ]

export default {
  components:{
    botHeader,
    submitBtn,
    quillEditor
  },
  name: '',
  data(){
      return {
          id:'',
          companyArr:[],
          //多选框开始
          checkAll: false,
          checkedCities: [],
          cities: [],
          citiesKey:[],
          isIndeterminate: true,
          //多选框结束
          //上传图片开始
          imgArr:[],
          up_imgurl:'',
          dialogImageUrl: '',
          dialogVisible: false,
          //上传图片结束
          ruleForm:{
              title:'',
              company:''
          },
          rules:{
              title:[{ required: true, message: '请输入消息标题', trigger: 'blur' }],
          },
          //富文本编辑器
          editorOption:{
                modules:{
                    toolbar:[
                        ['bold','italic','strike','image','underline',{ 'color': [] }]
                    ]
                }
          },
          content:''
      }
  },
  methods:{


      submitForm(formName) {
            var THIS = this;
            if(THIS.checkedCities==[]||THIS.checkedCities.length==0){
                THIS.$message({
                    type: 'error',
                    message: '推送对象必选!',
                    dangerouslyUseHTMLString:true
                });
                return false;
            };
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    THIS.submit_from();
                } else {
                    THIS.$message({
                        type: 'warning',
                        message: '请将必填项完善后再提交',
                        dangerouslyUseHTMLString:true
                    });
                    return false;
                }
            });
      },

      resetForm(formName) {
          this.$refs[formName].resetFields();
      },

      submit_from(){
            var THIS = this;
            //推送对象
            var objArr = [];
            for(let i=0;i<THIS.checkedCities.length;i++){
                for(let j=0;j<THIS.cities.length;j++){
                    if(THIS.checkedCities[i]==THIS.cities[j]){
                        objArr.push(THIS.citiesKey[j]);
                    }
                };
            };
            var data = {
                title:THIS.ruleForm.title,
                content:THIS.content,
                companyid:THIS.ruleForm.company?THIS.ruleForm.company:'',
                types:JSON.stringify(objArr),
                pictures:JSON.stringify(THIS.imgArr)
            };
            vue_Post(THIS,'msg/sendNote',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: THIS.id?'编辑成功':'创建成功',
                    dangerouslyUseHTMLString:true
                });
                if(THIS.ruleForm.company){
                    THIS.$router.replace('/home/message/messageOne/xtMessage');
                }else{
                    THIS.$router.replace('/home/message/messageOne/xtMessage');
                };
            }; 
      },

      handleCheckAllChange(val) {
          this.checkedCities = val ? this.cities : [];
          this.isIndeterminate = false;
      },

      handleCheckedCitiesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.cities.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },

      //上传图片
      upload(event, file, fileList){
          var THIS = this;
          if(event.code==1){
              THIS.imgArr.push(event.data.picture[0].url);
          }else if(event.code=='-999'){
              layout(THIS);
          }else{
              THIS.$message({
					type: 'error',
					message: event.msg,
					dangerouslyUseHTMLString:true
			  });
          };
      },

      //查看大图
      handlePictureCardPreview(file) {
        //放大图片
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      //删除图片
      deleteImg(file, fileList){
          this.imgArr = [];
          for(let i=0;i<fileList.length;i++){
              this.ruleForm.imgArr.push(fileList[i].url)
          };
      },

      //配置文件
      get_msg(){
            var THIS = this;
            var data = sign({});
            vue_indexPost(THIS,'msg/sendNoteConfig',data,callback,0,0,0,0);
            function callback(msg){
                THIS.cities = [];
                THIS.citiesKey = [];
                for(let i=0;i<msg.types.length;i++){
                    THIS.cities.push(msg.types[i].name);
                    THIS.citiesKey.push(msg.types[i].key);
                };
            }; 
      },

      //搜索工厂
      search_company(msg){
            var THIS = this;
            var data = {
                keyword:msg
            };
            vue_indexPost(THIS,'company/companySearchList',data,callback,1,0,0,0);
            function callback(msg){
                THIS.companyArr = msg.list;
            };

      },

      
  },
   mounted(){

      THIS.store.commit('setPageText','当前位置：消息 / 发布消息');
      this.id = this.$route.params.id?this.$route.params.id:'';
      this.up_imgurl = window.localStorage.commonhost+'upload/uploadFile';
      this.search_company('');
      this.get_msg();



  }
}
</script>

<style scoped>
    .el-checkbox{
       margin-bottom:5px!important;
       margin-right:8px!important;
    }
    .ql-editor {
        height: 300px;
        padding: 0!important;
    }
</style>
