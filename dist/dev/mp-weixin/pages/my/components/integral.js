"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_personalInf = require("../../../services/personalInf.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "integral",
  setup(__props) {
    const credit = common_vendor.ref(0);
    const getPersonal = async () => {
      const res = await services_personalInf.getPersonalInf();
      console.log(res);
      credit.value = res.data.credit;
    };
    common_vendor.onLoad(() => {
      if (!common_vendor.index.getStorageSync("token")) {
        common_vendor.index.showToast({
          title: "您未登录！",
          icon: "none",
          duration: 1e3
        });
        return;
      }
      getPersonal();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "person-filled",
          size: "30"
        }),
        b: common_vendor.t(credit.value),
        c: common_vendor.p({
          type: "list",
          size: "80"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/my/components/integral.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=integral.js.map
