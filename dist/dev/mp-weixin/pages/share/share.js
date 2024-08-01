"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_TabBar = common_vendor.resolveComponent("TabBar");
  _component_TabBar();
}
if (!Math) {
  (CustomNavbar + ShareItem)();
}
const CustomNavbar = () => "../../components/CustomNavbar.js";
const ShareItem = () => "./components/ShareItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
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
          title: "交流分享",
          bgSrc: common_vendor.unref(common_assets.bgImg)
        }),
        b: common_vendor.p({
          selected: 3
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/玛卡巴卡/Desktop/Web/shishan-health/src/pages/share/share.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=share.js.map
