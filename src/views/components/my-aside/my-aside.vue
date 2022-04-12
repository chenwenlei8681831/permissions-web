<template>
  <div>
        <!-- 侧边导航菜单 -->
        <el-aside class="nav bg_fff b_s margin_bottom b_s" style="width:200px;padding-top:0.64rem;">
            <el-menu style="border:0" :default-active="store.state.path" 
                class="el-menu-vertical-demo" router :unique-opened="true">
                    <el-submenu :index="item.title" v-for="item in msg" :key="item.title">
                    <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
                    <el-menu-item v-for="(i,index) in item.children[0].list" :key="index" :index="i.url">
                        <i :class="i.icon"></i>{{i.title}}
                    </el-menu-item>
                    </el-submenu>
            </el-menu>
        </el-aside>
  </div>
</template>

<script>
export default {
    props: {
        msg: {
            type: Array,
            default: () => [],
        },
    },
   
};
</script>

