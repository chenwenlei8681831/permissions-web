<template>

          
          <ul class="flex row header co_fff flex j_between">
              <li :class="item.class" class="item flex_1 mar_r_20" v-for="(item,index) in msg" :key="index">
                  <p class="font14" style="color:#595959;">{{item.title}}</p>
                  <h1 class="font20">{{item.number}}</h1>
              </li>
          </ul>
    
</template>

<script>
export default {
  props:['msg'],
  name: '',
  data(){
      return {
          
          
      }
  },
  methods:{
     
  },
   mounted(){
      
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
  .header{
    height: 1.4rem;
  }
  .header li{
    border-radius: 0.1rem;
    margin-right: 20px;
  }
  .header li:nth-last-child(1){
    margin-right: 0;
  }
  .item{
    background:  no-repeat left 0.32rem center /0.5rem;
    padding: 0.4rem 0 0.4rem 1.1rem;
  }
  .current01{
    background-color:#F6F6F6;
    border-color:#D9D9D9;
    color: #595959;
    background-image: url(../../../../assets/images/statistical/item01.png)
  }
  .current02{
    background-color:#E5F9F7;
    color: #068778;
    border-color: #A6DBD5;
    background-image: url(../../../../assets/images/statistical/item02.png)
  }
  .current03{
    background-color:#FDF2F0;
    color: #E74726;
    border-color: #F6765C;
    background-image: url(../../../../assets/images/statistical/item03.png)
  }
  .current04{
    background-color:#FFF5E5;
    color: #FB9B34;
    border-color: #FB9B34;
    background-image: url(../../../../assets/images/statistical/item04.png)
  }
  .current05{
    background-color:#F3F9FF;
    color: #198AF3;
    border-color: #198AF3;
    background-image: url(../../../../assets/images/statistical/item05.png)
  }
  .item p{
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .item h1{
    display: inline-block;
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .item h1 i{
    font-size: 0.18rem;
    font-style: normal;
    margin-left: 0.1rem;
  }
</style>
