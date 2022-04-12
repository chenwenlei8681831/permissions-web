<template>

         <div class="bg_fff">
                        <div class="flex row tj_top">
                            <div class="flex row j_between w_100 h_100 font14 h_100 center flex row pad_all_20 b_s b_line" style="line-height: 0.5rem;">
                              <span>{{list.title}}</span>
                              <div class="list_co05 look_more font12 pointer" @click="view(list.link)">查看更多<span class="d_l_block"></span></div>
                            </div>
                        </div>
                        <div class="flex_1 pad_t_20 pad_l_20 pad_r_20">
                              <ol class="flex row header">
                                  <li @click="choose_tab(index)" class="flex_1 text_center font14 pointer" :class="item.class" v-for="(item,index) in list.header" :key="index">
                                    {{item.title}}
                                    <span class="d_l_block" v-if="index!=0" :class="index==list.tabIndex?'current':''"></span>
                                  </li>
                              </ol>
                              <ul class="w_100">
                                  <li v-for="(item,index) in list.list" :key="index">
                                      <ol class="flex row bodyer">
                                          <li class="font14 flex_1 text_center" v-for="(v_item,v_index) in item" :key="v_index" :class="v_item.class">{{v_item.title}}</li>
                                      </ol>
                                  </li>
                                  <p class="font14 text_center list_co0" style="line-height:50px" v-if="list.list.length==0">暂无数据</p>
                              </ul>
                        </div>
          </div>
  
</template>

<script>
export default {
  props:['list'],
  name: '',
  data(){
      return {
          
      }
  },
  methods:{

    view(link){
         window.localStorage.beforNavIndex = this.tabIndex;
         this.$router.push(link);
    },

    choose_tab(index){
         if(index!=0){
            this.$emit('choose_tab',index);
         } 
    } 

  },
   mounted(){
     
  }
}
</script>

<style scoped>
   .look_more span{
      margin-left: 3px;
      width: 8px;
      height: 10px;
      vertical-align: middle;
      background: url(../../../../assets/images/statistical/right01.png) no-repeat center /100%;
   }
   ol,ol li,ul li{
     height: 40px;
     line-height: 40px;
   }
   ol.header >li span{
      width: 8px;
      height: 14px;
      margin-left: 3px;
      vertical-align: middle;
      background: no-repeat center /100% 100%;
   }
   .bodyer .v_color01{
      color: #333;
   }
   .header .v_color01{
      background-color: #F3F3F3;
      color: #333;
   }
   .header .v_color02{
      background:rgba(9,168,149,0.2);
      color: #09A895;
   }
   .bodyer .v_color02{
      color: #09A895;
   }
   ol.header >li.v_color02 span{
      background-image: url(../../../../assets/images/statistical/arrow02ss.png);
   }
   ol.header >li.v_color02 span.current{
      background-image: url(../../../../assets/images/statistical/arrow02s.png);
   }
   .header .v_color03{
      background:rgba(255,120,92,0.2);
      color: #FF785C;
   }
   .bodyer .v_color03{
      color: #FF785C;
   }
   ol.header >li.v_color03 span{
      background-image: url(../../../../assets/images/statistical/arrow03ss.png);
   }
   ol.header >li.v_color03 span.current{
      background-image: url(../../../../assets/images/statistical/arrow03s.png);
   }
   .header .v_color04{
      background:rgba(25,138,243,0.2);
      color: #198AF3;
   }
   .bodyer .v_color04{
      color: #198AF3;
   }
   ol.header >li.v_color04 span{
      background-image: url(../../../../assets/images/statistical/arrow04ss.png);
   }
   ol.header >li.v_color04 span.current{
      background-image: url(../../../../assets/images/statistical/arrow04s.png);
   }
</style>
