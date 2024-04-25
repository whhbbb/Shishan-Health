"use strict";
const common_vendor = require("../../common/vendor.js");
const services_recommed = require("../../services/recommed.js");
const utils_tool = require("../../utils/tool.js");
const services_Audit = require("../../services/Audit.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "recommend",
  setup(__props) {
    common_vendor.ref(/* @__PURE__ */ new Date());
    const isPastTargetDate = common_vendor.ref(true);
    const getA = async () => {
      pageNum = 1;
      const res = await services_Audit.getAudit();
      isPastTargetDate.value = res.data;
      if (isPastTargetDate.value) {
        getRecommed();
      }
    };
    const navToAct = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/activity/ActivityDetails?id=${id}`
      });
    };
    common_vendor.onReachBottom(() => {
      getRecommed();
    });
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    let pageNum = 1;
    const total = common_vendor.ref();
    const DataSource = common_vendor.ref([]);
    const getRecommed = utils_tool.debounce(async () => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      if (pageNum == 1) {
        const res = await services_recommed.getRecommedList({
          pageNum,
          pageSize: 10
        });
        total.value = res.total;
        DataSource.value = res.rows;
        pageNum = pageNum + 1;
      } else {
        if (DataSource.value.length >= total.value) {
          common_vendor.index.showToast({
            title: "已经到底啦",
            icon: "none",
            durationL: 800
          });
          return;
        }
        const res = await services_recommed.getRecommedList({
          pageNum,
          pageSize: 10
        });
        total.value = res.total;
        DataSource.value = [...DataSource.value, ...res.rows];
        pageNum = pageNum + 1;
      }
      common_vendor.index.hideLoading();
    });
    const rclick = () => {
      common_vendor.index.navigateTo({
        url: "/pages/recommend/makeRecd"
      });
    };
    const exchangeObject = async (objId) => {
      let index = DataSource.value.findIndex((obj) => obj.id === objId);
      const res = await services_recommed.getRecommedDetail(objId);
      if (index !== -1) {
        DataSource.value.splice(index, 1, res.data);
      }
    };
    const sendLikeTo = async (id) => {
      const res = await services_recommed.sendLike(id);
      if (res.code == 200) {
        exchangeObject(id);
      }
    };
    const delLike = async (id) => {
      const res = await services_recommed.deletLike(id);
      if (res.code == 200) {
        exchangeObject(id);
      }
    };
    const iLike = (id, tblLike) => {
      if (common_vendor.index.getStorageSync("token")) {
        if (tblLike) {
          delLike(id);
        } else {
          sendLikeTo(id);
        }
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
    common_vendor.ref(false);
    common_vendor.ref("");
    common_vendor.ref();
    common_vendor.ref(true);
    common_vendor.ref();
    const goRD = async (id) => {
      await services_recommed.getRecommedDetail(id);
      common_vendor.index.setStorageSync("goRD_id", id);
      common_vendor.index.navigateTo({
        url: "/pages/recommend/recommendDetail?id=" + id
      });
    };
    const gotoRD = (id) => {
      goRD(id);
    };
    common_vendor.onLoad(() => {
      getA();
    });
    common_vendor.onShow(() => {
      getA();
    });
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: isPastTargetDate.value
      }, isPastTargetDate.value ? {
        b: common_vendor.f(DataSource.value, (item0, index0, i0) => {
          var _a2, _b, _c;
          return common_vendor.e({
            a: item0.avatar,
            b: common_vendor.t(item0.nickName),
            c: common_vendor.t(item0.createTime),
            d: item0.status == 3
          }, item0.status == 3 ? {} : {}, {
            e: common_vendor.t(item0.content),
            f: (_a2 = item0.tblActivity) == null ? void 0 : _a2.lng,
            g: common_vendor.t((_b = item0.tblActivity) == null ? void 0 : _b.userImg2),
            h: common_vendor.t((_c = item0.tblActivity) == null ? void 0 : _c.speakerName),
            i: common_vendor.o(($event) => {
              var _a3;
              return navToAct((_a3 = item0.tblActivity) == null ? void 0 : _a3.id);
            }, index0),
            j: item0.tblLike == null
          }, item0.tblLike == null ? {
            k: common_vendor.o(($event) => iLike(item0.id, item0.tblLike), index0)
          } : {
            l: common_vendor.o(($event) => iLike(item0.id, item0.tblLike), index0)
          }, {
            m: common_vendor.t(item0.likeCount),
            n: common_vendor.o(($event) => gotoRD(item0.id), index0),
            o: index0
          });
        }),
        c: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.bottom) + 100 + "rpx"
      } : {}, {
        d: isPastTargetDate.value
      }, isPastTargetDate.value ? {
        e: common_vendor.p({
          type: "plusempty",
          size: "20"
        }),
        f: common_vendor.o(rclick)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-49548fa9"], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/recommend/recommend.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=recommend.js.map
