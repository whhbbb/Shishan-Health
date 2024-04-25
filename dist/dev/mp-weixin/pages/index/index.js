"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_XsSwiper2 = common_vendor.resolveComponent("XsSwiper");
  _easycom_XsSwiper2();
}
const _easycom_XsSwiper = () => "../../components/XsSwiper.js";
if (!Math) {
  (CustomNavbar + _easycom_XsSwiper + HomeContent)();
}
const CustomNavbar = () => "./components/CustomNavbar.js";
const HomeContent = () => "./components/HomeContent.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const onScrolltolower = () => {
      console.log("触底了");
      common_vendor.index.$emit("scrolltolower");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onScrolltolower)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
