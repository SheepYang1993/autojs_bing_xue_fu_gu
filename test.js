auto();

setScreenMetrics(1920, 1080);

let utils = require('./base/common_utils.js');
log("device width:" + device.width + ", height:" + device.height);
if (!requestScreenCapture(true)) {
    // 全局只需要请求一次
    toastLog("请求截屏失败");
    exit();
};
utils.test("utils工具包导入正常");

utils.killApp("冰雪复古");

