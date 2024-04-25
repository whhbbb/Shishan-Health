"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_personalInf = require("../../../services/personalInf.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "editPassword",
  setup(__props) {
    const usedPassword = common_vendor.ref("");
    const newPassword = common_vendor.ref("");
    const editPassword = async () => {
      const res = await services_personalInf.changePassword({
        oldpassword: usedPassword.value,
        password: newPassword.value
      });
      if (res.code === 200 && res.msg !== "密码错误") {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "success",
          duration: 1e3
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 1e3);
        common_vendor.wx$1.removeStorage({ key: "userPass_password" });
      } else if (res.msg === "密码错误") {
        common_vendor.index.showToast({
          title: "原密码错误",
          icon: "error",
          duration: 1e3
        });
      } else {
        common_vendor.index.showToast({
          title: "修改失败",
          icon: "error",
          duration: 1e3
        });
      }
    };
    const edit = () => {
      if (usedPassword.value === "") {
        common_vendor.index.showToast({
          title: "请输入旧密码",
          icon: "error"
        });
        return;
      } else if (newPassword.value === "") {
        common_vendor.index.showToast({
          title: "请输入新密码",
          icon: "error"
        });
        return;
      } else if (newPassword.value === usedPassword.value) {
        common_vendor.index.showToast({
          title: "新旧密码相同",
          icon: "error"
        });
        return;
      } else {
        editPassword();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => usedPassword.value = $event),
        b: common_vendor.p({
          type: "password",
          placeholder: "旧密码",
          modelValue: usedPassword.value
        }),
        c: common_vendor.o(($event) => newPassword.value = $event),
        d: common_vendor.p({
          type: "password",
          placeholder: "新密码",
          modelValue: newPassword.value
        }),
        e: common_vendor.o(edit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e066ba7"], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/my/components/editPassword.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=editPassword.js.map
