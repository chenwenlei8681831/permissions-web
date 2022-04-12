<template>

          <div class="views">
                <bot-header></bot-header>
                <!--方块-->
                <div class="bg_fff b_s pad_r_30 pad_l_30 pad_b_30">
                    <div class="flex row tj_top" style="height:0.9rem;">
                        <div class=" h_100 left font14 h_100 center font14 flex row pad_t_20 pad_b_20 b_s" style="line-height: 0.5rem;">员工数据简报</div>
                        <ul class=" v_data h_100 center font14 flex row pad_t_20 pad_b_20 b_s">
                            <li @click="tabs(0)" :class="tabIndex==0?'current':''" class="mar_r_20 f_l font14 h_100 pointer timer b_s">今日</li>
                            <li @click="tabs(1)" :class="tabIndex==1?'current':''" class="mar_r_20 f_l font14 h_100 pointer timer b_s">本周</li>
                            <li @click="tabs(2)" :class="tabIndex==2?'current':''" class="mar_r_20 f_l font14 h_100 pointer timer b_s">本月</li>
                            <div class="clearfix"></div>
                        </ul>
                    </div>
                    <xt-header :msg='headerMsg'></xt-header>
                </div>
                <!--趋势-->
                <div class="w_100 flex row j_between mar_t_30" style="height:6rem;">
                    <div class="bg_fff h_100 w_60">
                        <xt-qushi :msg='qs'></xt-qushi>
                    </div>
                    <div class="flex col h_100 bg_fff w_40 mar_l_30" style="border-radius:5px;">
                        <xt-list @choose_tab='choose_tab' :list='list'></xt-list>
                    </div>
                </div>
                <!--绩效-->
                <div v-show="false" class="w_100 flex row j_between mar_t_30 mar_b_30" style="height:6rem;">
                    <div class="bg_fff h_100 w_60 flex col">
                        <p class="font14 b_line b_line pad_l_30 pad_r_30" style="color:#595959;height: 0.9rem;line-height: 0.9rem;">绩效数据简报</p>
                        <div class="flex_1 pad_r_20 pad_l_20 flex row worp j_between">
                            <div :class="item.class" class="data_item w_45 mar_t_20 mar_b_20 b_s pad_all_20" v-for="(item,index) in dataList" :key="index">
                                <p class="font14 mar_b_10">{{item.title}}</p>
                                <h1 class="font20">{{item.msg}}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="flex col h_100 bg_fff w_40 mar_l_30" style="border-radius:5px;">
                        <xt-list @choose_tab='choose_tab' :list='js_list'></xt-list>
                    </div>
                </div>
          </div>
  
</template>

<script>
import botHeader from '@/views/components/bot-header/bot-header';
import xtHeader from './components/xt-header';
import xtQushi from './components/xt-qushi';
import xtList from './components/xt-list';
export default {
  components:{
    botHeader,
    xtHeader,
    xtQushi,
    xtList
  },
  name: '',
  data(){
      return {  
          tabIndex:0,
          headerMsg:[
            { title:'在职员工',number:'0',class:'current04'},
            { title:'离职员工',number:'0',class:'current03'},
            { title:'本日录入员工',number:'0',class:'current02'},
            { title:'本日出发员工',number:'0',class:'current01'},
            { title:'本日入职员工',number:'0',class:'current05'}
          ],
          qs:{
              data:[],
              dataTxt:[]
          },
          list:{
            title:'业务员数据排行',
            link:'/home/statistical/statisticalOne/statistical_ygDetail',
            tabIndex:0,
            header:[
                { class:'v_color01',title:'业务员' },
                { class:'v_color02',title:'录入员工' },
                { class:'v_color03',title:'离职员工' },
                { class:'v_color04',title:'入职员工' },
            ],
            list:[]
          },
          dataList:[
              {title:'本年度总绩效（元）',msg:'480235.26',class:'d_01'},
              {title:'待结算绩效（元）',msg:'480235.26',class:'d_02'},
              {title:'上月结算（元）',msg:'261585.26',class:'d_03'},
              {title:'本月预估（元）',msg:'288835.26',class:'d_04'},
              {title:'今日入职员工（人）',msg:'235',class:'d_05'},
              {title:'今日绩效预估（元）',msg:'480235.26',class:'d_06'}
          ],
          js_list:{
            title:'业务员绩效排行（上月）',
            link:'/home/statistical/statisticalOne/statistical_jxDetail',
            tabIndex:0,
            header:[
                { class:'v_color01',title:'业务员' },
                { class:'v_color04',title:'绩效' },
            ],
            list:[]
          },
      }
  },
  methods:{

        tabs(index){
            this.tabIndex = index;
            this.get_statistical();
            var text = index==0?'本日':(index==1?'本周':'本月');
            this.headerMsg[2].title = text + '录入员工';
            this.headerMsg[3].title = text + '录入员工';
            this.headerMsg[4].title = text + '录入员工';
        },

        get_detail(){
            var THIS = this;
            var data = {
                time:0,
                type:0,
            };
            vue_Post(THIS,'index/tongjiIndex',data,callback,1,1,1,1);
            function callback(msg){
                THIS.headerMsg[0].number = msg.jb.zz.num;
                THIS.headerMsg[1].number = msg.jb.lz.num;
                THIS.headerMsg[2].number = msg.jb.lr.num;
                THIS.headerMsg[3].number = msg.jb.cf.num;
                THIS.headerMsg[4].number = msg.jb.rz.num;
                var a = msg.ph;
                for(let i=0;i<a.length;i++){
                    THIS.list.list.push([
                      { class:'v_color01',title:a[i].username  },
                      { class:'v_color02',title:a[i].num_hired },
                      { class:'v_color03',title:a[i].num_lizhi },
                      { class:'v_color04',title:a[i].num_ruzhi }
                    ])
                };
                //趋势图
                THIS.qs.dataTxt = msg.qs.time;
                THIS.qs.data[0] = { title:'今日在职',line_color:'#F7A54D',data:msg.qs.zz };
                THIS.qs.data[1] = { title:'离职员工',line_color:'#FF6A4B',data:msg.qs.lz };
                THIS.qs.data[2] = { title:'录入员工',line_color:'#09A895',data:msg.qs.lr };
                THIS.qs.data[3] = { title:'出发员工',line_color:'#474747',data:msg.qs.cf };
                THIS.qs.data[4] = { title:'入职员工',line_color:'#198AF3',data:msg.qs.rz };
                console.log(THIS.qs.data)
            }; 
        },

        get_statistical(){
            var THIS = this;
            var data = {
                time:THIS.tabIndex,
                type:0,
            };
            vue_Post(THIS,'index/tongjiIndex',data,callback,1,1,1,1);
            function callback(msg){
                THIS.headerMsg[0].number = msg.jb.zz.num;
                THIS.headerMsg[1].number = msg.jb.lz.num;
                THIS.headerMsg[2].number = msg.jb.lr.num;
                THIS.headerMsg[3].number = msg.jb.cf.num;
                THIS.headerMsg[4].number = msg.jb.rz.num;
            }; 
        },

        choose_tab(index){
            this.list.tabIndex = this.list.tabIndex==index?0:index;
            this.get_list();
        },

        get_list(){
            var THIS = this;
            var data = {
                type:0,
                sort:THIS.list.tabIndex==0?0:THIS.list.tabIndex-1,
                desc:THIS.list.tabIndex==0?1:0
            };
            vue_Post(THIS,'index/ranking',data,callback,1,1,1,1);
            function callback(msg){
                var a = msg.list;
                THIS.list.list = [];
                for(let i=0;i<a.length;i++){
                    THIS.list.list.push([
                      { class:'v_color01',title:a[i].username  },
                      { class:'v_color02',title:a[i].num_hired },
                      { class:'v_color03',title:a[i].num_lizhi },
                      { class:'v_color04',title:a[i].num_ruzhi }
                    ])
                };
            }
        }


  },
  mounted(){

      THIS.store.commit('setPageText','当前位置：统计 / 数据统计');
      this.get_detail();

  }
}
</script>

<style scoped>
   .title{
     height: 0.6rem;
     line-height: 0.6rem;
     font-size: 14px;
     color: #262626;
     font-weight: bold;
   }
   .margin_bottom{
     margin-bottom: 0.32rem;
   }
   .tj_top .left{
        margin-right: 0.5rem;
   }
   .timer{
     line-height: 0.5rem;
   }
   .timer.current{
     border-bottom: 2px solid #007DF1;
     color: #007DF1;
   }
   .data_item{
     border-radius: 5px;
     border:1px solid rgba(217, 217, 217, 1);
     box-shadow:0px 2px 6px 0px rgba(229,229,229,0.7);
   }
   .d_01{
       background: url(../../../assets/images/statistical/img01.png) no-repeat right 0.1rem bottom 0.1rem /0.5rem;
   }
   .d_02{
       background: url(../../../assets/images/statistical/img02.png) no-repeat right 0.1rem bottom 0.1rem /0.5rem;
   }
   .d_03{
       background: url(../../../assets/images/statistical/img03.png) no-repeat right 0.1rem bottom 0.1rem /0.5rem;
   }
   .d_04{
       background: url(../../../assets/images/statistical/img04.png) no-repeat right 0.1rem bottom 0.1rem /0.5rem;
   }
   .d_05{
       background: url(../../../assets/images/statistical/img05.png) no-repeat right 0.1rem bottom 0.1rem /0.5rem;
   }
   .d_06{
       background: url(../../../assets/images/statistical/img06.png) no-repeat right 0.1rem bottom 0.1rem /0.5rem;
   }
   .d_01 h1{
       color: #E74726;
   }
   .d_02 h1{
       color: #E74726;
   }
   .d_03 h1{
       color: #068778;
   }
   .d_04 h1{
       color: #068778;
   }
   .d_05 h1{
       color: #198AF3;
   }
   .d_06 h1{
       color: #198AF3;
   }
</style>
