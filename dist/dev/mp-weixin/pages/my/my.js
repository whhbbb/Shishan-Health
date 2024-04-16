"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/index.js");
const services_personalInf = require("../../services/personalInf.js");
const services_Audit = require("../../services/Audit.js");
require("../../stores/modules/member.js");
require("../../utils/http.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my",
  setup(__props) {
    common_vendor.ref(/* @__PURE__ */ new Date());
    const isPastTargetDate = common_vendor.ref(true);
    const getA = async () => {
      const res = await services_Audit.getAudit();
      console.log(res);
      isPastTargetDate.value = res.data;
    };
    const islogin = common_vendor.ref(false);
    const my = common_vendor.ref({
      name: "",
      id: "",
      img: "../../static/my/headpic.png",
      college: ""
    });
    const handleNavigate = () => {
      if (common_vendor.index.getStorageSync("token")) {
        common_vendor.index.navigateTo({
          url: "/pages/my/components/editUser"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    };
    const getPersonal = async () => {
      const res = await services_personalInf.getPersonalInf();
      console.log(res);
      my.value.name = res.data.nickName;
      my.value.college = res.data.dept.deptName;
      my.value.img = res.data.avatar === "" ? "../../static/my/headpic.png" : res.data.avatar;
    };
    common_vendor.onLoad(() => {
      getPersonal();
    });
    common_vendor.onShow(() => {
      getA();
      const token = common_vendor.index.getStorageSync("token");
      islogin.value = token ? true : false;
      if (token) {
        getPersonal();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: islogin.value
      }, islogin.value ? {
        b: my.value.img,
        c: common_vendor.t(my.value.name),
        d: common_vendor.t(my.value.college)
      } : {}, {
        e: common_vendor.o(handleNavigate),
        f: isPastTargetDate.value
      }, isPastTargetDate.value ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=my.js.map
