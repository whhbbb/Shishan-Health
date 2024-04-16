"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_feedBack = require("../../../services/feedBack.js");
const services_Audit = require("../../../services/Audit.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_file_picker2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_file_picker = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_easyinput)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "feedBack",
  setup(__props) {
    common_vendor.ref(/* @__PURE__ */ new Date());
    const isPastTargetDate = common_vendor.ref(false);
    const getA = async () => {
      const res = await services_Audit.getAudit();
      console.log(res);
      isPastTargetDate.value = res.data;
      console.log(isPastTargetDate.value);
      if (!common_vendor.index.getStorageSync("token")) {
        common_vendor.index.showToast({
          title: "您未登录！",
          icon: "none",
          duration: 1e3
        });
      }
    };
    common_vendor.onLoad(() => {
      getA();
    });
    common_vendor.onShow(() => {
    });
    const feedBack = common_vendor.ref({
      problem: "",
      contact: "",
      img: [],
      name: ""
    });
    const validatePhone = (phone) => {
      const reg = /^1\d{10}$/;
      return reg.test(phone);
    };
    const deleteImg = (e) => {
      e.index;
      console.log(e);
      feedBack.value.img.forEach((item, index2) => {
        if (item.temp === e.tempFilePath) {
          feedBack.value.img.splice(index2, 1);
        }
      });
    };
    const select = (e) => {
      console.log(e);
      const tempFilePaths = e.tempFilePaths;
      uploadFiles(tempFilePaths, 0);
    };
    const uploadFiles = async (tempFilePaths, i) => {
      await common_vendor.index.uploadFile({
        url: "https://www.academictime.cn:3166/system/common/upload",
        filePath: tempFilePaths[i],
        header: {
          Authorization: "Bearer " + common_vendor.index.getStorageSync("token"),
          "Content-Type": "multipart/form-data"
        },
        name: "file",
        success: (res2) => {
          console.log(res2);
          const resData = JSON.parse(res2.data);
          feedBack.value.img.push({ now: resData.msg, temp: tempFilePaths[i] });
        },
        fail: () => {
          console.log("fail");
          common_vendor.index.showToast({
            title: "上传失败",
            icon: "none"
          });
        }
      });
    };
    const postFeedback = async (data) => {
      const res = await services_feedBack.postFeedbackAPI(data);
      console.log(res);
      if (res.code == 200) {
        common_vendor.wx$1.showToast({
          title: res.msg,
          icon: "success",
          duration: 2e3,
          complete: function() {
            setTimeout(function() {
              common_vendor.index.switchTab({
                url: "/pages/my/my"
              });
            }, 2e3);
          }
        });
      } else if (res.code == 401) {
        common_vendor.index.showToast({
          title: "您未登录！",
          icon: "none",
          duration: 1e3
        });
      } else {
        common_vendor.wx$1.showToast({
          title: res.msg,
          icon: "none",
          duration: 2e3
        });
      }
    };
    const submit = () => {
      console.log(feedBack.value);
      let imgString = feedBack.value.img.map((item) => item.now).join("&");
      console.log(imgString);
      if (feedBack.value.problem === "") {
        common_vendor.index.showToast({
          title: "请填写问题描述",
          icon: "none"
        });
        return;
      } else if (feedBack.value.name === "") {
        common_vendor.index.showToast({
          title: "请填写联系人姓名",
          icon: "none"
        });
      } else if (feedBack.value.contact === "") {
        common_vendor.index.showToast({
          title: "请填写联系方式",
          icon: "none"
        });
      } else if (!validatePhone(feedBack.value.contact)) {
        common_vendor.index.showToast({
          title: "请填写正确的联系方式",
          icon: "none"
        });
      } else {
        postFeedback({
          name: feedBack.value.name,
          phone: feedBack.value.contact,
          content: feedBack.value.problem,
          picture: imgString,
          id: ""
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isPastTargetDate.value
      }, isPastTargetDate.value ? {
        b: feedBack.value.problem,
        c: common_vendor.o(($event) => feedBack.value.problem = $event.detail.value),
        d: common_vendor.o(select),
        e: common_vendor.o(deleteImg),
        f: common_vendor.p({
          limit: "9",
          mode: "grid",
          ["file-mediatype"]: "image"
        }),
        g: common_vendor.o(() => {
        }),
        h: common_vendor.o(($event) => feedBack.value.name = $event),
        i: common_vendor.p({
          type: "text",
          placeholder: "请输入您的名字",
          next: true,
          modelValue: feedBack.value.name
        }),
        j: common_vendor.o(() => {
        }),
        k: common_vendor.o(($event) => feedBack.value.contact = $event),
        l: common_vendor.p({
          type: "text",
          placeholder: "请输入您的联系方式",
          done: true,
          modelValue: feedBack.value.contact
        }),
        m: common_vendor.o(submit)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/pages/my/components/feedBack.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=feedBack.js.map
