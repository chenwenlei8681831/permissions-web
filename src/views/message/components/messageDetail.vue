<template>


    
                    <div class="views_100ch_1 pad_all_30">
                        <div class="mar_t_30 baseInfo pad_b_20" style="width:700px;margin:0 auto;">
                            <div class="title">{{msg.title}}</div>
                            <div class="info flex row">
                                <span>发布人：{{msg.name}}</span>
                                <span class="mar_l_30">发布时间：{{msg.createat}}</span>
                            </div>
                            <div v-if="msg.company_title" class="info flex row">
                                <span>招工企业：{{msg.company_title}}</span>
                            </div>
                            <img v-for="(item,index) in msg.pictures" :key="index" class="img d_block w_50 mar_b_20" :src="item" alt="">
                            <div id="v_content" class="over_hide"></div>
                        </div>
                    </div>
             
  
</template>

<script>
export default {
  name: '',
  props:['msg'],
  data(){
      return {
      }
  },
  methods:{
     
 

  },
   mounted(){
       var THIS = this;
       $('#v_content').html(THIS.msg.content);
      
  }
}
</script>

<style scoped>
   .title{
       font-size: 24px;
       line-height: 50px;
       color: #262626;
   }
   .info{
       height: 30px;
       line-height: 30px;
       font-size: 14px;
       color: #8C8C8C;
   }
   .content{
       white-space: pre-line;
   }
</style>
