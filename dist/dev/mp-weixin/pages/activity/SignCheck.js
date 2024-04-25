"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "SignCheck",
  props: {
    id: null
  },
  setup(__props) {
    const props = __props;
    const result = common_vendor.ref(1);
    console.log(props.id);
    const message = [
      {
        detail: "未报名",
        btn: "点击报名"
      },
      {
        detail: "请勿重复签到",
        btn: "我知道了"
      },
      {
        detail: "签到成功",
        btn: "我知道了"
      },
      {
        detail: "签到截止",
        btn: "我知道了"
      },
      {
        detail: "签到未开始",
        btn: "我知道了"
      }
    ];
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
      result.value = 1;
    };
    let AId = props.id;
    const navTo = () => {
      if (result.value === 1) {
        common_vendor.index.navigateTo({
          url: "/pages/activity/SignApply?id=" + AId
        });
      } else {
        common_vendor.index.navigateBack();
      }
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
        a: result.value === 3
      }, result.value === 3 ? {} : {}, {
        b: common_vendor.t(message[result.value - 1].detail),
        c: common_vendor.t(message[result.value - 1].btn),
        d: common_vendor.o(navTo)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/activity/SignCheck.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=SignCheck.js.map
