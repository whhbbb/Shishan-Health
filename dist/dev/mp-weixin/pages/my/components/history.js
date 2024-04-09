"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_gift = require("../../../services/gift.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_icons = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "history",
  setup(__props) {
    const getCreditH = async () => {
      const res = await services_gift.getCreidHistory();
      console.log(res.rows);
      history.value = res.rows;
    };
    const history = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      if (!common_vendor.index.getStorageSync("token")) {
        common_vendor.index.showToast({
          title: "您未登录！",
          icon: "none",
          duration: 1e3
        });
        return;
      }
      getCreditH();
    });
    common_vendor.onShow(() => {
      if (!common_vendor.index.getStorageSync("token")) {
        common_vendor.index.showToast({
          title: "您未登录！",
          icon: "none",
          duration: 1e3
        });
        return;
      }
    });
    const CType = (n) => {
      if (n == 2) {
        return "参加活动";
      } else if (n == 3) {
        return "意见反馈";
      } else if (n == 4) {
        return "推荐活动";
      } else {
        return "积分兑换";
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: history.value.length == 0
      }, history.value.length == 0 ? {} : {
        b: common_vendor.f(history.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.creditType == 2
          }, item.creditType == 2 ? {
            b: "7bf43038-2-" + i0 + "," + ("7bf43038-1-" + i0),
            c: common_vendor.p({
              type: "flag-filled",
              color: "#92aff0",
              size: "25"
            })
          } : item.creditType == 3 ? {
            e: "7bf43038-3-" + i0 + "," + ("7bf43038-1-" + i0),
            f: common_vendor.p({
              type: "chatboxes-filled",
              color: "#f1e9e4",
              size: "25"
            })
          } : item.creditType == 4 ? {
            h: "7bf43038-4-" + i0 + "," + ("7bf43038-1-" + i0),
            i: common_vendor.p({
              type: "hand-up-filled",
              color: "#c5daf0",
              size: "25"
            })
          } : {
            j: "7bf43038-5-" + i0 + "," + ("7bf43038-1-" + i0),
            k: common_vendor.p({
              type: "gift-filled",
              color: "#f5c7c3",
              size: "25"
            })
          }, {
            d: item.creditType == 3,
            g: item.creditType == 4,
            l: "7bf43038-1-" + i0 + "," + ("7bf43038-0-" + i0),
            m: common_vendor.p({
              title: item.creditNum > 0 ? "+" + item.creditNum : item.creditNum,
              note: item.createTime,
              rightText: CType(item.creditType)
            }),
            n: index,
            o: "7bf43038-0-" + i0
          });
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/my/components/history.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=history.js.map
