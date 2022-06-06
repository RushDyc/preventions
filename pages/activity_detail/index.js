// pages/activity_detail/index.js
let ID = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailList:[],
        isCollect:false,
        isEnr:false
    },

    EnrInfo:[],
    /**
     * 生命周期函数--监听页面加载
     */
    onShow() {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        ID = options._id;
        console.log(ID);
        this.getDetailList();
    },
    async getDetailList() {
        wx.cloud.callFunction({
            name:"getActivityList",
            data:{
                action:"list",
                id:ID
            }
        })
        // const activityList = await callFunction({name:"getActivityList",data:{action:"action"}});
        .then(res =>{
            // console.log(res);
            
            this.setData({
                detailList:res.result.data,
                isCollect,
                isEnr
            })
            this.EnrInfo = res.result.data;
            // console.log(this.EnrInfo);
            // 1 获取缓存中的商品收藏的数组
            let collect = wx.getStorageSync("collect") || [];
            // 2 判断当前商品是否被收藏
            let isCollect = collect.some(v => v._id === this.EnrInfo._id);
            // 3 获取缓存中报名 数组
            let enr = wx.getStorageSync("enr")||[];
            // 4 判断 活动对象是否存在于 报名数组中
            let isEnr = enr.some(v=>v._id===this.EnrInfo._id);
        })
    },

    //点击报名活动
    handleEnrAdd(){
        let isEnr=false;
          // console.log("baominghuodong");
          // 1 获取缓存中报名 数组
          let enr = wx.getStorageSync("enr")||[];
          // 2 判断 活动对象是否存在于 报名数组中
          let index=enr.findIndex(v=>v._id===this.EnrInfo._id);
          if(index!==-1) {
              //不存在 第一次添加
              // enr.splice(index,1);
              isEnr=false;
              wx.showToast({
                title: '您已报名过活动',
                icon: 'success',
                mask: true
              });
          // } else {
          //     // 已经存在数据 
          //     wx.showToast({
          //         title: '已报名该活动',
          //     icon: 'fail',
          //     //true 防止用户手抖 疯狂点击按钮
          //     mask: true
          //     })
          } else {
              // 没有报名过
              enr.push(this.EnrInfo);
              isEnr=true;
              wx.showToast({
                title: '报名成功',
                icon: 'success',
                mask: true
              });
            }
          // 报名数据重新添加到缓存中
          wx.setStorageSync("enr", enr);
          //
          this.setData({
            isEnr
          })
          ;
      },
      // 点击 商品收藏图标
    handleCollect(){
      let isCollect=false;
      // 1 获取缓存中的商品收藏数组
      let collect=wx.getStorageSync("collect")||[];
      // 2 判断该商品是否被收藏过
      let index=collect.findIndex(v=>v._id===this.EnrInfo._id);
      // 3 当index！=-1表示 已经收藏过 
      if(index!==-1){
        // 能找到 已经收藏过了  在数组中删除该商品
        collect.splice(index,1);
        isCollect=false;
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          mask: true
        });
          
      }else{
        // 没有收藏过
        collect.push(this.EnrInfo);
        isCollect=true;
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          mask: true
        });
      }
      // 4 把数组存入到缓存中
      wx.setStorageSync("collect", collect);
      // 5 修改data中的属性  isCollect
      this.setData({
        isCollect
      })
      }
    
})