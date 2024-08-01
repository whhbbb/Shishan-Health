"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "MyContent",
  setup(__props) {
    const functionList = common_vendor.ref([
      {
        img: common_assets.commentSvg,
        label: "我的评论"
      },
      {
        img: common_assets.forwardSvg,
        label: "我的转发"
      },
      {
        img: common_assets.collectionSvg,
        label: "我的收藏"
      },
      {
        img: common_assets.settingSvg,
        label: "设置"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(functionList.value, (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.label)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc88904c"], ["__file", "C:/Users/玛卡巴卡/Desktop/Web/shishan-health/src/pages/my/components/MyContent.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=MyContent.js.map
