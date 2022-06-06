// pages/comment_detail/index.js
import{ callFunction }from "../../request/index.js";
import regeneratorRuntime from "../../libs/runtime/runtime";
let comList = [];
let userInfo = {};
let ID = ''
Page({

    data: {
        newList:{},
        comList:[],
        content:"",
        userInfo:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow() {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        // console.log("接受的id",options);
        // const {_id}=options;
        ID = options._id;
        // console.log(ID);
        this.getNewList(ID);
        this.getComList(ID);
        // this.getNewList(_id);
        // console.log(_id);
        const userInfo = wx.getStorageSync("userinfo")||[];
        this.setData({
            userInfo
        })
        // console.log(userInfo)
        // this.setData({
        //     userInfo
        // })
        
        
        
    },
    // getNewList(comment_id) {
    //     wx.cloud.callFunction( {
    //         name:"getCommentList",
    //         data:{
    //             _id:""
    //         }
    //     })
    //     .then(result => {
    //         this.setData({
    //             newList:result.result.data
    //         })
    //     }

    //     )
    // }
    // async getNewList(_id) {
    //     const newList = await callFunction({name:"getCommentList",data:{_id}});
    //     console.log(newList);
    //     // this.setData({
    //     //     newList
    //     // })
    // }
    getNewList(id) {
        wx.cloud.database().collection("commentList")
        .doc(id)
        .get()
        .then(result=>{
            this.setData({
                newList:result.data
            })
            // console.log(result);
        })
    },

    getComList(id) {
        wx.cloud.database().collection("comList")
        .doc(id)
        .get()
        .then(result => {
            // console.log(result.data.content);
            this.setData({
                comList:result.data.content,
                newComList:result.data.content
            })
            // console.log(result.data.content);
        },
        // comList = comList,
        
        )
    },


    getContent(e) {
        this.setData({
            content:e.detail.value
        })
        // console.log(content);
    },
    bindleGetCom() {
        let content = this.data.content;
        if(content.length < 4) {
            wx.showToast({
                title: '评论较短，请添加',
                icon: 'none'
            });
        return
        }
        
        let comListItem = {}
        comListItem.name = this.data.userInfo.nickName;
        comListItem.content = content;
        comListItem.image_src = this.data.userInfo.avatarUrl;
        this.data.comList.push(comListItem)
        // console.log(comList);
        wx.showLoading({
            title: "发送中..."
        });
        wx.cloud.callFunction({
            name:"getComList",
            data:{
                content:this.data.comList,
                id:ID
            }
        })
        .then(res=>{
            // console.log("发表成功",res)
            this.setData({
                comList:this.data.comList,
                content:""
            })
            wx.hideLoading();
        })
    },
    getUserProfile(e){
        wx.getUserProfile({
            desc: '获取你的昵称、头像、地区及性别',
            success: (res) => {
                this.setData({
                    userInfo: res.userInfo
                })
                const {userInfo}=res;
                wx.setStorageSync("userinfo", userInfo);
              },
              
            });
        // const {userInfo}=userInfo;
        // wx.setStorageSync("userInfo", userInfo);
        wx.navigateBack({
            delta: 1
        })
    }
})