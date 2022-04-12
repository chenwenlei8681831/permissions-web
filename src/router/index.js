import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

const login = (r) => require.ensure([], () => r(require('@/views/login.vue')), 'login');
const home = r => require.ensure([], () => r(require('@/views/home.vue')), 'home');
const serviceList = r => require.ensure([], () => r(require('@/views/service/serviceList.vue')), 'serviceList');
const companyList = r => require.ensure([], () => r(require('@/views/service/companyList.vue')), 'companyList');
const individualList = r => require.ensure([], () => r(require('@/views/service/individualList.vue')), 'individualList');
const infoList = r => require.ensure([], () => r(require('@/views/service/infoList.vue')), 'infoList');
const index = r => require.ensure([], () => r(require('@/views/commonVue/index.vue')), 'index');
const merchantsList = r => require.ensure([], () => r(require('@/views/pact/merchantsList.vue')), 'merchantsList');
const merchantsEdit = r => require.ensure([], () => r(require('@/views/pact/merchantsEdit.vue')), 'merchantsEdit');
const orderList = r => require.ensure([], () => r(require('@/views/pact/orderList.vue')), 'orderList');
const orderDetail = r => require.ensure([], () => r(require('@/views/pact/orderDetail.vue')), 'orderDetail');
const taskList = r => require.ensure([], () => r(require('@/views/task/taskList.vue')), 'taskList');
const taskDetail = r => require.ensure([], () => r(require('@/views/task/taskDetail.vue')), 'taskDetail');
const taskEdit = r => require.ensure([], () => r(require('@/views/task/taskEdit.vue')), 'taskEdit');
const applyList = r => require.ensure([], () => r(require('@/views/apply/applyList.vue')), 'applyList');
const applyDetail = r => require.ensure([], () => r(require('@/views/apply/applyDetail.vue')), 'applyDetail');
const kaoqinList = r => require.ensure([], () => r(require('@/views/publicity/kaoqinList.vue')), 'kaoqinList');

Vue.use(VueRouter);

//配置路由
const constantRoutes = [
    { path: '/', redirect: 'login' },
    { path: '/login', component: login },
    { path: '/home', component: home,
        children: [
            {   path: '/', redirect: '/home/service/serviceList' },
            {   path: '/home/service/serviceList', 
                component: serviceList, meta: {keepAlive: false } 
            },
            {   path: '/home/service/companyList', 
                component: companyList, meta: {keepAlive: false } 
            },
            {   path: '/home/service/individualList', 
                component: individualList, meta: {keepAlive: false } 
            },
            {   
                path: '/home/service/infoList', 
                component: infoList, meta: {keepAlive: false } 
            },
            {   path: '/home/commonVue/index', 
                component: index 
            },
            {   path: '/home/pact/merchantsList', 
                component: merchantsList, meta: {keepAlive: false } 
            },
            {   path: '/home/pact/pactOne/merchantsEdit', 
                component: merchantsEdit 
            },
            {   path: '/home/pact/pactOne/merchantsEdit/:id', 
                component: merchantsEdit 
            },
            {   path: '/home/pact/orderList', 
                component: orderList, meta: {keepAlive: false } 
            },
            {   path: '/home/pact/pactTwo/orderDetail/:id', 
                component: orderDetail 
            },
            {   path: '/home/task/taskOne/taskList', 
                component: taskList, meta: {keepAlive: false } 
            },
            {   path: '/home/task/taskOne/taskDetail/:id', 
                component: taskDetail 
            },
            {   path: '/home/task/taskOne/taskEdit/:id', 
                component: taskEdit 
            },
            {   path: '/home/task/taskOne/taskEdit', 
                component: taskEdit 
            },
            {   path: '/home/apply/applyOne', 
                component: applyList, 
                meta: {keepAlive: false } 
            },
            {   path: '/home/apply/applyOne/applyDetail/:id', 
                component: applyDetail 
            },
            {   path: '/home/publicity/publicityOne', 
                component: kaoqinList, meta: {keepAlive: false } 
            },
        ]
    },
];

//实例化VueRouter
const router = new VueRouter({
    routes: constantRoutes
});


router.beforeEach((to, from, next) => {
    store.dispatch("path", to.path);
    if (to.path === '/login') {
        next()
    } else {
        if(store.state.navmsg&&store.state.navmsg.length>0){
            next()
        }else{
            store.dispatch('GET_MENU').then(()=>{
                next();
            });
        };
    }
});
//将router暴露出去
export default router;