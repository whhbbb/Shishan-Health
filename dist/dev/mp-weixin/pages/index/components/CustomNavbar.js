"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CustomNavbar",
  setup(__props) {
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    console.log(safeAreaInsets);
    return (_ctx, _cache) => {
      var _a;
      return {
        a: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + 8 + "px"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/pages/index/components/CustomNavbar.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=CustomNavbar.js.map
