<template>

          <div class="h_bottom">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
  
</template>

<script>

export default {
  name: '',
  data(){
      return {
          
          
      }
  },
  methods:{
     
  }
}
</script>

<style scoped>
   
</style>
