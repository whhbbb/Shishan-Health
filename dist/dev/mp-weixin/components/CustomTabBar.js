"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  _easycom_uni_transition2();
}
const _easycom_uni_transition = () => "../node-modules/@dcloudio/uni-ui/lib/uni-transition/uni-transition.js";
if (!Math) {
  _easycom_uni_transition();
}
const _sfc_main = {
  __name: "CustomTabBar",
  props: {
    selected: Number
  },
  emits: ["chooseWay"],
  setup(__props, { emit }) {
    const props = __props;
    const isShow = common_vendor.ref(false);
    common_vendor.ref("#fff");
    const list = common_vendor.ref([
      {
        text: "首页",
        pagePath: "/pages/index/index"
        // iconPath: "/static/image/bottomBar/index.png",
        // selectedIconPath: "/static/image/bottomBar/index-active.png"
      },
      {
        text: "科普",
        pagePath: "/pages/science/science"
      },
      {
        pagePath: "/pages/ranking/ranking",
        iconPath: "/static/image/bottomBar/check-in.png",
        selectedIconPath: "/static/image/bottomBar/check-in.png",
        search: true
      },
      {
        text: "分享",
        pagePath: "/pages/share/share"
      },
      {
        text: "我的",
        pagePath: "/pages/my/my"
        // iconPath: "/static/image/bottomBar/my.png",
        // selectedIconPath: "/static/image/bottomBar/my-active.png"
      }
    ]);
    const switchTab = (url) => {
      common_vendor.index.switchTab({
        url
      });
      console.log(props.selected);
    };
    const chooseWay = () => {
      isShow.value = !isShow.value;
      emit("chooseWay");
    };
    common_vendor.onHide(() => {
      isShow.value = false;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.search
          }, item.search ? common_vendor.e({
            b: item.search
          }, item.search ? {
            c: __props.selected === index ? item.selectedIconPath : item.iconPath
          } : {}, {
            d: common_vendor.t(item.text),
            e: (__props.selected === index ? true : false) ? 1 : "",
            f: common_vendor.o(chooseWay),
            g: item.search ? 1 : "",
            h: !item.search ? 1 : "",
            i: (__props.selected === index ? true : false) ? 1 : "",
            j: (__props.selected != index ? true : false) ? 1 : ""
          }) : common_vendor.e({
            k: item.search
          }, item.search ? {
            l: __props.selected === index ? item.selectedIconPath : item.iconPath
          } : {}, {
            m: common_vendor.t(item.text),
            n: (__props.selected === index ? true : false) ? 1 : "",
            o: common_vendor.o(($event) => switchTab(item.pagePath)),
            p: (item.search ? true : false) ? 1 : "",
            q: !item.search ? 1 : "",
            r: (__props.selected === index ? true : false) ? 1 : "",
            s: (__props.selected != index ? true : false) ? 1 : ""
          }));
        }),
        b: common_vendor.p({
          ["mode-class"]: _ctx.fade,
          show: isShow.value
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/玛卡巴卡/Desktop/Web/shishan-health/src/components/CustomTabBar.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=CustomTabBar.js.map
