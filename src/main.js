import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

if (window.location.href.indexOf('.com')!='-1') {
    window.localStorage.host = 'http://apiflex.jszhr.com';
    window.localStorage.runType = 1;
} else {
    window.localStorage.host = '';
    window.localStorage.runType = 2;
};

//引入router
import router from '@/router';

//css:   引入ret  public
import '../public/css/reset.css';
import '../public/css/public.css';
import '../public/css/ele.css';
import '../public/css/me.css';
import '../public/css/flex.css';
import '../public/css/fontsize.css';
import '../public/css/color.css';

//js:    引入jquery rem echarts
// import $ from 'jquery';
// window.$ = $;
import rem from '../public/js/rem';
rem();

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(VueQuillEditor);

Vue.prototype.message = function (title,types) {
    //success error warning
    let type = types?types:'success';
    this.$message({
        type: type,
        message: title,
        dangerouslyUseHTMLString: true
    });
};

//引入vuex
import store from '@/store'
Vue.prototype.store = store;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')