<template>


          <div class="views h_bottom po_r pad_l_50 pad_r_50 b_s mr_color01">
                
                <bot-header :link='link'></bot-header>
                <el-form :model="ruleForm" label-position='top' :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                        <div class="views_100ch_2">
                            <div class="from_box">
                                <div class="from_tltle">基本信息</div>
                                <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                    <div class="w_100">
                                        <div class="w_100 flex row j_between">
                                            <el-form-item class="w_30" label="任务名称" prop="name">
                                                <el-input v-model="ruleForm.name" placeholder="请输入任务名称" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item class="w_30" label="任务城市" prop="address">
                                                <el-input v-model="ruleForm.address" placeholder="请输入任务城市" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item class="w_30" v-if="userType==1" label="发包方" prop="mid">
                                                <el-select @visible-change="changeMid($event)" class="w_100 d_b_line" v-model="ruleForm.mid" remote :remote-method='search_mid' clearable filterable  placeholder="请选择发包方">
                                                    <el-option v-for="(item,index) in midArr" :key="index" :label="item.title" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <div v-else class="w_30"></div>
                                        </div>
                                        <div class="w_100 flex row j_between">
                                            <el-form-item class="w_30" label="用工类型" prop="type">
                                                <el-select class="w_100 d_b_line" v-model="ruleForm.type" clearable filterable placeholder="请选择用工类型">
                                                    <el-option v-for="(item,index) in typeArr" :key="index" :label="item.name" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="任务描述" prop="desc" class="w_30 mar_r_30">
                                                <el-input type="textarea" :rows="4" v-model="ruleForm.desc" placeholder="请输入任务描述"></el-input>
                                            </el-form-item>
                                            <el-form-item label="验收标准" prop="standard" class="w_30">
                                                <el-input type="textarea" :rows="4" v-model="ruleForm.standard" placeholder="请输入验收标准"></el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="w_100 flex row j_between">
                                            <el-form-item class="w_30" label="结算周期" prop="cycle">
                                                <el-select class="w_100 d_b_line" v-model="ruleForm.cycle" clearable filterable placeholder="请选择结算周期">
                                                    <el-option v-for="(item,index) in cycleArr" :key="index" :label="item.title" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item class="w_30" label="服务费" prop="fee">
                                                <el-input v-model="ruleForm.fee" placeholder="请输入服务费" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item class="w_30" label="学历要求" prop="education">
                                                <el-select class="w_100 d_b_line" v-model="ruleForm.education" clearable filterable placeholder="请选择学历要求">
                                                    <el-option v-for="(item,index) in educationArr" :key="index" :label="item.title" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                        <div class="w_100 flex row j_between">
                                            <el-form-item class="w_30" label="合作期限" prop="cooperation">
                                                <el-date-picker
                                                    style='width:100%'
                                                    v-model="ruleForm.cooperation"
                                                    value-format="yyyy-MM-dd"
                                                    type="daterange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="w_30" label="报名期限" prop="report">
                                                <el-date-picker
                                                    style='width:100%'
                                                    v-model="ruleForm.report"
                                                    value-format="yyyy-MM-dd"
                                                    type="daterange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="w_30" label="接单人数" prop="number">
                                                <el-input v-model="ruleForm.number" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入接单人数" clearable></el-input>
                                            </el-form-item>
                                        </div>
                                        <div v-if="userType==1" class="w_100 flex row j_between">
                                            <el-form-item class="w_30" label="服务商" prop="pid">
                                                <el-select class="w_100 d_b_line" v-model="ruleForm.pid" remote :remote-method='search_pid' clearable filterable  placeholder="请选择服务商名称">
                                                    <el-option v-for="(item,index) in pidArr" :key="index" :label="item.title" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <div class="w_30"></div>
                                            <div class="w_30"></div>
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
export default {
    components:{
        botHeader,
        submitBtn
    },
    name: '',
    data(){
        return {
            id:'',
            userType:2,
            isBack:true,
            link:'/home/task/taskOne/taskList',
            msg:{},
            ruleForm:{
                name:'',
                mid:'',
                type:'',
                address:'',
                desc:'',
                standard:'',
                cycle:'',
                fee:'',
                pid:'',
                cooperation:'',
                report:'',
                number:'',
                education:'',
            },  
            rules:{
                name:[{ required: true, message: '请输入任务名称', trigger: [] }],
                mid:[{ required: true, message: '请输入发包方', trigger: [] }],
                address:[{ required: true, message: '请输入任务城市', trigger: [] }],
                desc:[{ required: true, message: '请输入任务描述', trigger: [] }],
                type:[{ required: true, message: '请选择用工类型', trigger: [] }],
                standard:[{ required: true, message: '请输入验收标准', trigger: [] }],
                cycle:[{ required: true, message: '请选择结算周期', trigger: [] }],
                fee:[{ required: true, message: '请输入服务费', trigger: [] }],
                pid:[{ required: true, message: '请选择服务商名称', trigger: [] }],
                cooperation:[{ required: true, message: '请选择结算周期', trigger: [] }],
                report:[{ required: true, message: '请选择报名期限', trigger: [] }],
                number:[{ required: true, message: '请输入接单人数', trigger: [] }],
                education:[{ required: true, message: '请选择学历要求', trigger: [] }],
            },
            pidArr:[],
            midArr:[],
            typeArr:[],
            cycleArr:[
                { title:'按单结算',id:1 },
                { title:'按小时结算',id:2 },
                { title:'按月结算',id:3 },
                { title:'按日结算',id:4 }
            ],
            educationArr:[
                { title:'无限制',id:1 },
                { title:'初中以上',id:2 },
                { title:'高中以上',id:3 },
                { title:'大专以上',id:4 },
                { title:'本科以上',id:5 }
            ]
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
            },

            submit_from(){
                    var data = {
                        name:THIS.ruleForm.name,
                        mid:THIS.ruleForm.mid,
                        type:THIS.ruleForm.type,
                        address:THIS.ruleForm.address,
                        desc:THIS.ruleForm.desc,
                        standard:THIS.ruleForm.standard,
                        cycle:THIS.ruleForm.cycle,
                        fee:THIS.ruleForm.fee,
                        pid:THIS.ruleForm.pid,
                        cooperation_start:THIS.ruleForm.cooperation[0],
                        cooperation_end:THIS.ruleForm.cooperation[1],
                        report_start:THIS.ruleForm.report[0],
                        report_end:THIS.ruleForm.report[1],
                        number:THIS.ruleForm.number,
                        education:THIS.ruleForm.education
                    };
                    var url = '';
                    if(THIS.id){
                        data.id = THIS.id;
                        url = '/task/edit'
                    }else{
                        url = '/task/add';
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
                vue_Post(THIS,'/task/get',data,callback,1,1,0,1);
                function callback(msg){
                    msg = msg.info;
                    THIS.ruleForm = {
                        name:msg.name,
                        mid:msg.mid,
                        type:msg.type,
                        address:msg.address,
                        desc:msg.desc,
                        standard:msg.standard,
                        cycle:msg.cycle,
                        fee:msg.fee,
                        pid:msg.pid,
                        cooperation:[msg.cooperation_start,msg.cooperation_end],
                        report:[msg.report_start,msg.report_end],
                        number:msg.number,
                        education:msg.education,
                    };
                    THIS.get_type();
                }
            },

            //获取服务商
            search_pid(msg){
                var data = {
                    name:msg,
                    size:300
                };
                vue_Post(THIS,'/platform/list',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.pidArr = msg.list.map(item=>{
                        return { title:item.name,id:item.id }
                    });
                }
            },

            //获取发包方
            search_mid(msg){
                var data = {
                    name:msg,
                    size:300
                };
                vue_Post(THIS,'/merchant/list',data,callback,0,0,0,0);
                function callback(msg){
                    console.log(1000)
                    THIS.midArr = msg.list.map(item=>{
                        return { title:item.m_name,id:item.id }
                    });
                }
            },

            get_type(){
                var data = {
                    id:THIS.ruleForm.mid
                };
                vue_Post(THIS,'/merchant/getProtocol',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.typeArr = msg;
                    console.log(THIS.typeArr);
                }
            },

            changeMid(flag){
                if(!flag&&THIS.ruleForm.mid){
                   THIS.get_type();
                };
            },

    },
    mounted(){
        THIS = this;
        THIS.store.commit('setPageText','任务管理 / 任务编辑');
        THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
        THIS.userType = window.localStorage.userType;
        if(THIS.id){
            THIS.get_detail();
        }else{
            THIS.get_type();
        };
        THIS.search_pid('');
        THIS.search_mid('');
        
        
    },
    beforeDestroy(){
        THIS.store.commit('setPageText','当前位置：任务管理 / 任务列表');
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
