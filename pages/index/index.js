const app = getApp();
Page({
  data: {
    // 组件参数设置，传递到组件
    defaultData: {
      title: "我的主页", // 导航栏标题
    },
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

    ]

  },

  
  onLoad() {

  },

  showResult: function(result){
    console.log(result);
    this.setData({
      questionList: result.detail.content
    })
  }

  


})