auto();

setScreenMetrics(1080, 1920);

let utils = require('./base/common_utils.js');
log("device width:" + device.width + ", height:" + device.height);
if (!requestScreenCapture(true)) {
    // 全局只需要请求一次
    toastLog("请求截屏失败");
    exit();
}
utils.test("utils工具包导入正常");

utils.killApp("冰雪复古");

launchApp("冰雪复古");

utils.findPic("login/切换账号.png", 1657, 203);

utils.findPic("login/关闭.png", 0, 0, true);

utils.findPic("login/开始游戏.png", 0, 0, true);

utils.findPic("login/进入游戏.png", 0, 0, true);

utils.findPic("login/确定.png", 0, 0, true);

var result = utils.findPic("login/拾取.png", 0, 0);

if (result) {
    toastLog("登录成功！！！");
} else {
    toastLog("登录失败！！！");
}

exit();