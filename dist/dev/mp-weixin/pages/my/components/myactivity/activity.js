"use strict";
const common_vendor = require("../../../../common/vendor.js");
const services_Audit = require("../../../../services/Audit.js");
require("../../../../utils/http.js");
require("../../../../stores/index.js");
require("../../../../stores/modules/member.js");
const Details = () => "./components/Details.js";
const _sfc_main = {
  components: {
    Details
  },
  setup() {
    const isPastTargetDate = common_vendor.ref(false);
    const navScrollLeft = common_vendor.ref(0);
    const screenW = common_vendor.ref();
    const currentTab = common_vendor.ref(0);
    const navData = common_vendor.ref([{ tab: 0, text: "我参加的" }, { tab: 1, text: "我发布的" }]);
    const singleNavWidth = common_vendor.ref();
    const refreshTag = common_vendor.ref(false);
    const switchNav = (id) => {
      singleNavWidth.value = screenW.value / 2;
      navScrollLeft.value = (id - 2) * singleNavWidth.value;
      currentTab.value = id;
    };
    const switchTab = (e) => {
      currentTab.value = e.detail.current;
      switchNav(e.detail.current);
    };
    const getA = async () => {
      const res = await services_Audit.getAudit();
      isPastTargetDate.value = res.data;
    };
    common_vendor.onMounted(() => {
      common_vendor.wx$1.getSystemInfo({
        success: (res) => {
          screenW.value = res.windowWidth;
          singleNavWidth.value = screenW.value / 2;
          navScrollLeft.value = (currentTab.value - 2) * singleNavWidth.value;
          common_vendor.index.$on("backPageData", function(data) {
            switchNav(data.state);
            refreshTag.value = true;
          });
        }
      });
    });
    common_vendor.onShow(() => {
      getA();
    });
    common_vendor.onMounted(() => {
      getA();
    });
    return {
      isPastTargetDate,
      navScrollLeft,
      screenW,
      currentTab,
      navData,
      singleNavWidth,
      switchNav,
      switchTab,
      getA
    };
  }
};
if (!Array) {
  const _component_Details = common_vendor.resolveComponent("Details");
  _component_Details();
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
    d: common_vendor.f($setup.navData, (tabItem, id, i0) => {
      return {
        a: "e4c487f2-0-" + i0,
        b: common_vendor.p({
          state: id
        }),
        c: id
      };
    }),
    e: $setup.currentTab,
    f: common_vendor.o((...args) => $setup.switchTab && $setup.switchTab(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/my/components/myactivity/activity.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=activity.js.map
