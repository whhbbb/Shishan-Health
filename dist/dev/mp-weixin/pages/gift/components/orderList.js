"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_gift = require("../../../services/gift.js");
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
  __name: "orderList",
  setup(__props) {
    common_vendor.onLoad(() => {
      console.log("onload??");
      if (common_vendor.index.getStorageSync("token")) {
        getHistory();
      } else {
        isLogin.value = false;
      }
    });
    common_vendor.onShow(() => {
      if (common_vendor.index.getStorageSync("token")) {
        getHistory();
      }
    });
    const isLogin = common_vendor.ref(true);
    const goLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const getHistory = async () => {
      const res = await services_gift.getGiftHistory();
      console.log(res);
      orders.value = res.rows;
    };
    const orders = common_vendor.ref([]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLogin.value
      }, isLogin.value ? common_vendor.e({
        b: orders.value.length !== 0
      }, orders.value.length !== 0 ? {
        c: common_vendor.f(orders.value, (order, k0, i0) => {
          return common_vendor.e({
            a: order.coverPicture,
            b: common_vendor.t(order.name),
            c: common_vendor.t(order.createTime),
            d: common_vendor.t(order.total),
            e: common_vendor.t(order.nums),
            f: order.state == 1
          }, order.state == 1 ? {} : {}, {
            g: order.id
          });
        })
      } : {
        d: common_vendor.p({
          type: "wallet",
          size: "90"
        })
      }) : {
        e: common_vendor.p({
          type: "person",
          size: "90"
        }),
        f: common_vendor.o(goLogin)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/gift/components/orderList.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=orderList.js.map
