const app = getApp()
let timer;
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
    menuRight: wx.getSystemInfoSync().windowWidth - wx.getMenuButtonBoundingClientRect().left + 60,
    menuBotton: app.globalData.menuBotton,
    menuHeight: wx.getMenuButtonBoundingClientRect().height,
    extraHeight:20,
    menuTop: wx.getMenuButtonBoundingClientRect().top,

    searchKeyword: '',
  },
  attached: function () { 
  
  },
  methods: {
    search: function(e){
      this.setData({
        searchKeyword: e.detail.value
      });
      console.log('search()=>' + e.detail.value);
      this.searchWatching();
    },

    searchWatching: function(){
      clearTimeout(timer);
      let that = this;
      timer = setTimeout(function(){
        console.log('watching()=>' + that.data.searchKeyword);
        that.triggerEvent('search', that.data.searchKeyword);
      }, 500);
    },

    searchBlur: function(e){
      console.log('blur()=>' + e.detail.value);
      if(e.detail.value !== this.data.searchKeyword){
        clearTimeout(timer);
        this.triggerEvent('search', e.detail.value);
      }
    }
    }

})