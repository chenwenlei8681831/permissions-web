<template>

          <div class="views h_bottom po_r pad_l_50 pad_r_50 b_s mr_color01">
                <bot-header :link='link'></bot-header>
                <el-form :model="ruleForm" label-position='top' :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                    <div class="views_100ch_2">
                        <div class="from_box">
                            <div class="from_tltle">基本信息</div>
                            <div class="w_40 b_s pad_l_30 pad_r_30" style="margin:30px auto;">
                                <div class="w_100">
                                    <div class="w_100 flex col j_between">
                                        <el-form-item class="w_100" label="商户名称" prop="name">
                                            <el-input v-model="ruleForm.name" placeholder="请输入商户名称"></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_100" label="联系电话" prop="phone">
                                            <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_100" label="商户字母大写" prop="short">
                                            <el-input v-model="ruleForm.short" placeholder="请输入商户字母大写"></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_100" label="服务商名称" prop="pid">
                                            <el-select class="w_100 d_b_line" v-model="ruleForm.pid" remote :remote-method='search_pid' clearable filterable  placeholder="请选择服务商名称">
                                                <el-option v-for="(item,index) in pidArr" :key="index" :label="item.title" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item class="w_100" label="上传协议" prop="contract_url">
                                            <el-upload
                                                class="upload-demo"
                                                drag
                                                :action="up_imgurl"
                                                :limit=1
                                                :headers = {token:token}
                                                list-type="text"
                                                :on-preview="handlePictureCardPreview"
                                                :on-success='upload'
                                                :on-remove='deleteImg'
                                                :file-list="img_value">
                                                <i class="el-icon-upload"></i>
                                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                            </el-upload>
                                            <el-dialog title='模板文件预览' :visible.sync="dialogVisible" >
                                                <pdf v-if='ht_path' class='w_100 d_block' :src="ht_path" :page="pdfPage" @num-pages="pageCount = $event" @page-loaded="pdfPage = $event"></pdf>
                                                <div style="margin-top: 15px; text-align: right">
                                                    <el-button type="primary" size="small" @click.stop="previousPage">上一页</el-button>
                                                    <el-button class='mar_r_10' type="primary" size="small" @click.stop="nextPage">下一页</el-button>
                                                    <span class='mar_l_10'>当前第{{pdfPage}}页 / 共{{pageCount}}页</span>
                                                </div>
                                            </el-dialog>
                                        </el-form-item>
                                    </div>
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
var THIS;
import botHeader from '@/views/components/bot-header/bot-header';
import submitBtn from '@/views/components/form-submit/submit-btn';
import CMapReaderFactory from 'vue-pdf-signature/src/CMapReaderFactory.js';
import pdf from 'vue-pdf-signature'; 
export default {
    components:{
        botHeader,
        submitBtn,
        pdf
    },
    name: '',
    data(){
        return {
            id:'',
            isBack:true,
            link:'/home/pact/pactOne/merchantsList',
            msg:{},
            ruleForm:{
                name:'',
                phone:'',
                short:'',
                pid:'',
                contract_url:'',
            },
            rules:{
                name:[{ required: true, message: '请输入商户名称', trigger: [] }],
                phone:[{ required: true, message: '请输入联系电话', trigger: [] }],
                short:[{ required: true, message: '请输入商户字母大写', trigger: [] }],
                pid:[{ required: true, message: '请选择服务商', trigger: [] }],
                contract_url:[{ required: true, message: '请上传合同', trigger: [] }],
            },
            pidArr:[],
            //上传合同模板
            ht_path:'',
            img_value:[],
            up_imgurl:'',
            dialogVisible: false,
            pdfPage : 1,
            pageCount: 0,
            token:window.localStorage.flexible_manage_token,
        }
    },
    methods:{

            submitForm(formName) {
                    THIS.$refs[formName].validate((valid) => {
                        console.log('valid',valid)
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
                THIS.$refs[formName].resetFields();
                THIS.img_value = [];
            },
          
            submit_from(){
                    var data = {
                        name:THIS.ruleForm.name,
                        pid:THIS.ruleForm.pid,
                        short:THIS.ruleForm.short,
                        contract_url:THIS.ruleForm.contract_url,
                        mobile:THIS.ruleForm.phone
                    };
                    var url = '';
                    if(THIS.id){
                        data.id = THIS.id;
                        url = '/merchant/edit'
                    }else{
                        url = '/merchant/add';
                    };
                    vue_Post(THIS,url,data,callback,1,1,1,1);
                    function callback(msg){
                        THIS.$message({
                            type: 'success',
                            message: THIS.id?'编辑成功':'创建成功',
                            dangerouslyUseHTMLString:true
                        });
                        THIS.isBack = false;
                        THIS.$router.replace(THIS.link);
                    }; 
            },

            get_detail(){
                var data = {
                    id:THIS.id
                };
                vue_Post(THIS,'/merchant/get',data,callback,1,1,1,0);
                function callback(msg){
                    msg = msg.info;
                    THIS.ruleForm = {
                        name:msg.name,
                        pid:msg.pid,
                        short:msg.short,
                        contract_url:msg.contract_url,
                        phone:msg.mobile
                    };
                    if(msg.contract_url){
                        THIS.img_value = [{url:msg.contract_url,name:'已上的合同'}];
                        THIS.ht_path = msg.contract_url;
                    };
                }
            },

            //上传合同
            upload(event, file, fileList){
                if(event.code==200){
                    THIS.ht_path = event.data.path[0];
                    THIS.ht_path = THIS.ht_path.replace('http:','https:');
                    THIS.ruleForm.contract_url = THIS.ht_path;
                }else{
                    THIS.$message({
                        type: 'error',
                        message: event.msg,
                        dangerouslyUseHTMLString:true
                    });
                }
            },

            deleteImg(file, fileList){
                THIS.ht_path = '';
                THIS.img_value = [];
                THIS.ruleForm.contract_url = '';
            },

            handlePictureCardPreview(file) {
                THIS.dialogImageUrl = file.url;
                THIS.dialogVisible = true;
            },

            //获取服务商
            search_pid(msg){
                var data = {
                    name:msg,
                    size:300
                };
                vue_Post(THIS,'/platform/list',data,callback,1,0,0,0);
                function callback(msg){
                    THIS.pidArr = msg.list.map(item=>{
                        return { title:item.name,id:item.id }
                    });
                }
            },

            //PDF改变页数
            previousPage(){
                var p = THIS.pdfPage;
                p = p>1 ? p-1:THIS.pageCount;
                THIS.pdfPage = p;
            },

            nextPage(){
                var p = THIS.pdfPage;
                p = p < THIS.pageCount?p+1:1;
                THIS.pdfPage = p;
            },

    },
    mounted(){
        THIS = this;
        THIS.store.commit('setPageText','合同管理 / 创建商户&服务商合同');
        THIS.up_imgurl = window.localStorage.host+'/common/upload';
        THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
        THIS.search_pid('');
        if(THIS.id){
            THIS.get_detail();
        };
    },
    beforeDestroy(){
        THIS.store.commit('setPageText','当前位置：合同管理 / 商户&服务商合同');
    },
    beforeRouteLeave(to, from, next){//删除：清除缓存页面缓存  返回：缓存上一页面
        if(!THIS.isBack){
            to.meta.keepAlive = false; 
        };
        next();
    },
}
</script>

<style scoped>
</style>
