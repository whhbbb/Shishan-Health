"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_my = require("../../../services/my.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "contactUs",
  setup(__props) {
    const content = common_vendor.ref([]);
    const getConnection = async () => {
      const res = await services_my.getConnect();
      console.log(res.rows);
      content.value = res.rows;
    };
    common_vendor.onLoad(() => {
      getConnection();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(content.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.number),
            c: common_vendor.t(item.email),
            d: item.name
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/my/components/contactUs.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=contactUs.js.map
