"use strict";
const common_vendor = require("../common/vendor.js");
require("../stores/index.js");
const httpInterceptor = {
  // 拦截前触发
  invoke(options) {
    if (!options.url.startsWith("http")) {
      options.url = "https://47.115.213.253:3166" + options.url;
    }
    options.timeout = 1e4;
    options.header = {
      ...options.header
      // 'source-client': 'miniapp'
    };
    const token = common_vendor.index.getStorageSync("token");
    if (token) {
      options.header.Authorization = `Bearer ${token}`;
    }
  }
};
common_vendor.index.addInterceptor("request", httpInterceptor);
common_vendor.index.addInterceptor("uploadFile", httpInterceptor);
const whiteList = [
  "/pages/index/index",
  "/pages/login/login",
  "/pages/column/column",
  "/pages/column/components/article",
  "/pages/recommend/recommend",
  "/pages/recommend/recommendDetail",
  "/pages/activity/ActivityDetails",
  "/pages/my/components/contactUs",
  "/pages/my/components/aboutUs",
  "/pages/gift/giftCenter"
];
const loginPage = "/pages/login/login";
const initPermission = {
  invoke(e) {
    console.log("拦截", e);
    const token = common_vendor.index.getStorageSync("token"), url = e.url.split("?")[0];
    const notNeed = whiteList.includes(url);
    if (notNeed) {
      return e;
    } else {
      if (!token) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none",
          duration: 1e3,
          complete: () => {
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: loginPage
              });
            }, 1e3);
          }
        });
        return false;
      } else {
        return e;
      }
    }
  },
  fail(err) {
    console.log(err);
  }
};
common_vendor.index.addInterceptor("navigateTo", initPermission);
common_vendor.index.addInterceptor("switchTab", initPermission);
common_vendor.index.addInterceptor("reLaunch", initPermission);
common_vendor.index.addInterceptor("redirectTo", initPermission);
const http = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      ...options,
      success(res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.code == 410) {
          common_vendor.index.showToast({
            title: "登录过期",
            icon: "none",
            duration: 1e3,
            complete: () => {
              setTimeout(() => {
                common_vendor.index.removeStorageSync("token");
                common_vendor.index.navigateTo({
                  url: "/pages/login/login"
                });
              }, 1e3);
            }
          });
          reject(res);
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
          reject(res);
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: res.data.msg || "请求失败"
          });
          reject(res);
        }
      },
      fail(err) {
        common_vendor.index.showToast({
          icon: "none",
          title: err.errMsg || "网络错误，请换个网络试试"
        });
        reject(err);
      }
    });
  });
};
exports.http = http;
//# sourceMappingURL=http.js.map
