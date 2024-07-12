"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ranking",
  setup(__props) {
    const users = common_vendor.ref([
      {
        id: 4,
        avatar: "../../static/image/tabbar.jpg",
        username: "赵六",
        content: "打卡天数： 0"
      },
      {
        id: 5,
        avatar: "../../static/image/tabbar.jpg",
        username: "孙七",
        content: "打卡天数： 0"
      },
      {
        id: 6,
        avatar: "../../static/image/tabbar.jpg",
        username: "周八",
        content: "打卡天数： 0"
      },
      {
        id: 7,
        avatar: "../../static/image/tabbar.jpg",
        username: "吴九",
        content: "打卡天数： 0"
      },
      {
        id: 8,
        avatar: "../../static/image/tabbar.jpg",
        username: "郑十",
        content: "打卡天数： 0"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(users.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.id),
            b: item.avatar,
            c: common_vendor.t(item.username),
            d: common_vendor.t(item.content)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/health_check-in/src/pages/ranking/ranking.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=ranking.js.map
