"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  (_easycom_uni_icons2 + _easycom_uni_tag2)();
}
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_tag)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "SignCheck",
  props: {
    id: null
  },
  setup(__props) {
    const props = __props;
    const result = common_vendor.ref(1);
    console.log(props.id);
    const message = common_vendor.ref(["签到失败", "请勿重复签到", "签到成功", "签到截止", "签到失败"]);
    const postFeedbackAPI = (data) => {
      return utils_http.http({
        url: "/system/useractivity/register",
        method: "PUT",
        data: {
          activityId: data
        }
      });
    };
    const postFeedback = async (AId2) => {
      const res = await postFeedbackAPI(AId2);
      console.log(res);
      result.value = res.data;
    };
    let AId = props.id;
    const toapply = () => {
      console.log("去报名！");
      common_vendor.index.redirectTo({
        url: "/pages/index/index"
      });
      common_vendor.index.navigateTo({
        url: "/pages/activity/ActivityDetails?id=" + AId
      });
    };
    common_vendor.onLoad((options) => {
      let obj = common_vendor.wx$1.getLaunchOptionsSync();
      let query = null;
      if (options.scene || obj.query.scene) {
        console.log("options.scene", options);
        console.log("obj.query.scene", obj.query);
        query = options ? decodeURIComponent(options.scene) : decodeURIComponent(obj.query.scene);
        console.log(query);
        const aNo = query;
        console.log("aNo", aNo);
        AId = Number(aNo);
      }
      console.log("props", props);
      if (common_vendor.index.getStorageSync("token")) {
        postFeedback(AId);
      } else {
        common_vendor.index.showToast({
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: result.value === 1 || result.value === 2
      }, result.value === 1 || result.value === 2 ? {
        b: common_vendor.p({
          type: "info",
          color: "#ffa500",
          size: "100"
        })
      } : result.value === 3 ? {
        d: common_vendor.p({
          type: "checkbox-filled",
          color: "green",
          size: "100"
        })
      } : {
        e: common_vendor.p({
          type: "clear",
          color: "red",
          size: "100"
        })
      }, {
        c: result.value === 3,
        f: common_vendor.t(message.value[result.value - 1]),
        g: result.value === 1
      }, result.value === 1 ? {
        h: common_vendor.o(toapply),
        i: common_vendor.p({
          type: "warning",
          text: "未报名 点击报名"
        })
      } : result.value === 4 ? {
        k: common_vendor.p({
          type: "error",
          text: "活动已结束"
        })
      } : result.value === 5 ? {
        m: common_vendor.p({
          type: "error",
          text: "报名未开始"
        })
      } : {}, {
        j: result.value === 4,
        l: result.value === 5
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/activity/SignCheck.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=SignCheck.js.map
