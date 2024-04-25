"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ActivityDetails",
  props: {
    id: null
  },
  setup(__props) {
    const props = __props;
    const countDown = common_vendor.ref();
    const data0 = common_vendor.ref();
    let AId = props.id;
    const getDetailsAPI = (data) => {
      return utils_http.http({
        url: data,
        method: "GET"
      });
    };
    const applyAPI = (data) => {
      return utils_http.http({
        method: "POST",
        url: "/system/useractivity",
        data
      });
    };
    const getDetails = async (url) => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      const res = await getDetailsAPI(url);
      common_vendor.index.hideLoading();
      console.log(res);
      data0.value = res.data;
      data0.value.isEnd = res.data.isEnd == 1 ? "进行中" : "已结束";
      data0.value.isApplication = res.data.isApplication === null ? [] : res.data.isApplication;
    };
    const apply = async (data) => {
      const res = await applyAPI(data);
      if (res.code === 200) {
        common_vendor.wx$1.showToast({
          title: res.msg,
          icon: "success",
          duration: 2e3,
          success: () => {
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/index/index"
              });
            }, 2e3);
          }
        });
        data0.value.is_close = 1;
      } else {
        common_vendor.wx$1.showToast({
          title: res.msg,
          icon: "none",
          duration: 2e3
        });
      }
    };
    function parseDateForIOS(dateString) {
      dateString = dateString.replace(/-/g, "/");
      if (dateString.includes(" ")) {
        const [datePart, timePart] = dateString.split(" ");
        dateString = `${datePart} ${timePart.split(":")[0]}:${timePart.split(":")[1]}`;
      }
      return new Date(dateString);
    }
    const countTime = () => {
      let now = (/* @__PURE__ */ new Date()).getTime();
      let endTime = parseDateForIOS(data0.value.lat).getTime() - 2 * 60 * 60 * 1e3;
      let time = endTime - now;
      let day = Math.floor(time / (24 * 3600 * 1e3));
      let hour = Math.floor(time % (24 * 3600 * 1e3) / (3600 * 1e3));
      let minute = Math.floor(time % (3600 * 1e3) / (60 * 1e3));
      let second = Math.floor(time % (60 * 1e3) / 1e3);
      return `${day}天${hour}时${minute}分${second}秒`;
    };
    common_vendor.onLoad(async (options) => {
      let obj = common_vendor.wx$1.getLaunchOptionsSync();
      let query = null;
      let url = `/system/activity/${props.id}`;
      console.log(props.id + "11111");
      if (options.scene || obj.query.scene) {
        console.log("options.scene", options);
        console.log("obj.query.scene", obj.query);
        query = options ? decodeURIComponent(options.scene) : decodeURIComponent(obj.query.scene);
        console.log(query);
        AId = query;
        url = `/system/activity/${query}`;
      }
      await getDetails(url);
      countDown.value = countTime();
      setInterval(() => {
        countDown.value = countTime();
      }, 1e3);
    });
    common_vendor.onHide(() => {
    });
    const applyon = () => {
      if (common_vendor.index.getStorageSync("token")) {
        common_vendor.wx$1.showModal({
          title: "确认报名",
          content: "确定要报名吗？",
          success(res) {
            if (res.confirm) {
              apply({
                activityId: AId
              });
              const url = `/system/activity/${AId}`;
              getDetails(url);
            } else if (res.cancel) {
              console.log("用户取消了报名");
            }
          }
        });
      } else {
        common_vendor.wx$1.showToast({
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
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data0.value.lng,
        b: common_vendor.t(data0.value.userImg2),
        c: common_vendor.t(data0.value.hbKeyword),
        d: common_vendor.t(data0.value.lat),
        e: common_vendor.t(data0.value.img),
        f: common_vendor.t(data0.value.details),
        g: common_vendor.t(data0.value.hbNum),
        h: common_vendor.t(data0.value.hot),
        i: data0.value.isClose == 2
      }, data0.value.isClose == 2 ? {} : data0.value.isClose == 1 ? {
        k: common_vendor.t(countDown.value)
      } : data0.value.isClose == 0 ? {
        m: common_vendor.t(data0.value.startTime)
      } : {}, {
        j: data0.value.isClose == 1,
        l: data0.value.isClose == 0,
        n: data0.value.isClose === 0
      }, data0.value.isClose === 0 ? {} : data0.value.isApplication.length === 0 && data0.value.isClose === 1 ? {
        p: common_vendor.o(applyon)
      } : data0.value.isApplication.length > 0 && data0.value.isClose === 1 ? {} : data0.value.isClose == 2 ? {} : {}, {
        o: data0.value.isApplication.length === 0 && data0.value.isClose === 1,
        q: data0.value.isApplication.length > 0 && data0.value.isClose === 1,
        r: data0.value.isClose == 2
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/activity/ActivityDetails.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=ActivityDetails.js.map
