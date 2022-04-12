import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/state.js';
import login from '../components/login.vue';
import home from '../components/home.vue';
import serviceList from '../components/views/service/serviceList.vue';
import companyList from '../components/views/service/companyList.vue';
import individualList from '../components/views/service/individualList.vue';
import infoList from '../components/views/service/individualList.vue';
import index from '../components/views/commonVue/index.vue';
import merchantsList from '../components/views/pact/merchantsList.vue';
import merchantsEdit from '../components/views/pact/merchantsEdit.vue';
import orderList from '../components/views/pact/orderList.vue';
import orderDetail from '../components/views/pact/orderDetail.vue';
import taskList from '../components/views/task/taskList.vue';
import taskDetail from '../components/views/task/taskDetail.vue';
import taskEdit from '../components/views/task/taskEdit.vue';
import applyList from '../components/views/apply/applyList.vue';
import applyDetail from '../components/views/apply/applyDetail.vue';
import kaoqinList from '../components/views/publicity/kaoqinList.vue';

Vue.use(VueRouter);

//配置路由
const routes = [
    { path: '/', redirect: 'login' },
    { path: '/login', component: login },
    { path: '/home', component: home,
        children: [
            { path: '/', redirect: '/home/service/serviceList' },
            { path: '/home/service/serviceList', component: serviceList, meta: {keepAlive: true } },
            { path: '/home/service/companyList', component: companyList, meta: {keepAlive: true } },
            { path: '/home/service/individualList', component: individualList, meta: {keepAlive: true } },
            { path: '/home/service/infoList', component: infoList, meta: {keepAlive: true } },
            { path: '/home/commonVue/index', component: index },
            { path: '/home/pact/pactOne', component: merchantsList, meta: {keepAlive: true } },
            { path: '/home/pact/pactOne/merchantsEdit', component: merchantsEdit },
            { path: '/home/pact/pactOne/merchantsEdit/:id', component: merchantsEdit },
            { path: '/home/pact/pactTwo', component: orderList, meta: {keepAlive: true } },
            { path: '/home/pact/pactTwo/orderDetail/:id', component: orderDetail },
            { path: '/home/task/taskOne/taskList', component: taskList, meta: {keepAlive: true } },
            { path: '/home/task/taskOne/taskDetail/:id', component: taskDetail },
            { path: '/home/task/taskOne/taskEdit/:id', component: taskEdit },
            { path: '/home/task/taskOne/taskEdit', component: taskEdit },
            { path: '/home/apply/applyOne', component: applyList, meta: {keepAlive: true } },
            { path: '/home/apply/applyOne/applyDetail/:id', component: applyDetail },
            { path: '/home/publicity/publicityOne', component: kaoqinList, meta: {keepAlive: true } },
        ]
    },
];

//实例化VueRouter
const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    store.dispatch("path", to.path);
    if (to.path === '/login') {
        next()
    } else {
        if (store.state.navmsg.length === 0) {
            store.dispatch('userType', window.localStorage.getItem("userType")).then(() => {
                next()
            })
        } else {
            next()
        }
    }
})
//将router暴露出去
export default router;