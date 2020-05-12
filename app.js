//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let topObject = wx.getMenuButtonBoundingClientRect();
    console.log(topObject);


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var reqTask = wx.request({
          url: getApp().globalData.host + '/login?code=' + res.code,
          data: {},
          header: {'content-type':'application/json'},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result)=>{
            console.log(result.data.data);
            console.log(result.data.data.sessionId);
            getApp().globalData.header.cookie = 'JSESSIONID=' + result.data.data.sessionId;
            this.getInfo();
          },
          fail: ()=>{

          },
          complete: ()=>{

          }
        });

      }
    });

    // 获取用户信息

  },
  getInfo(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res);
              let header = getApp().globalData.header;
              console.log(header)
              wx.request({
                url: getApp().globalData.host + '/login/userInfo',
                data: {
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,
                  gender: res.userInfo.gender
                },
                dataType: 'json',
                header: header,
                method: 'POST',
                success: (result)=>{
                  console.log(result.data);
                },
                fail: ()=>{},
                complete: ()=>{}
              });
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else{
          console.log("失败");
          console.log(res);
        }
      },
      fail: res => {
        console.log(res);
      }
    })
  },
  globalData: {
    userInfo: null,
    header: {
      'cookie': '',
      'content-type':'application/x-www-form-urlencoded'
    },
    host: 'https://api.wxques.nowcent.cn',
    // host: 'http://localhost:9898'
    menuTop: 0
  }
})