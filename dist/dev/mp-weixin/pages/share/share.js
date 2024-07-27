"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_TabBar = common_vendor.resolveComponent("TabBar");
  _component_TabBar();
}
const _sfc_main = {
  __name: "share",
  setup(__props) {
    common_vendor.onShow(() => {
      const curPages = getCurrentPages()[0];
      if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
        curPages.getTabBar().setData({
          selected: 3
          // 表示当前菜单的索引，该值在不同的页面表示不同
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          selected: 3
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/health_check-in/src/pages/share/share.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=share.js.map
