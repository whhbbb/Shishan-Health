"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_TabBar = common_vendor.resolveComponent("TabBar");
  _component_TabBar();
}
if (!Math) {
  (CustomNavbar + HomeContent)();
}
const CustomNavbar = () => "../../components/CustomNavbar.js";
const HomeContent = () => "./components/HomeContent.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const isDarkened = common_vendor.ref(false);
    const onScrolltolower = () => {
      console.log("触底了");
      common_vendor.index.$emit("scrolltolower");
    };
    const handleChooseWay = () => {
      isDarkened.value = !isDarkened.value;
    };
    common_vendor.onShow(() => {
      const curPages = getCurrentPages()[0];
      if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
        curPages.getTabBar().setData({
          selected: 0
          // 表示当前菜单的索引，该值在不同的页面表示不同
        });
      }
    });
    common_vendor.onHide(() => {
      isDarkened.value = false;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          position: "left",
          showLogo: true
        }),
        b: common_vendor.o(onScrolltolower),
        c: isDarkened.value ? "brightness(0.5)" : "brightness(1)",
        d: common_vendor.o(handleChooseWay),
        e: common_vendor.p({
          selected: 0
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/玛卡巴卡/Desktop/Web/shishan-health/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
