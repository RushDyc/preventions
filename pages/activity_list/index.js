// pages/activity_list/index.js
import{ callFunction }from "../../request/index.js";
import regeneratorRuntime from "../../libs/runtime/runtime";
Page({

    data: {
        activityList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getActivityList();
    },
    async getActivityList() {
        wx.cloud.callFunction({
            name:"getActivityList",
            data:{
                action:"search"
            }
        })
        // const activityList = await callFunction({name:"getActivityList",data:{action:"action"}});
        .then(res =>{
            // console.log(res);
            this.setData({
                activityList:res.result.data
            })
            wx.stopPullDownRefresh();
        })
        
    }
   
})