"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ActivitySignIn",
  setup(__props) {
    const scan = () => {
      common_vendor.index.scanCode({
        success: (res) => {
          console.log(res);
          console.log("res.path", res.path);
          var path = res.path;
          const modifiedStr = path.replace("?scene=", "?id=");
          console.log(modifiedStr);
          common_vendor.index.navigateTo({
            url: "/" + modifiedStr
          });
        }
      });
    };
    common_vendor.onLoad(() => {
      if (!common_vendor.index.getStorageSync("token")) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none",
          duration: 1e3,
          complete: (res) => {
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: "/pages/login/login"
              });
            }, 1e3);
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => scan()),
        b: common_vendor.o(($event) => scan())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-82454ebc"], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/activity/ActivitySignIn.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=ActivitySignIn.js.map
