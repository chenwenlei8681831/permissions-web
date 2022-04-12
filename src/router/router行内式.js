import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/state.js'
Vue.use(VueRouter);

//配置路由
const routes = [{
        path: '/',
        redirect: 'login'
    },
    {
        path: '/login',
        component: () =>
            import( /*webpackChunkName:"group-index"*/ '../components/login.vue')
    },
    {
        path: '/home',
        component: () =>
            import( /*webpackChunkName:"group-index"*/ '../components/home.vue'),
        children: [{
                path: '/',
                redirect: '/home/service/serviceList'
            },
            {
                path: '/home/service/serviceList',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/service/serviceList.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/service/companyList',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/service/companyList.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/service/individualList',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/service/individualList.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/service/infoList',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/service/individualList.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/commonVue/index',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/commonVue/index.vue')
            },
            {
                path: '/home/pact/pactOne',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/pact/merchantsList.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/pact/pactOne/merchantsEdit',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/pact/merchantsEdit.vue')
            },
            {
                path: '/home/pact/pactOne/merchantsEdit/:id',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/pact/merchantsEdit.vue'),
            },
            {
                path: '/home/pact/pactTwo',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/pact/orderList.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/pact/pactTwo/orderDetail/:id',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/pact/orderDetail.vue'),
            },
            {
                path: '/home/task/taskOne/taskList',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/task/taskList.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/task/taskOne/taskDetail/:id',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/task/taskDetail.vue'),
            },
            {
                path: '/home/task/taskOne/taskEdit/:id',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/task/taskEdit.vue'),
            },
            {
                path: '/home/task/taskOne/taskEdit',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/task/taskEdit.vue'),
            },
            {
                path: '/home/apply/applyOne',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/apply/applyList.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/apply/applyOne/applyDetail/:id',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/apply/applyDetail.vue')
            },
            {
                path: '/home/publicity/publicityOne',
                component: () =>
                    import( /*webpackChunkName:"group-index"*/ '../components/views/publicity/kaoqinList.vue'),
                meta: {
                    keepAlive: true
                }
            }
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