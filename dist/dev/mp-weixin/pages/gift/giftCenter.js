"use strict";
const common_vendor = require("../../common/vendor.js");
const services_gift = require("../../services/gift.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Math) {
  orderList();
}
const orderList = () => "./components/orderList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "giftCenter",
  setup(__props) {
    common_vendor.onLoad(() => {
      getGiftLists();
      common_vendor.wx$1.getSystemInfo({
        success(res) {
          screenW.value = res.windowWidth;
          console.log(res.windowWidth);
          const singleNavWidth = res.windowWidth / 5;
          navScrollLeft.value = (currentTab.value - 2) * singleNavWidth;
        }
      });
    });
    common_vendor.onShow(() => {
      getGiftLists();
    });
    const screenW = common_vendor.ref();
    const navScrollLeft = common_vendor.ref(0);
    const currentTab = common_vendor.ref(0);
    const navData = common_vendor.ref([{ text: "积分商城" }, { text: "兑换记录" }]);
    const tabData = common_vendor.ref([0, 1]);
    const switchNav = (idx) => {
      const singleNavWidth = screenW.value / 2;
      navScrollLeft.value = (idx - 2) * singleNavWidth;
      if (currentTab.value === idx) {
        return false;
      } else {
        currentTab.value = idx;
      }
      getGiftLists();
    };
    const switchTab = (e) => {
      const cur = e.detail.current;
      const singleNavWidth = screenW.value / 2;
      currentTab.value = cur;
      navScrollLeft.value = (cur - 2) * singleNavWidth;
      getGiftLists();
    };
    const getGiftLists = async () => {
      const res = await services_gift.getGiftList();
      console.log(res.rows);
      list.value = res.rows;
    };
    const list = common_vendor.ref([]);
    const goToGoodsDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/gift/gift?id=" + id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(navData.value, (navItem, idx, i0) => {
          return {
            a: common_vendor.t(navItem.text),
            b: idx,
            c: currentTab.value === idx ? 1 : "",
            d: common_vendor.o(($event) => switchNav(idx), idx)
          };
        }),
        b: navScrollLeft.value,
        c: common_vendor.f(tabData.value, (tabItem, idx, i0) => {
          return common_vendor.e({
            a: idx === 0
          }, idx === 0 ? {
            b: common_vendor.f(list.value, (item, index, i1) => {
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
            c: common_vendor.f(list.value, (item, index, i1) => {
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
          } : idx === 1 ? {
            e: "b4c1d435-0-" + i0
          } : {}, {
            d: idx === 1,
            f: idx
          });
        }),
        d: currentTab.value,
        e: common_vendor.o(switchTab)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b4c1d435"], ["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/pages/gift/giftCenter.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=giftCenter.js.map
