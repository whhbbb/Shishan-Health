"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
require("./stores/modules/member.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/my/my.js";
  "./pages/column/column.js";
  "./pages/column/components/article.js";
  "./pages/activity/ActivityLaunch.js";
  "./pages/activity/ActivityEdit.js";
  "./pages/activity/ActivitySignIn.js";
  "./pages/gift/giftCenter.js";
  "./pages/gift/gift.js";
  "./pages/gift/components/orderList.js";
  "./pages/my/components/editPassword.js";
  "./pages/recommend/recommend.js";
  "./pages/recommend/recommendDetail.js";
  "./pages/activity/ActivityDetails.js";
  "./pages/my/components/myactivity/activity.js";
  "./pages/my/components/integral.js";
  "./pages/recommend/makeRecd.js";
  "./pages/my/components/wx.js";
  "./pages/my/components/contactUs.js";
  "./pages/my/components/history.js";
  "./pages/my/components/aboutUs.js";
  "./pages/my/components/feedBack.js";
  "./pages/my/components/editUser.js";
  "./pages/my/components/userImage.js";
  "./pages/activity/SignCheck.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("App Launch");
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(stores_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=app.js.map
