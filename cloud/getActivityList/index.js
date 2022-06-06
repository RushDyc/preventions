// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
   if( event.action== "search" ) {
       return await cloud.database().collection("activityList").get()
   } else {
       return await cloud.database().collection("activityList").doc(event.id)
       .get()
   }
}