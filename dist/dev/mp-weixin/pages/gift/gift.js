"use strict";
const common_vendor = require("../../common/vendor.js");
const services_gift = require("../../services/gift.js");
const services_personalInf = require("../../services/personalInf.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  (_easycom_uni_tag2 + _easycom_uni_number_box2)();
}
const _easycom_uni_tag = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag.js";
const _easycom_uni_number_box = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_number_box)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "gift",
  props: {
    id: null
  },
  setup(__props) {
    const props = __props;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const goodsnum = common_vendor.ref(0);
    const goodsdata = common_vendor.ref({});
    const getGiftDetails = async (id) => {
      const res = await services_gift.getGiftDetail(id);
      console.log(res.data);
      goodsdata.value = res.data;
    };
    const getMyCredit = async () => {
      const res = await services_personalInf.getPersonalInf();
      console.log(res.data.credit);
      mycredit.value = res.data.credit;
    };
    const mycredit = common_vendor.ref(1);
    const blur = (e) => {
      console.log(e);
      if (e.detail.value > goodsdata.value.allnums) {
        common_vendor.index.showToast({
          title: "兑换数量超出库存",
          icon: "none",
          duration: 1e3
        });
      }
    };
    const maxNum = common_vendor.computed(() => {
      if (mycredit.value == 0) {
        return 0;
      }
      return goodsdata.value.allnums;
    });
    const scoreres = common_vendor.computed(() => {
      return (goodsnum.value * goodsdata.value.price).toFixed(2);
    });
    common_vendor.onShow(() => {
      if (common_vendor.index.getStorageSync("token")) {
        getMyCredit();
      }
    });
    common_vendor.onLoad(() => {
      if (common_vendor.index.getStorageSync("token")) {
        console.log(props.id);
        getGiftDetails(props.id);
        getMyCredit();
      } else {
        common_vendor.wx$1.showToast({
          title: "您尚未登录，请先登录",
          icon: "none",
          duration: 1e3,
          complete: () => {
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: "/pages/login/login"
              });
            }, 1e3);
          }
        });
      }
    });
    const indicatorDots = true;
    const autoplay = true;
    const interval = 3e3;
    const duration = 1e3;
    const previewImage = (e) => {
      var current = e.target.dataset.src;
      console.log(current);
      common_vendor.wx$1.previewImage({
        current,
        urls: goodsdata.value.imgs
      });
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: common_vendor.f(goodsdata.value.imgs, (url, index, i0) => {
          return {
            a: url,
            b: index,
            c: common_vendor.o(previewImage, index)
          };
        }),
        b: indicatorDots,
        c: autoplay,
        d: interval,
        e: duration,
        f: common_vendor.t(goodsdata.value.name),
        g: common_vendor.t(goodsdata.value.price),
        h: common_vendor.p({
          text: `总库存：${goodsdata.value.allnums}`,
          size: "mini",
          inverted: true,
          type: "success"
        }),
        i: common_vendor.t(goodsdata.value.introduce),
        j: common_vendor.o(blur),
        k: common_vendor.o(($event) => goodsnum.value = $event),
        l: common_vendor.p({
          max: common_vendor.unref(maxNum),
          modelValue: goodsnum.value
        }),
        m: common_vendor.t(common_vendor.unref(scoreres)),
        n: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.bottom) + 0 + "px",
        o: ((_b = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _b.bottom) + 0 + "px"
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-018686c0"], ["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/pages/gift/gift.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=gift.js.map
