"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_personalInf = require("../../../services/personalInf.js");
const services_Audit = require("../../../services/Audit.js");
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
  __name: "editUser",
  setup(__props) {
    const isPastTargetDate = common_vendor.ref(false);
    const getA = async () => {
      const res = await services_Audit.getAudit();
      console.log(res);
      isPastTargetDate.value = res.data;
    };
    const isDisabled = common_vendor.ref(false);
    const user = common_vendor.ref({});
    const editedUser = common_vendor.ref({});
    common_vendor.ref([]);
    const getPersonal = async () => {
      const res = await services_personalInf.getPersonalInf();
      console.log(res);
      user.value.name = res.data.name;
      user.value.college = res.data.dept.deptName;
      user.value.studentId = res.data.userName;
      user.value.nickName = res.data.nickName;
      user.value.phonenumber = res.data.phonenumber;
      user.value.img = res.data.avatar === "" ? "../../../static/my/headpic.png" : res.data.avatar;
      editedUser.value = res.data;
    };
    common_vendor.onLoad(() => {
      getA();
    });
    common_vendor.onShow(() => {
      getA();
      getPersonal();
    });
    const changeUserInfo = () => {
      getPersonal();
      isDisabled.value = !isDisabled.value;
    };
    const saveEdit = () => {
      if (!/^1[3456789]\d{9}$/.test(editedUser.value.phonenumber)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return false;
      }
      if (editedUser.value.nickName && editedUser.value.phonenumber) {
        console.log(editedUser.value);
        services_personalInf.changePersonalInf(editedUser.value).then((res) => {
          console.log(res);
          if (res.code == 500) {
            common_vendor.index.showToast({
              title: "违规操作！",
              icon: "none"
            });
            return false;
          }
          getPersonal();
        });
        isDisabled.value = !isDisabled.value;
      } else {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
      }
    };
    const cancelEdit = () => {
      isDisabled.value = !isDisabled.value;
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.showToast({
              title: "退出成功",
              icon: "success",
              duration: 2e3
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/login/login"
              });
            }, 2e3);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    };
    const editPassword = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my/components/editPassword"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isPastTargetDate.value
      }, isPastTargetDate.value ? common_vendor.e({
        b: user.value.img,
        c: `/pages/my/components/userImage?userAvatar=${user.value.img}`,
        d: common_vendor.t(user.value.name),
        e: common_vendor.t(user.value.college),
        f: common_vendor.t(user.value.studentId),
        g: !isDisabled.value
      }, !isDisabled.value ? {
        h: common_vendor.t(user.value.nickName)
      } : {
        i: common_vendor.o(($event) => editedUser.value.nickName = $event),
        j: common_vendor.p({
          modelValue: editedUser.value.nickName
        })
      }, {
        k: !isDisabled.value
      }, !isDisabled.value ? {
        l: common_vendor.t(user.value.phonenumber)
      } : {
        m: common_vendor.o(($event) => editedUser.value.phonenumber = $event),
        n: common_vendor.p({
          modelValue: editedUser.value.phonenumber
        })
      }, {
        o: !isDisabled.value
      }, !isDisabled.value ? {
        p: common_vendor.o(changeUserInfo)
      } : {}, {
        q: isDisabled.value
      }, isDisabled.value ? {
        r: common_vendor.o(saveEdit),
        s: common_vendor.o(cancelEdit)
      } : {}, {
        t: common_vendor.o(editPassword),
        v: common_vendor.o(logout)
      }) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/my/components/editUser.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=editUser.js.map
