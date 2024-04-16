"use strict";
const common_vendor = require("../common/vendor.js");
const services_index = require("../services/index.js");
const services_column = require("../services/column.js");
require("../utils/http.js");
require("../stores/index.js");
require("../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "XsSwiper",
  setup(__props) {
    const getImg = async () => {
      const res = await services_index.getIndexImg();
      console.log(res.rows);
      List.value = res.rows;
    };
    common_vendor.onLoad(() => {
      getImg();
    });
    common_vendor.onShow(() => {
      getImg();
    });
    const List = common_vendor.ref([]);
    const calculateKind = async (id) => {
      const res = await services_column.getColumnsDetailAPI(id);
      return res.data.kind;
    };
    const gotoColumn = (id) => {
      console.log(id);
      common_vendor.index.navigateTo({
        url: `/pages/column/components/article?kind=${calculateKind(id)}&id=${id}`
      });
    };
    const activeIndex = common_vendor.ref(0);
    const onChange = (e) => {
      activeIndex.value = e.detail.current;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(List.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.o(($event) => gotoColumn(item.specialId), index),
            c: index
          };
        }),
        b: common_vendor.o(onChange),
        c: common_vendor.f(List.value.length, (item, index, i0) => {
          return {
            a: index,
            b: index === activeIndex.value ? 1 : ""
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/components/XsSwiper.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=XsSwiper.js.map
