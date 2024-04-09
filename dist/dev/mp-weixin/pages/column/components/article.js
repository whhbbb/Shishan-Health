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
  __name: "article",
  props: {
    id: null,
    kind: null
  },
  setup(__props) {
    const props = __props;
    common_vendor.ref(null);
    const item = common_vendor.ref({
      title: "",
      createTime: "",
      content: ""
    });
    const getColumnsDetail = async (id, type = 2) => {
      const res = await services_column.getColumnsDetailAPI(id, type);
      console.log(res.data);
      item.value = res.data;
      item.value.content = item.value.content.replace(
        /\<img/g,
        '<img style="max-width:100%;height:auto" '
      );
    };
    common_vendor.onLoad(() => {
      console.log(props.id);
      console.log(props.kind);
      getColumnsDetail(props.id);
    });
    const likeUp = (id, tblLike) => {
      if (common_vendor.index.getStorageSync("token")) {
        if (tblLike) {
          console.log("取消点赞");
          services_column.likeDownAPI(id).then((res) => {
            getColumnsDetail(id, 1);
          });
        } else {
          console.log("点赞");
          services_column.likeUpAPI(id).then((res) => {
            getColumnsDetail(id, 1);
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(item.value.title),
        b: common_vendor.t(item.value.createTime),
        c: item.value.content,
        d: common_vendor.p({
          type: "eye-filled",
          size: "20"
        }),
        e: common_vendor.t(item.value.viewsNums),
        f: !item.value.tblLike
      }, !item.value.tblLike ? {
        g: common_vendor.o(($event) => likeUp(item.value.id, item.value.tblLike)),
        h: common_vendor.p({
          type: "heart",
          size: "20"
        })
      } : {
        i: common_vendor.o(($event) => likeUp(item.value.id, item.value.tblLike)),
        j: common_vendor.p({
          type: "heart-filled",
          size: "20",
          color: "red"
        })
      }, {
        k: common_vendor.t(item.value.likeCount)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0cafda57"], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/column/components/article.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=article.js.map
