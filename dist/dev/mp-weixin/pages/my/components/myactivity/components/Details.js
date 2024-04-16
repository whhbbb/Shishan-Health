"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const services_my = require("../../../../../services/my.js");
require("../../../../../utils/http.js");
require("../../../../../stores/index.js");
require("../../../../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_tag2 + _easycom_uni_icons2)();
}
const _easycom_uni_tag = () => "../../../../../node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag.js";
const _easycom_uni_icons = () => "../../../../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_icons)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Details",
  props: {
    state: {
      type: Number,
      default: 0
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const activities = common_vendor.ref([]);
    const getMyActivity = async () => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let res;
      if (props.state == 0) {
        res = await services_my.getMyActivityAPI();
      } else {
        res = await services_my.getMyAddActivityAPI();
      }
      common_vendor.index.hideLoading();
      activities.value = [];
      if (res.data.length > 0) {
        res.data.forEach((item) => {
          activities.value.push({
            id: item.id,
            title: item.userImg2,
            status: props.state == 0 ? item.status == 1 ? "进行中" : "已结束" : item.state == 1 ? "审核中" : item.state == 2 ? "审核通过" : "待修改",
            time: item.lat,
            address: item.address,
            sponsorCollege: item.hbKeyword,
            population: item.hbNum,
            limitPopulation: item.hot,
            url: props.state == 0 ? `/pages/activity/ActivityDetails?id=${item.activityId}` : item.state == 2 ? `/pages/activity/ActivityDetails?id=${item.id}` : `/pages/activity/ActivityEdit?id=${item.id}`,
            sort: item.sort
          });
        });
      } else {
        hasActivity.value = false;
      }
    };
    const isLogin = common_vendor.ref(true);
    const hasActivity = common_vendor.ref(true);
    common_vendor.onMounted(() => {
      console.log(props.state);
      if (common_vendor.index.getStorageSync("token")) {
        getMyActivity();
      } else {
        isLogin.value = false;
      }
    });
    common_vendor.onShow(() => {
      if (common_vendor.index.getStorageSync("token")) {
        getMyActivity();
      } else {
        isLogin.value = false;
      }
    });
    const goLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLogin.value && hasActivity.value
      }, isLogin.value && hasActivity.value ? {
        b: common_vendor.f(activities.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: item.sort == 1
          }, item.sort == 1 ? {
            c: "4dbeae18-0-" + i0,
            d: common_vendor.p({
              type: "primary",
              text: "学术晚茶"
            })
          } : {
            e: "4dbeae18-1-" + i0,
            f: common_vendor.p({
              type: "success",
              text: "学术社区"
            })
          }, {
            g: common_vendor.t(item.sponsorCollege),
            h: common_vendor.t(item.time),
            i: common_vendor.t(item.address),
            j: common_vendor.t(item.population),
            k: common_vendor.t(item.limitPopulation),
            l: common_vendor.t(item.status),
            m: item.id,
            n: item.url
          });
        })
      } : isLogin.value && !hasActivity.value ? {} : {
        d: common_vendor.p({
          type: "person",
          size: "90"
        }),
        e: common_vendor.o(goLogin)
      }, {
        c: isLogin.value && !hasActivity.value
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/feidian/计算机设计大赛/xswc_cs/src/pages/my/components/myactivity/components/Details.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=Details.js.map
