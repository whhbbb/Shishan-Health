"use strict";
const common_vendor = require("../../common/vendor.js");
const services_ActivityLaunch = require("../../services/ActivityLaunch.js");
const utils_tool = require("../../utils/tool.js");
const services_Audit = require("../../services/Audit.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_combox2 = common_vendor.resolveComponent("uni-combox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_combox2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_number_box2 + _easycom_uni_section2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js";
const _easycom_uni_combox = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-combox/uni-combox.js";
const _easycom_uni_datetime_picker = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_checkbox = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_number_box = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.js";
const _easycom_uni_section = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section.js";
const _easycom_uni_forms = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_combox + _easycom_uni_datetime_picker + _easycom_uni_data_checkbox + _easycom_uni_number_box + _easycom_uni_section + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ActivityLaunch",
  setup(__props) {
    const isPastTargetDate = common_vendor.ref(false);
    const getA = async () => {
      const res = await services_Audit.getAudit();
      console.log(res);
      isPastTargetDate.value = res.data;
    };
    const rules = {
      studentId: {
        rules: [{ required: true, errorMessage: "学号不能为空" }]
      },
      phone: {
        rules: [
          { required: true, errorMessage: "电话不能为空" },
          { minLength: 11, maxLength: 11, errorMessage: "电话必须为11位数字" },
          {
            pattern: /^1[3-9]\d{9}$/,
            errorMessage: "非正确电话号码"
          }
        ]
      },
      population: {
        rules: [
          // population不能为0
          {
            required: true,
            errorMessage: "人数不能为空"
          },
          {
            pattern: /^\d+$/,
            errorMessage: "人数必须为数字"
          }
        ]
      },
      title: {
        rules: [{ required: true, errorMessage: "活动主题不能为空" }]
      },
      name: {
        rules: [{ required: true, errorMessage: "姓名不能为空" }]
      },
      college: {
        rules: [{ required: true, errorMessage: "学院不能为空" }]
      },
      time: {
        rules: [{ required: true, errorMessage: "时间不能为空" }]
      },
      startTime: {
        rules: [{ required: true, errorMessage: "报名开始时间不能为空" }]
      },
      address: {
        rules: [{ required: true, errorMessage: "地点不能为空" }]
      },
      sponsorName: {
        rules: [{ required: true, errorMessage: "主讲人姓名不能为空" }]
      },
      introduction: {
        rules: [{ required: true, errorMessage: "活动简介不能为空" }]
      },
      sponsorIntroduction: {
        rules: [{ required: true, errorMessage: "主讲人简介不能为空" }]
      },
      sort: {
        rules: [{ required: true, errorMessage: "活动类型不能为空" }]
      }
    };
    const content = common_vendor.ref({
      title: "",
      name: "",
      college: "",
      studentId: "",
      time: "",
      startTime: "",
      address: "",
      population: "",
      onlineAddress: "",
      phone: "",
      introduction: "",
      sponsorIntroduction: "",
      sponsorName: "",
      sort: 1
    });
    const colleges = common_vendor.ref([]);
    const selectedColleges = common_vendor.ref([]);
    const selectedCollegeChange = (e) => {
      console.log(e);
      console.log(selectedColleges.value);
      console.log(populationLimit.value);
    };
    const populationLimit = common_vendor.ref([]);
    let newLimit = common_vendor.ref([]);
    const launchActivity = async (data) => {
      console.log("显示加载中");
      const res = await services_ActivityLaunch.launchActivityAPI(data);
      console.log(res);
      common_vendor.index.hideLoading();
      if (res.code === 200) {
        common_vendor.index.hideLoading();
        console.log("取消加载中");
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success",
          duration: 1e3,
          complete: () => {
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/index/index"
              });
              reset();
            }, 1e3);
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "活动发起失败",
          icon: "none"
        });
      }
    };
    const baseform = common_vendor.ref();
    const isShowPop = common_vendor.ref("");
    const ohShitfadeOut = () => {
      console.log("xianshi ");
      const fadeOutTimeout = setTimeout(() => {
        isShowPop.value = "";
        clearTimeout(fadeOutTimeout);
      }, 3e3);
    };
    const submit = utils_tool.debounce(() => {
      baseform.value.validate().then((res) => {
        let sum = 0;
        populationLimit.value.forEach((item) => {
          sum += item.population;
        });
        console.log(res);
        if (res) {
          if (selectedColleges.value.length === 0) {
            newLimit.value = [];
          }
          common_vendor.index.showLoading({
            title: "提交中..."
          });
          console.log(selectedColleges.value);
          populationLimit.value.forEach((item) => {
            if (selectedColleges.value.some((college) => college === item.college)) {
              console.log(item.college);
              newLimit.value.push({
                deptId: item.id,
                maxNum: item.population
              });
            }
          });
          const needContent = {
            id: "",
            userImg2: content.value.title,
            userName: content.value.name,
            hbKeyword: content.value.college,
            userTel: content.value.studentId,
            lat: content.value.time,
            startTime: content.value.startTime,
            address: content.value.address,
            hot: parseInt(content.value.population),
            qphone: content.value.phone,
            //
            sort: content.value.sort,
            details: content.value.introduction,
            cityname: content.value.onlineAddress,
            speakerName: content.value.sponsorName,
            img: content.value.sponsorIntroduction,
            deptNums: newLimit.value
          };
          console.log(needContent);
          launchActivity(needContent);
        }
      }).catch((res) => {
        console.log(res);
        common_vendor.index.hideLoading();
        isShowPop.value = res[0].errorMessage;
        ohShitfadeOut();
      });
    });
    const reset = () => {
      common_vendor.index.removeStorageSync("content");
      content.value = {
        title: "",
        name: "",
        college: "",
        studentId: "",
        time: "",
        startTime: "",
        address: "",
        population: "",
        onlineAddress: "",
        phone: "",
        sort: 1,
        introduction: "",
        sponsorIntroduction: "",
        sponsorName: ""
      };
      populationLimit.value.forEach((item) => {
        item.population = 0;
      });
      newLimit.value = [];
      selectedColleges.value = [];
    };
    const save = () => {
      common_vendor.index.setStorageSync("content", content.value);
      common_vendor.index.showToast({
        title: "已保存！",
        icon: "success"
      });
    };
    const getCollegeList = async () => {
      const res = await services_ActivityLaunch.getCollegeListAPI();
      colleges.value = res.data.map((item) => ({
        value: item.deptName,
        text: item.orderNum + item.deptName
      }));
      populationLimit.value = res.data.map((item) => ({
        college: item.deptName,
        population: 0,
        id: item.deptId
      }));
      console.log(populationLimit.value);
    };
    const getLaunchPermission = async () => {
      const res = await services_ActivityLaunch.getLaunchPermissionAPI();
      if (res.code !== 200) {
        common_vendor.index.showToast({
          title: "您没有发起活动的权限",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 800);
      } else {
        getCollegeList();
        if (common_vendor.index.getStorageSync("content")) {
          content.value = common_vendor.index.getStorageSync("content");
        }
      }
    };
    common_vendor.onShow(() => {
      getA();
      getLaunchPermission();
    });
    const typeList = [
      {
        text: "学术晚茶",
        value: 1
      },
      {
        text: "学术社区",
        value: 2
      }
    ];
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isPastTargetDate.value
      }, isPastTargetDate.value ? common_vendor.e({
        b: isShowPop.value !== ""
      }, isShowPop.value !== "" ? {
        c: common_vendor.t(isShowPop.value)
      } : {}, {
        d: common_vendor.o(($event) => content.value.title = $event),
        e: common_vendor.p({
          placeholder: "请输入活动主题",
          modelValue: content.value.title
        }),
        f: common_vendor.p({
          required: true,
          label: "活动主题",
          name: "title"
        }),
        g: content.value.introduction,
        h: common_vendor.o(($event) => content.value.introduction = $event.detail.value),
        i: common_vendor.p({
          required: true,
          label: "活动简介",
          name: "introduction"
        }),
        j: common_vendor.o(($event) => content.value.name = $event),
        k: common_vendor.p({
          placeholder: "请输入姓名",
          modelValue: content.value.name
        }),
        l: common_vendor.p({
          required: true,
          label: "发布者姓名",
          name: "name"
        }),
        m: common_vendor.o(($event) => content.value.college = $event),
        n: common_vendor.p({
          candidates: colleges.value.map((item) => item.value),
          placeholder: "请选择所在学院",
          modelValue: content.value.college
        }),
        o: common_vendor.p({
          required: true,
          label: "学院",
          name: "college"
        }),
        p: common_vendor.o(($event) => content.value.studentId = $event),
        q: common_vendor.p({
          placeholder: "请输入学号",
          modelValue: content.value.studentId
        }),
        r: common_vendor.p({
          required: true,
          label: "学号",
          name: "studentId"
        }),
        s: common_vendor.o(($event) => content.value.phone = $event),
        t: common_vendor.p({
          placeholder: "请输入发起人电话",
          modelValue: content.value.phone
        }),
        v: common_vendor.p({
          required: true,
          label: "电话",
          name: "phone"
        }),
        w: common_vendor.o(($event) => content.value.sponsorName = $event),
        x: common_vendor.p({
          placeholder: "请输入主讲人姓名",
          modelValue: content.value.sponsorName
        }),
        y: common_vendor.p({
          required: true,
          label: "主讲人姓名",
          name: "sponsorName"
        }),
        z: content.value.sponsorIntroduction,
        A: common_vendor.o(($event) => content.value.sponsorIntroduction = $event.detail.value),
        B: common_vendor.p({
          required: true,
          label: "主讲人简介",
          name: "sponsorIntroduction"
        }),
        C: common_vendor.o(($event) => content.value.time = $event),
        D: common_vendor.p({
          type: "datetime",
          modelValue: content.value.time
        }),
        E: common_vendor.p({
          required: true,
          label: "举办时间",
          name: "time"
        }),
        F: common_vendor.o(($event) => content.value.startTime = $event),
        G: common_vendor.p({
          type: "datetime",
          modelValue: content.value.startTime
        }),
        H: common_vendor.p({
          required: true,
          label: "报名开始时间",
          name: "startTime"
        }),
        I: common_vendor.o(($event) => content.value.address = $event),
        J: common_vendor.p({
          placeholder: "请输入举办地点",
          modelValue: content.value.address
        }),
        K: common_vendor.p({
          required: true,
          label: "举办地点",
          name: "address"
        }),
        L: common_vendor.o(($event) => content.value.population = $event),
        M: common_vendor.p({
          placeholder: "请输入人数限制",
          modelValue: content.value.population
        }),
        N: common_vendor.p({
          required: true,
          label: "人数限制",
          name: "population"
        }),
        O: common_vendor.o(selectedCollegeChange),
        P: common_vendor.o(($event) => selectedColleges.value = $event),
        Q: common_vendor.p({
          multiple: true,
          localdata: colleges.value,
          mode: "default",
          modelValue: selectedColleges.value
        }),
        R: common_vendor.p({
          label: "学院限制"
        }),
        S: common_vendor.f(selectedColleges.value, (college, index, i0) => {
          return {
            a: "46aa9813-27-" + i0 + "," + ("46aa9813-26-" + i0),
            b: common_vendor.o(($event) => populationLimit.value.find((item) => item.college === college).population = $event, index),
            c: common_vendor.p({
              max: 1500,
              modelValue: populationLimit.value.find((item) => item.college === college).population
            }),
            d: index,
            e: "46aa9813-26-" + i0 + ",46aa9813-25",
            f: common_vendor.p({
              title: `设置${college}的报名人数`,
              type: "line",
              padding: true
            })
          };
        }),
        T: common_vendor.o(($event) => content.value.onlineAddress = $event),
        U: common_vendor.p({
          placeholder: "请输入线上地址，没有则不填",
          modelValue: content.value.onlineAddress
        }),
        V: common_vendor.p({
          label: "线上地址",
          name: "onlineAddress"
        }),
        W: common_vendor.o(($event) => content.value.sort = $event),
        X: common_vendor.p({
          localdata: typeList,
          modelValue: content.value.sort
        }),
        Y: common_vendor.p({
          required: true,
          label: "活动类型",
          name: "sort"
        }),
        Z: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(submit) && common_vendor.unref(submit)(...args)
        ),
        aa: common_vendor.o(save),
        ab: common_vendor.o(reset),
        ac: common_vendor.sr(baseform, "46aa9813-0", {
          "k": "baseform"
        }),
        ad: common_vendor.p({
          ["label-position"]: "top",
          rules,
          model: content.value,
          ["label-width"]: "100%"
        })
      }) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/pages/activity/ActivityLaunch.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=ActivityLaunch.js.map
