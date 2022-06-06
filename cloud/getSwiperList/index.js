// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:"cloud1-1glftjiwc5fdb570"
}
)

// 云函数入口函数
exports.main = async (event, context) => {
    return cloud.database().collection("swiperList").get();
}