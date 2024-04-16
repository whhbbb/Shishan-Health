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
      console.log(res);
      isPastTargetDate.value = res.data;
    };
    common_vendor.onLoad(() => {
      getA();
    });
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const title = common_vendor.ref("");
    const person = common_vendor.ref("");
    const desc = common_vendor.ref("");
    const getTInput = (e) => {
      title.value = e.detail.value;
    };
    const getPInput = (e) => {
      person.value = e.detail.value;
    };
    const getInput = (e) => {
      desc.value = e.detail.value;
    };
    const sendC = async () => {
      console.log({
        id: null,
        content: desc.value,
        lecturerName: person.value,
        theme: title.value
      });
      const res = await services_recommed.newRecommend({
        id: null,
        content: desc.value,
        lecturerName: person.value,
        theme: title.value
      });
      console.log(res);
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
        console.log("提交失败！");
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
      } else if (person.value === "") {
        common_vendor.index.showToast({
          title: "请填写活动发起人姓名",
          icon: "none"
        });
      } else if (getInput.value === "") {
        common_vendor.index.showToast({
          title: "请填写推荐理由",
          icon: "none"
        });
      } else {
        sendC();
      }
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: isPastTargetDate.value
      }, isPastTargetDate.value ? {
        b: common_vendor.o(getTInput),
        c: common_vendor.o(getPInput),
        d: common_vendor.o(getInput),
        e: common_vendor.o(publish),
        f: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.bottom) + 30 + "px"
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/pages/recommend/makeRecd.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=makeRecd.js.map
