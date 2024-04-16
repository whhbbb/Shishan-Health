"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_column = require("../../../services/column.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "newsItem",
  props: {
    kind: {
      type: Number,
      default: 1
    }
  },
  setup(__props) {
    const props = __props;
    const columnContents = common_vendor.ref([]);
    const likeUp = (id, tblLike) => {
      if (common_vendor.index.getStorageSync("token")) {
        if (tblLike) {
          console.log("取消点赞" + props.kind);
          services_column.likeDownAPI(id).then((res) => {
            console.log(res);
            if (res.code === 200) {
              getColumns(props.kind);
              console.log("取消点赞成功");
            }
          });
        } else {
          console.log("点赞" + props.kind);
          services_column.likeUpAPI(id).then((res) => {
            console.log(res);
            if (res.code === 200) {
              getColumns(props.kind);
              console.log("点赞成功");
            }
          });
        }
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
    };
    const getColumns = async (kind) => {
      const res = await services_column.getColumnsAPI({ kind });
      console.log(res);
      if (res.code === 200) {
        columnContents.value = res.rows;
      } else {
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      console.log(props.kind);
      getColumns(props.kind);
    });
    common_vendor.onShow(() => {
      getColumns(props.kind);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(columnContents.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.img,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.summary),
            d: common_vendor.t(item.createTime),
            e: !item.tblLike
          }, !item.tblLike ? {
            f: common_vendor.o(($event) => likeUp(item.id, item.tblLike), item.id),
            g: "a828ff36-0-" + i0,
            h: common_vendor.p({
              type: "heart",
              size: "20"
            })
          } : {
            i: common_vendor.o(($event) => likeUp(item.id, item.tblLike), item.id),
            j: "a828ff36-1-" + i0,
            k: common_vendor.p({
              type: "heart-filled",
              size: "20",
              color: "red"
            })
          }, {
            l: common_vendor.t(item.likeCount),
            m: "a828ff36-2-" + i0,
            n: common_vendor.t(item.viewsNums),
            o: `/pages/column/components/article?kind=${item.kind}&id=${item.id}`,
            p: item.id
          });
        }),
        b: common_vendor.p({
          type: "eye-filled",
          size: "20"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/pages/column/components/newsItem.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=newsItem.js.map
