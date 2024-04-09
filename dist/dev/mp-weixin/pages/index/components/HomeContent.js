"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_HomeContent = require("../../../services/HomeContent.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_data_select2 + _easycom_uni_tag2 + _easycom_uni_load_more2)();
}
const _easycom_uni_data_select = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.js";
const _easycom_uni_tag = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag.js";
const _easycom_uni_load_more = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_tag + _easycom_uni_load_more)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "HomeContent",
  setup(__props) {
    const status = common_vendor.ref("全部");
    const statusN = common_vendor.ref(0);
    const pageNum = common_vendor.ref(1);
    const pageSize = 10;
    const totalNum = common_vendor.ref(0);
    const finish = common_vendor.ref("more");
    const nowList = common_vendor.ref(0);
    const statusList = common_vendor.ref([
      { value: 0, text: "全部" },
      { value: 1, text: "进行中" },
      { value: 2, text: "已结束" },
      { value: 3, text: "精选" }
    ]);
    const change = (e, tag = 1) => {
      if (tag === 1) {
        finish.value = "more";
        activities.value = [];
        pageNum.value = 1;
      }
      console.log(e);
      nowList.value = e;
      if (e === 0) {
        statusN.value = 0;
        getHomeContent(0, 0, 0, pageNum.value);
      } else if (e === 1) {
        statusN.value = 1;
        getHomeContent(1, 2, 1, pageNum.value);
      } else if (e === 2) {
        statusN.value = 2;
        getHomeContent(1, 2, 2, pageNum.value);
      } else {
        statusN.value = 3;
        getHomeContent(2, 2, 1, pageNum.value);
      }
    };
    const activities = common_vendor.ref([]);
    const tapJoin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my/components/myactivity/activity"
      });
    };
    const tapSignIn = () => {
      common_vendor.index.navigateTo({
        url: "/pages/activity/ActivitySignIn"
      });
    };
    const getHomeContent = async (type, state, isEnd, pageNum2 = 1, pageSize2 = 10) => {
      let res;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      finish.value = "loading";
      if (type === 0) {
        res = await services_HomeContent.getHomeContentAPI({ state: 2, pageNum: pageNum2, pageSize: pageSize2 });
      } else if (type == 1) {
        res = await services_HomeContent.getHomeContentAPI({ state, isEnd, pageNum: pageNum2, pageSize: pageSize2 });
      } else {
        res = await services_HomeContent.getHomeContentAPI({ type, state, pageNum: pageNum2, pageSize: pageSize2 });
      }
      common_vendor.index.hideLoading();
      finish.value = "more";
      if (res.code === 200) {
        totalNum.value = res.total;
        let innerActivities = res.rows.map((item) => ({
          id: item.id,
          title: item.userImg2,
          status: item.isEnd == 1 ? "进行中" : "已结束",
          time: item.lat,
          address: item.address,
          sponsorCollege: item.hbKeyword,
          population: item.hbNum,
          limitPopulation: item.hot,
          sort: item.sort
        }));
        activities.value.push(...innerActivities);
        if (activities.value.length === 0) {
          common_vendor.index.showToast({
            title: "暂无活动",
            icon: "none"
          });
          finish.value = "no-more";
        }
        if (pageNum2 * pageSize2 >= totalNum.value) {
          finish.value = "no-more";
        }
      } else {
        common_vendor.index.showToast({
          title: "查询失败",
          icon: "none"
        });
      }
    };
    const onScrolltolower = () => {
      if (pageNum.value * pageSize >= totalNum.value) {
        finish.value = "no-more";
        return common_vendor.index.showToast({ icon: "none", title: "没有更多数据了~" });
      } else {
        pageNum.value += 1;
      }
      change(nowList.value, 2);
    };
    common_vendor.onLoad(() => {
      console.log("onLoad!!!");
      common_vendor.index.onNetworkStatusChange((res) => {
        if (!res.isConnected) {
          common_vendor.index.showToast({
            title: "网络已断开",
            icon: "none"
          });
        }
      });
      getHomeContent(0, 0, 0);
      common_vendor.index.$on("scrolltolower", onScrolltolower);
    });
    common_vendor.onHide(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(tapJoin),
        b: common_vendor.o(tapSignIn),
        c: common_vendor.o(change),
        d: common_vendor.o(($event) => status.value = $event),
        e: common_vendor.p({
          localdata: statusList.value,
          placeholder: "全部",
          clear: false,
          modelValue: status.value
        }),
        f: common_vendor.f(activities.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: item.sort == 1
          }, item.sort == 1 ? {
            c: "1a52a774-1-" + i0,
            d: common_vendor.p({
              type: "primary",
              text: "学术晚茶"
            })
          } : {
            e: "1a52a774-2-" + i0,
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
            n: `/pages/activity/ActivityDetails?id=${item.id}`
          });
        }),
        g: common_vendor.p({
          status: finish.value
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/index/components/HomeContent.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=HomeContent.js.map
