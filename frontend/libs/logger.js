// 一个专门用于打印日志的模块
export default function print(msg){
    // 获取当前时间
    let date = new Date();
    // 格式化时间为 yyyy-mm-dd hh:mm:ss
    let time = date.toLocaleString();
    console.log(`[${time}] ${msg}`);
}
