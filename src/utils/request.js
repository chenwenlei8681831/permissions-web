import axios from 'axios';
import { Loading,Message } from 'element-ui';

/*
*   success:成功的回调
*   error:失败的回调
*   array=>不传默认为[0,0,0],  array[0]:加载动画 array[1]:错误提示 array[2]:同步执行(为1时,this必传)
*   method:请求方式  默认:post
*   THIS:vue实例对象(非必传)
*/
let my_request = function (url,data={},method,success,error,array=[0,0,0],THIS){
  if (array[2]&&array[2]==1&&THIS) {
    if (THIS.request_single_flag) { return false };
    THIS.request_single_flag = true;
  };
  let request_url = window.localStorage.host + url;
  let requestObject = {
      method:method?method:'post',
      url:request_url,
      data:data
  };
  if(url != '/login'){
      requestObject.headers = {
          token:window.localStorage.flexible_manage_token
      }
  };
  let loading;
  if (array[0] == 1) {
      loading = Loading.service({lock: true,text: 'Loading',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0)'});
  };
  axios(requestObject).then(res=>{
      if (array[0] == 1) { loading.close() };
      if (array[2]&&array[2]==1&&THIS) {
        THIS.request_single_flag = false;
      };
      if (res.data.code==200){
          success(res.data.data);
      }else{
          if(error){ error(res.data.msg) };
          if(array[1]&&array[1]==1) { Message({ message: res.data.msg, type: 'error' }) };
      };
  }).catch(err => {
      if(error){ 
        error(err) 
      };
      if(array[1]&&array[1]==1) { 
        Message({ message: '网络错误，请稍后重试！', type: 'error' }) 
      };
      if (array[2]&&array[2]==1&&THIS) {
        THIS.request_single_flag = false;
    };
  })
};

export default my_request;
