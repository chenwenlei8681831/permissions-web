<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header :link='link'></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">
                            合作企业数据排行
                    </div>
                    <!--列表-->
                    <div class="list">
                        <detail-list @choose_tab='choose_tab' :list="list"></detail-list>
                        <!--分页-->
                        <div class="page_footer b_s w_100 h_60px">
                            <el-pagination
                                class="f_r"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="page"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size=count
                                layout="total, sizes, prev, pager, next, jumper"
                                :total=total>
                            </el-pagination>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
</template>

<script>
import botHeader from '@/views/components/bot-header/bot-header';
import tabCar from '@/views/components/list/tab-car.vue';
import downLoad from '@/views/components/list/down-load.vue';
import detailList from './components/detail-list.vue';
export default {
  components:{
      botHeader,
      tabCar,
      downLoad,
      detailList
  },
  name: '',
  data(){
      return {
          link:'/home/statistical/statisticalOne/statistical_yg',
          page:1,
          count:10,
          total:0,
          list:{
            title:'业务员数据排行',
            link:'/home/statistical/statisticalFour/statistical_qyDetail',
            tabIndex:0,
            header:[
                { class:'v_color01',title:'业务员' },
                { class:'v_color02',title:'录入员工' },
                { class:'v_color03',title:'离职员工' },
                { class:'v_color04',title:'入职员工' },
            ],
            list:[],
          }

      }
  },
  methods:{


      handleCurrentChange(val){
          this.page = val;
          this.get_list();
      },

      handleSizeChange(val) {
          this.count = val;
          this.page = 1;
          this.get_list();
      },

      choose_tab(index){
            this.list.tabIndex = this.list.tabIndex==index?0:index;
            this.get_list();
      },

      get_list(){
            var THIS = this;
            var data = {
                type:1,
                sort:THIS.list.tabIndex==0?0:THIS.list.tabIndex-1,
                desc:THIS.list.tabIndex==0?1:0,
                page:THIS.page,
                count:THIS.count
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
                THIS.total = msg.total;
            }
      }


  },
   mounted(){

      THIS.store.commit('setPageText','当前位置：统计 / 数据统计');
      this.get_list();
      
  }
}
</script>

<style scoped>
    .list_header li,.list_main ol li{
        width: 16%;
    }
    .zc_img{
        width:40px;
        height:40px;
        border-radius: 50%;
        overflow: hidden;
        margin: 5px 0;
        background: url(../../../assets/images/moren01.png) no-repeat center /100%;
    }
</style>
