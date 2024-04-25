"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_random = require("../../utils/random.js");
const services_logIn = require("../../services/logIn.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const logInInfo = common_vendor.ref({
      username: "",
      password: ""
    });
    const logIn = () => {
      console.log(remPassword.value);
      console.log(logInInfo.value);
      if (logInInfo.value.username == "") {
        common_vendor.index.showToast({
          title: "用户名不能为空！",
          icon: "none",
          duration: 1e3
        });
        return;
      }
      if (logInInfo.value.password == "") {
        common_vendor.index.showToast({
          title: "密码不能为空！",
          icon: "none",
          duration: 1e3
        });
        return;
      } else {
        services_logIn.logInAPI({
          username: logInInfo.value.username,
          password: logInInfo.value.password
        }).then((res) => {
          console.log(logInInfo.value);
          console.log(res);
          if (res.code === 200) {
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success",
              duration: 1e3
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/index/index"
              });
            }, 2e3);
            common_vendor.index.setStorageSync("token", res.token);
            if (remPassword.value) {
              common_vendor.wx$1.setStorage({
                key: "userPass_username",
                data: logInInfo.value.username
              });
              common_vendor.wx$1.setStorage({
                key: "userPass_password",
                data: utils_random.randomWord(99) + common_vendor.gBase64.encode(logInInfo.value.password)
              });
              console.log(utils_random.randomWord(99) + common_vendor.gBase64.encode(logInInfo.value.password));
            }
          } else {
            common_vendor.index.showToast({
              title: "密码错误",
              icon: "error",
              duration: 1e3
            });
          }
        });
      }
    };
    common_vendor.onLoad(async () => {
      common_vendor.wx$1.getStorage({
        key: "userPass_password",
        success: function(res2) {
          console.log(res2.data);
          console.log(common_vendor.gBase64.decode(res2.data.slice(99)));
          logInInfo.value.password = common_vendor.gBase64.decode(res2.data.slice(99));
        },
        fail: function() {
          logInInfo.value.password = "";
        }
      });
      const res = await common_vendor.wx$1.login();
      console.log(res);
      res.code;
      common_vendor.wx$1.getStorage({
        key: "userPass_username",
        success: function(res2) {
          console.log(res2.data);
          logInInfo.value.username = res2.data;
          remPassword.value = true;
        },
        fail: function() {
          logInInfo.value.username = "";
        }
      });
    });
    const remPassword = common_vendor.ref(false);
    const remPasswordChange = () => {
      remPassword.value = !remPassword.value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => logInInfo.value.username = $event),
        b: common_vendor.p({
          type: "text",
          placeholder: "用户名",
          modelValue: logInInfo.value.username
        }),
        c: common_vendor.o(($event) => logInInfo.value.password = $event),
        d: common_vendor.p({
          type: "password",
          placeholder: "密码",
          modelValue: logInInfo.value.password
        }),
        e: common_vendor.o(logIn),
        f: remPassword.value,
        g: common_vendor.o(remPasswordChange)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=login.js.map
