"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_gift = require("../../../services/gift.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "history",
  props: {
    creditNum: null
  },
  setup(__props) {
    const props = __props;
    const historys = common_vendor.ref([]);
    const getCreditH = async () => {
      const res = await services_gift.getCreidHistory();
      console.log(res.rows);
      historys.value = sortGroupBy(groupBy(res.rows));
    };
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
    const editCredit = (n, num) => {
      if (n == 5) {
        return num;
      } else {
        return "+" + num;
      }
    };
    const groupBy = (array) => {
      const map = /* @__PURE__ */ new Map();
      array.forEach((item) => {
        const key = item.createTime.slice(0, 7);
        if (map.has(key)) {
          map.get(key).push(item);
        } else {
          map.set(key, [item]);
        }
      });
      return map;
    };
    const sortGroupBy = (map) => {
      const keys = Array.from(map.keys());
      keys.sort((a, b) => {
        return a > b ? -1 : 1;
      });
      return keys.map((key) => {
        return {
          month: key,
          details: map.get(key)
        };
      });
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.creditNum),
        b: common_vendor.f(historys.value, (history, k0, i0) => {
          return {
            a: common_vendor.t(history.month),
            b: common_vendor.f(history.details, (item, k1, i1) => {
              return {
                a: common_vendor.t(CType(item.creditType)),
                b: common_vendor.t(item.createTime),
                c: common_vendor.t(editCredit(item.creditType, item.creditNum)),
                d: item.id
              };
            }),
            c: history.month
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/my/components/history.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=history.js.map
