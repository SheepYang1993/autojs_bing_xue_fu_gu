setScreenMetrics(1920, 1080);

let utils = require('../base/common_utils.js');
if (!requestScreenCapture()) {
    // 全局只需要请求一次
    toastLog("请求截屏失败");
    exit();
}
utils.test("utils工具包导入正常");

console.show();

var savePath = "../assets/img/capture.png";

var inputStr = "";
while (inputStr != "0") {
    inputStr = console.rawInput(" 请输入坐标及宽高:\n x,y,x2,y2");

    var x = inputStr.split(",")[0];
    var y = inputStr.split(",")[1];
    var x2 = inputStr.split(",")[2];
    var y2 = inputStr.split(",")[3];
    console.log(" 参数:\n x:" + x + ", y:" + y + "\n x2:" + x2 + ", y2:" + y2 + "\n");

    utils.capture2(x, y, x2, y2, savePath);
}
console.clear();
console.hide();
exit();