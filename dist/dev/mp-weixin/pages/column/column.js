"use strict";
const common_vendor = require("../../common/vendor.js");
const services_Audit = require("../../services/Audit.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
const newsItem = () => "./components/newsItem.js";
const _sfc_main = {
  components: {
    newsItem
  },
  setup() {
    const showMoments = common_vendor.ref(true);
    const isPastTargetDate = common_vendor.ref(false);
    const navScrollLeft = common_vendor.ref(0);
    const screenW = common_vendor.ref();
    const currentTab = common_vendor.ref(0);
    const navData = common_vendor.ref([{ text: "精彩瞬间" }, { text: "科普时间" }]);
    const tabData = common_vendor.ref([0, 1]);
    const singleNavWidth = common_vendor.ref();
    const switchNav = (idx) => {
      console.log(idx);
      singleNavWidth.value = screenW.value / 2;
      navScrollLeft.value = (idx - 2) * singleNavWidth.value;
      if (currentTab.value === idx) {
        return false;
      } else {
        currentTab.value = idx;
      }
    };
    const switchTab = (e) => {
      const cur = e.detail.current;
      singleNavWidth.value = screenW.value / 2;
      currentTab.value = cur;
      console.log(currentTab.value);
      navScrollLeft.value = (cur - 2) * singleNavWidth.value;
    };
    const getA = async () => {
      const res = await services_Audit.getAudit();
      console.log(res);
      isPastTargetDate.value = res.data;
    };
    common_vendor.onShow(() => {
      console.log("column!!!");
      getA();
      common_vendor.index.switchTab({
        url: "/pages/column/column"
      });
    });
    common_vendor.onMounted(() => {
      getA();
      common_vendor.wx$1.getSystemInfo({
        success(res) {
          screenW.value = res.windowWidth;
          console.log(res.windowWidth);
          singleNavWidth.value = res.windowWidth / 2;
          navScrollLeft.value = (currentTab.value - 2) * singleNavWidth.value;
        }
      });
    });
    return {
      showMoments,
      isPastTargetDate,
      navScrollLeft,
      screenW,
      navData,
      tabData,
      singleNavWidth,
      switchNav,
      switchTab,
      currentTab
    };
  }
};
if (!Array) {
  const _component_news_item = common_vendor.resolveComponent("news-item");
  _component_news_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.isPastTargetDate
  }, $setup.isPastTargetDate ? {
    b: common_vendor.f($setup.navData, (navItem, id, i0) => {
      return {
        a: common_vendor.t(navItem.text),
        b: id,
        c: $setup.currentTab === id ? 1 : "",
        d: common_vendor.o(($event) => $setup.switchNav(id), id)
      };
    }),
    c: $setup.navScrollLeft,
    d: common_vendor.f($setup.tabData, (tabItem, id, i0) => {
      return common_vendor.e({
        a: id === 0
      }, id === 0 ? {
        b: "1f6dcbee-0-" + i0,
        c: common_vendor.p({
          kind: 1
        })
      } : id === 1 ? {
        e: "1f6dcbee-1-" + i0,
        f: common_vendor.p({
          kind: 2
        })
      } : {}, {
        d: id === 1,
        g: id
      });
    }),
    e: $setup.currentTab,
    f: common_vendor.o((...args) => $setup.switchTab && $setup.switchTab(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/column/column.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=column.js.map
