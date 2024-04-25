"use strict";
const common_vendor = require("../../common/vendor.js");
const services_recommed = require("../../services/recommed.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "recommendDetail",
  props: {
    id: null
  },
  setup(__props) {
    const props = __props;
    const details = common_vendor.ref();
    const getD = async (id) => {
      const res = await services_recommed.getRecommedDetail(id);
      details.value = res.data;
    };
    common_vendor.onLoad(() => {
      getD(props.id);
    });
    const sendLikeTo = async (id) => {
      const res = await services_recommed.sendLike(id);
      if (res.code == 200) {
        getD(props.id);
      }
    };
    const delLike = async (id) => {
      const res = await services_recommed.deletLike(id);
      if (res.code == 200) {
        getD(props.id);
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
    const navToAct = () => {
      common_vendor.index.navigateTo({
        url: `/pages/activity/ActivityDetails?id=${details.value.tblActivity.id}`
      });
    };
    const showInput = common_vendor.ref(false);
    const comment = common_vendor.ref("");
    const currentItemId = common_vendor.ref();
    const isInputFocused = common_vendor.ref(true);
    const showInputBox = (itemId) => {
      if (common_vendor.index.getStorageSync("token")) {
        showInput.value = true;
        currentItemId.value = itemId;
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
    const sendC = async () => {
      const res = await services_recommed.sendcommen({
        comment: comment.value,
        recommendId: currentItemId.value
      });
      if (res.code == 200) {
        showInput.value = false;
        showInput.value = false;
        comment.value = "";
        getD(props.id);
      }
    };
    const sendcomment = () => {
      sendC();
    };
    const hideInput = () => {
      showInput.value = false;
      showInput.value = false;
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return common_vendor.e({
        a: (_a = details.value) == null ? void 0 : _a.avatar,
        b: common_vendor.t((_b = details.value) == null ? void 0 : _b.nickName),
        c: common_vendor.t((_c = details.value) == null ? void 0 : _c.createTime),
        d: ((_d = details.value) == null ? void 0 : _d.status) === 3
      }, ((_e = details.value) == null ? void 0 : _e.status) === 3 ? {} : {}, {
        e: common_vendor.t((_f = details.value) == null ? void 0 : _f.theme),
        f: common_vendor.t((_g = details.value) == null ? void 0 : _g.lecturerName),
        g: common_vendor.t((_h = details.value) == null ? void 0 : _h.content),
        h: details.value.tblActivity.lng,
        i: common_vendor.t(details.value.tblActivity.userImg2),
        j: common_vendor.t(details.value.tblActivity.speakerName),
        k: common_vendor.o(navToAct),
        l: details.value.tblLike == null
      }, details.value.tblLike == null ? {} : {}, {
        m: common_vendor.t(details.value.likeCount),
        n: common_vendor.o(($event) => iLike(details.value.id, details.value.tblLike)),
        o: common_vendor.o(($event) => showInputBox(details.value.id)),
        p: details.value.likes.length !== 0
      }, details.value.likes.length !== 0 ? {
        q: common_vendor.f(details.value.likes, (item2, index2, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item2.nickName),
            b: item2.nickName,
            c: index2 !== details.value.likes.length - 1
          }, index2 !== details.value.likes.length - 1 ? {} : {}, {
            d: index2
          });
        })
      } : {}, {
        r: common_vendor.f(details.value.tblRecommendCommnets, (item3, index3, i0) => {
          return {
            a: common_vendor.t(item3.nickName),
            b: item3.nickName,
            c: common_vendor.t(item3.comment),
            d: index3
          };
        }),
        s: showInput.value
      }, showInput.value ? {
        t: isInputFocused.value,
        v: common_vendor.o(hideInput),
        w: comment.value,
        x: common_vendor.o(($event) => comment.value = $event.detail.value),
        y: comment.value === "",
        z: common_vendor.o(sendcomment)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fa681abe"], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/recommend/recommendDetail.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=recommendDetail.js.map
