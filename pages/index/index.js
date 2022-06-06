// const db = wx.cloud.database().collection('swiperList');
import{ callFunction }from "../../request/index.js";
import regeneratorRuntime from "../../libs/runtime/runtime";
//Page Object
Page({
  data: {
    swiperList:[],
    catesList:[],
    commentList:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList();
    this.getCateList();
    this.getCommentList();
  },

  handleGetnav(){
    // console.log(e);
    wx.navigateToMiniProgram({
      appId:'wx2ac2313767a99df9',
      path:'',
      extraData:{},
      envVersion:'release',
    });
  },

  handleGetOut() {
    wx.navigateToMiniProgram({
      appId:'wx8f446acf8c4a85f5',
      path:'',
      extraData:{},
      envVersion:'release',
    });
  },

  getSwiperList(){ 
    // console.log(swiperList);
    // database("swiperList")
    //   .then(result=>{
    //     this.setData({
    //       swiperList:result
    //     })
    //   })
    
    //调用数据库
    // wx.database().collection("swiperList")
    // database(swiperList)
    // db.get({
    //     // success:(result)=>{
    //       success:(result)=> {
    //         // console.log("获取数据成功",result);
    //         this.setData({
    //                 swiperList:result.data
    //               })
    //     }
    // })
    
    //调用云函数
    wx.cloud.callFunction({
      name:"getSwiperList"
    })
    .then(result=>{
        // console.log("获取数据成功",result.result);
          this.setData({
            swiperList:result.result.data
            })
          })
  },

  getCateList() {
    wx.cloud.callFunction({
      name:"getCateList",
      // success:res => {
      //   console.log("获取数据成功",res);
      // },
      // fail: err => {
      //   console.log("获取数据失败",);
      // }
    })
    .then(result=>{
        // console.log("获取数据成功",result.result);
      this.setData({
        catesList:result.result.data
      })
    })
  },

  // getCommentList() {
  //   // wx.cloud.callFunction({
  //   //   name:"getCommentList"
  //   // })
  //   // .then(result=>{
  //   //   // console.log("获取数据成功",result.result);
  //   //   this.setData({
  //   //     commentList:result.result.data
  //   //   })
  //   // }

  //   // )
    
  // }
  async getCommentList() {
    const commentList = await callFunction({name:"getCommentList"});
    // console.log(res);
    this.setData({
      commentList
    })
}
});
