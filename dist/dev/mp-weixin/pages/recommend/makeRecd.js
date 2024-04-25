"use strict";
const common_vendor = require("../../common/vendor.js");
const services_recommed = require("../../services/recommed.js");
const services_Audit = require("../../services/Audit.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "makeRecd",
  setup(__props) {
    common_vendor.ref(/* @__PURE__ */ new Date());
    const isPastTargetDate = common_vendor.ref(false);
    const getA = async () => {
      const res = await services_Audit.getAudit();
      isPastTargetDate.value = res.data;
    };
    common_vendor.onLoad(() => {
      getA();
    });
    common_vendor.index.getSystemInfoSync();
    const title = common_vendor.ref("");
    const person = common_vendor.ref("");
    const desc = common_vendor.ref("");
    const getTInput = (e) => {
      title.value = e.detail.value;
    };
    const getInput = (e) => {
      desc.value = e.detail.value;
    };
    const sendC = async () => {
      const res = await services_recommed.newRecommend({
        id: null,
        content: desc.value,
        lecturerName: person.value,
        theme: title.value
      });
      if (res.code == 200) {
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success",
          duration: 1e3,
          complete: () => {
            setTimeout(() => {
              common_vendor.index.reLaunch({ url: "/pages/recommend/recommend" });
              title.value = "";
              person.value = "";
              desc.value = "";
            }, 1e3);
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "提交失败！",
          icon: "error",
          duration: 1e3
        });
      }
    };
    const publish = () => {
      if (title.value === "") {
        common_vendor.index.showToast({
          title: "请填写活动主题！",
          icon: "none"
        });
        return;
      } else if (desc.value === "") {
        common_vendor.index.showToast({
          title: "请填写推荐理由",
          icon: "none"
        });
      } else {
        sendC();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getTInput),
        b: common_vendor.o(getInput),
        c: common_vendor.o(publish)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/recommend/makeRecd.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=makeRecd.js.map
