"use strict";
const common_vendor = require("../../common/vendor.js");
const services_gift = require("../../services/gift.js");
const services_personalInf = require("../../services/personalInf.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Math) {
  PageSkeleton();
}
const PageSkeleton = () => "./PageSkeleton.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "giftCenter",
  setup(__props) {
    const credit = common_vendor.ref();
    const list = common_vendor.ref([]);
    const showSkeleton = common_vendor.ref(true);
    const getPersonal = async () => {
      const res = await services_personalInf.getPersonalInf();
      console.log(res);
      credit.value = res.data.credit;
    };
    common_vendor.onShow(() => {
      getGiftLists();
      getPersonal();
    });
    const getGiftLists = async () => {
      const res = await services_gift.getGiftList();
      showSkeleton.value = false;
      console.log(res.rows);
      list.value = res.rows;
    };
    const goToGoodsDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/gift/gift?id=" + id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showSkeleton.value
      }, showSkeleton.value ? {} : {
        b: common_vendor.t(credit.value),
        c: `/pages/my/components/history?creditNum=${credit.value}`,
        d: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: index % 2 === 0
          }, index % 2 === 0 ? {
            b: item.coverPicture,
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.introduce),
            e: common_vendor.t(item.price),
            f: common_vendor.o(($event) => goToGoodsDetail(item.id), index)
          } : {}, {
            g: index
          });
        }),
        e: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: index % 2 === 1
          }, index % 2 === 1 ? {
            b: item.coverPicture,
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.introduce),
            e: common_vendor.t(item.price),
            f: common_vendor.o(($event) => goToGoodsDetail(item.id), index)
          } : {}, {
            g: index
          });
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b4c1d435"], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/gift/giftCenter.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=giftCenter.js.map
