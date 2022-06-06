// pages/report/index.js
Page({

    data: {
        healthItem:[
            {
                id:0,
                name: "自觉正常",
                value: "自觉正常"
            },
            {
                i:1,
                name: "发热37.3℃（含）以上",
                value: "发热37.3℃（含）以上"
            },
            {
                i:2,
                name: "干咳",
                value: "干咳"
            },
            {
                i:3,
                name: "乏力",
                value: "乏力"
            },
            {
                id:4,
                name: "鼻塞流涕",
                value: "鼻塞流涕"
            },
            {
                id:5,
                name: "咽痛",
                value: "咽痛"
            },
            {
                id:6,
                name: "其他症状",
                value: "其他症状"
            }
        ],
        peopleItem:[
            {
                id:0,
                name: "一直在广州3个月或以上",
                value: "一直在广州3个月或以上"
            },
            {
                id:1,
                name: "来或返回广州超过14日少于3个月",
                value: "来或返回广州超过14日少于3个月"
            },
            {
                id:2,
                name: "来或返回广州不超过14日（含14日）",
                value: "来或返回广州不超过14日（含14日）"
            },
            {
                id:3,
                name: "计划来/返回广州，目前仍在外地",
                value: "计划来/返回广州，目前仍在外地"
            }
        ],
        // healthList:[],
        // peopleList:{}
        messageList:[],
        message:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow() {
        const message = wx.getStorageSync("message");       
        this.setData({message})
    },
    // hindleGetChange(e) {
    //     // const checked = e.detail.value
    //     // console.log(e);
    //     const healthList = e.detail.value;
    //     this.setData({
    //         healthList
    //     })
    // },
    // handleGetPeople(e){
    //     const peopleList = e.detail.value;
    //     this.setData({
    //         peopleList
    //     })
    // }
    formSubmit: function(e) {
    //     console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //   },
    //   formReset: function() {
    //     console.log('form发生了reset事件')
    //   }
        const messageList =e.detail.value;
        this.setData({
            messageList
        })
        // console.log(message);
        wx.setStorageSync("message", messageList);
        wx.showToast({
            title: '提交成功',
            icon: 'success'
        });
    },
    // formReset: function() {

    // }
})