
// 세션 관련 함수
function sessionCreate(object){
  axios.post('http://'+ host +':3000/session/create', object);
}

function sessionDelete(){
  axios.post('http://'+ host +':3000/session/delete');
}

function sessionCheck(){
  axios.post('http://'+ host +':3000/session/check')
  .then(function(res){
      let message = res.data.message,
          session = res.data.session;

      if(message === "true"){
        console.log("seesion type : " + session.type);
        if(session.type == "gl") {
          gl_loginElement(session);    
        } else if(session.type == "fb"){   
          fb_loginElement(session);  
        }
      } else if(message === "false"){
        console.log("not session");
      }
   });
}


// 로그인시 키 세팅 함수
function keySetting(){
  axios({
     method: 'post',
     url: 'http://'+ host +':3000/setting'
   }).then(function(res){
     var data = res.data
     sever_host = data.host;
     google_oauthInit(data.google_client_id);
     facebook_setAppId(data.facebook_app_id);
   });
}


/*
  시간 구하는 함수
 */
function newDateForm(d) {
  let tmp = Math.floor(d / 1000);
  if (tmp < 60) {
    return tmp + '초 전';
  } else if (tmp < 60 * 60) {
    return Math.floor(tmp / 60) + '분 전';
  } else if (tmp < 60 * 60 * 24) {
    return Math.floor(tmp / (60 * 60)) + '시간 전';
  } else if (tmp < 60 * 60 * 24 * 365) {
    return Math.floor(tmp / (60 * 60 * 24)) + '일 전';
  } else {
    return Math.floor(tmp / (60 * 60 * 24 * 365)) + '년 전';
  }
}
