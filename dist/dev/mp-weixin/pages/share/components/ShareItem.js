"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "ShareItem",
  setup(__props) {
    const isCommenting = common_vendor.ref(false);
    const openComment = () => {
      isCommenting.value = !isCommenting.value;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(1, (index, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(openComment),
        c: isCommenting.value
      }, isCommenting.value ? {} : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/玛卡巴卡/Desktop/Web/shishan-health/src/pages/share/components/ShareItem.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=ShareItem.js.map
