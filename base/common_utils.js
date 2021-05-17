setScreenMetrics(1080, 1920);
var utils = {};
utils.killApp = function(appName) {
    var packageName = app.getPackageName(appName);
    toastLog("要关闭包名:" + packageName);

    app.openAppSetting(packageName);
    toastLog("打开设置页");
    text(appName).waitFor();
    toastLog("已经打开应用设置页了");
    let is_sure = text("结束运行").findOne();
    toastLog("发现关闭按钮了");
    if (is_sure.enabled()) {
        textContains("结束").findOne().click();
        toastLog("点击结束按钮");
        click("结束运行");
        text("确定").findOne().click();
        toastLog(appName + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        toastLog(appName + "应用不能被正常关闭或不在后台运行");
        back();
    }
}

utils.click = function(x, y, width, height) {
    if (width != null && height != null) {
        var x1 = (x + (width / 2));
        var y1 = (y + (height / 2));
        log("点击x:" + x1 + ", y:" + y1);
        click(x1, y1);
    } else {
        log("点击x:" + x + ", y:" + y);
        click(x, y);
    }
}

utils.test = function(text) {
    log(text);
};

// 截取图片的部分,根据左上角点和图片宽高
utils.capture = function(x, y, width, height, savePath) {
    var screenImg = captureScreen();
    var clip = images.clip(screenImg, x, y, width, height);
    images.save(clip, savePath);
};

// 截取图片的部分,根据左上角点和右下角点
utils.capture2 = function(x1, y1, x2, y2, savePath) {
    var width = x2 - x;
    var height = y2 - y;
    var screenImg = captureScreen();
    var clip = images.clip(screenImg, x, y, width, height);
    images.save(clip, savePath);
};

// 保存屏幕截图 path:截屏保存路径
utils.screenCapture = function(path) {
    log("开始截屏");
    var img = captureScreen();
    images.save(img, path);
    log("屏幕截图成功!");
    return img;
}

// 全屏寻找图片，直到找到图,times寻找时间，单位毫秒)，-1无限循环
utils.findUntil = function(imgPathSub, x, y, times) {
    var imgPath = "/sdcard/脚本/冰雪复古/assets/img/" + imgPathSub;
    var img = images.read(imgPath);
    var  nowDate = new Date();
    var lastDate = new Date();
    var diffTime = 0;
    var canLoop = (diffTime <= times) || (times == -1);
    var result = false;
    while (canLoop) {
        // 一直循环截图，找图
        if (img != null) {
            log("正在全屏截图中寻找" + imgPath);
            //截图并找图 
            result = findImage(captureScreen(), img, {
                region: [x, y],
                threshold: 0.8
            });
            if (result) {
                log("找到图片啦，path:" + imgPath);
                break;
            }
        }
        // 停顿1000毫秒，防止卡顿
        sleep(1000);
        lastDate = new Date();
        diffTime = lastDate.getTime() - nowDate.getTime();
        canLoop = (diffTime <= times) || (times == -1);
        log("path:" + imgPath + "\n正在查找图片，相差时间:" + diffTime + ", times" + times);
    }
    img.recycle();
    return result;
}

utils.findPic = function(imgName, x, y, clickable) {
    var result = true;
    while (result) {
        result = utils.findUntil(imgName, x, y, -1);
        if (result) {
            break;
        } else {
            result = true
        };
    }

    if (clickable) {
        var imgPath = "/sdcard/脚本/冰雪复古/assets/img/" + imgName;
        var img = images.read(imgPath);
        var width = img.getWidth();
        var height = img.getHeight();
        utils.click(result.x, result.y, width, height);
    }
    return result;
}

module.exports = utils;