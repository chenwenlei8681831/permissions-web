import Vue from 'vue';
import Vuex from 'vuex';
import my_request from '@/utils/request.js';
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        pageText: '',
        backnavIndex: 0, //上一次的index
        navIndex: 0,
        navmsg: [],
        path: ""
    },
    actions: {
        path({ commit }, path) {
            commit('setpath', path)
        },
        GET_MENU({ commit }){
            let promise = new Promise((resolve,reject)=>{
                my_request('/getMenus',{},'get',(msg)=>{
                    window.localStorage.szrl_navmsg = JSON.stringify(msg);
                    commit('set_menu',msg.list)
                    resolve(msg);
                });
            });
            return promise;
        },
    },
    mutations: {
        setpath(state, path) {
            state.path = path;
        },
        setPageText(state, msg) {
            state.pageText = msg;
        },
        setNavIndex(state, msg) {
            state.navIndex = msg;
        },
        setBackNavIndex(state, msg) {
            state.backnavIndex = msg;
        },
        set_menu(state,msg){
            state.navmsg = msg;
        },
    }

});

export default store;