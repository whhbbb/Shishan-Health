"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CustomNavbar",
  props: {
    position: {
      type: String,
      default: "center"
    },
    title: {
      type: String,
      default: "狮山健康"
    },
    showBack: {
      type: Boolean,
      default: false
    },
    showLogo: {
      type: Boolean,
      default: false
    },
    bgSrc: {
      type: String,
      default: common_assets.bgImage
    }
  },
  setup(__props) {
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    console.log(safeAreaInsets);
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: __props.showBack
      }, __props.showBack ? {} : {}, {
        b: common_vendor.o(handleBack),
        c: __props.showLogo
      }, __props.showLogo ? {} : {}, {
        d: common_vendor.t(__props.title),
        e: common_vendor.n("navbar " + __props.position),
        f: __props.bgSrc,
        g: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + 8 + "px"
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/玛卡巴卡/Desktop/Web/shishan-health/src/components/CustomNavbar.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=CustomNavbar.js.map
