const app = getApp();
Page({
  data: {
    // 组件参数设置，传递到组件
    defaultData: {
      title: "我的主页", // 导航栏标题
    },
    img: "../../static/index_img/question01.png",
    questionList:[
      {
        img:"../../static/index_img/question01.png",
        title:"上会儿网为什么就困了？",
        classify:"社会科学",
        credit_num:"5",
        subtitle:"关于信息时代“信息消费疲倦”的用户调查",
        people:"200"


      },
      {
        img: "../../static/index_img/question01.png",
        title: "你在童年时害怕什么",
        classify: "心理健康",
        credit_num: "5",
        subtitle: "关于儿童恐惧心理及安抚的用户调查",
        people: "50"
      },
      {
        img: "../../static/index_img/question01.png",
        title: "疫情缓解，你会报复性消费吗",
        classify: "心理健康",
        credit_num: "5",
        subtitle: "关于近期网店销售的的用户调查",
        people: "50"
      },
      {
        img: "../../static/index_img/question01.png",
        title: "你在童年时害怕什么",
        classify: "心理健康",
        credit_num: "5",
        subtitle: "关于儿童恐惧心理及安抚的用户调查",
        people: "50"
      },
      {
        img: "../../static/index_img/question01.png",
        title: "你在童年时害怕什么",
        classify: "心理健康",
        credit_num: "5",
        subtitle: "关于儿童恐惧心理及安抚的用户调查",
        people: "50"
      }

    ],
    searchKeyword: '',
    searchPage: 0,
    searchPageSize: 5,
    isSearchEnd: false,
    searchTip: null

  },

  
  onLoad() {

  },

  search: function(keyword){
    this.setData({
      searchKeyword: keyword,
      searchPage: 0,
      isSearchEnd: false
    });

    wx.pageScrollTo({
      scrollTop: 0
    });

    let realKeyword = keyword.detail;

    if(keyword.detail.value != null){
      realKeyword = keyword.detail.value;
    }

    let rawUrl = getApp().globalData.host + '/search/basic?keyword=' + realKeyword + '&from=' + this.data.searchPage + '&size=' + this.data.searchPageSize;
    console.log(rawUrl);
    wx.request({
      url: encodeURI(rawUrl),
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        this.setData({
          questionList: result.data.data.content,
          searchPage: 1
        });
        if(result.data.data.content.length < this.data.searchPageSize){
          this.setData({
            isSearchEnd: true
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  
  onReachBottom: function(){
    if(this.data.isSearchEnd === false){
      let rawUrl = getApp().globalData.host + '/search/basic?keyword=' + this.data.searchKeyword.detail + '&from=' + (this.data.searchPage * this.data.searchPageSize - 1) + '&size=' + this.data.searchPageSize;
      console.log(rawUrl);
      wx.request({
        url: encodeURI(rawUrl),
        data: {},
        header: {'content-type':'application/json'},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result)=>{
          this.setData({
            questionList: this.data.questionList.concat(result.data.data.content),
            searchPage: this.data.searchPage + 1
          });

          if(result.data.data.content.length < this.data.searchPageSize){
            this.setData({
              isSearchEnd: true,
              searchTip: '到底部啦'
            });
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });      
    }
  }

  


})