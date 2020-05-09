const app = getApp()
Component({
  properties: {
    // defaultData（父页面传递的数据-就是引用组件的页面）
    defaultData: {
      type: Object,
      value: {
        title: "我是默认标题"
      },
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
    extraHeight:20,
    menuTop: app.globalData.menuTop,

    searchKeyword: ''
  },
  attached: function () { 
  
  },
  methods: {
    search(e){
      this.setData({
        searchKeyword: e.detail.value
      })
      let rawUrl = getApp().globalData.host + '/search/basic?keyword=' + this.data.searchKeyword + "&from=0&size=5";
      wx.request({
        url: encodeURI(rawUrl),
        data: {},
        header: {'content-type':'application/json'},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result)=>{
          console.log(result.data.data);
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
    }
})