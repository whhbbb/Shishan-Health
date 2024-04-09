"use strict";
const common_vendor = require("../../common/vendor.js");
const services_recommed = require("../../services/recommed.js");
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
  __name: "recommendDetail",
  props: {
    id: null
  },
  setup(__props) {
    const props = __props;
    const details = common_vendor.ref({});
    const getD = async (id) => {
      const res = await services_recommed.getRecommedDetail(id);
      console.log(res);
      details.value = res.data;
    };
    common_vendor.onLoad(() => {
      getD(props.id);
    });
    const sendLikeTo = async (id) => {
      const res = await services_recommed.sendLike(id);
      console.log(res);
      if (res.code == 200) {
        getD(props.id);
      }
    };
    const delLike = async (id) => {
      const res = await services_recommed.deletLike(id);
      console.log(res);
      if (res.code == 200) {
        getD(props.id);
      }
    };
    const iLike = (id, tblLike) => {
      if (common_vendor.index.getStorageSync("token")) {
        if (tblLike) {
          console.log("取消点赞！");
          delLike(id);
        } else {
          console.log("点赞");
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
    const showInput = common_vendor.ref(false);
    const comment = common_vendor.ref("");
    const currentItemId = common_vendor.ref();
    const isInputFocused = common_vendor.ref(true);
    const showInputBox = (itemId) => {
      if (common_vendor.index.getStorageSync("token")) {
        console.log("评论");
        console.log(itemId);
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
      console.log(res);
      if (res.code == 200) {
        showInput.value = false;
        showInput.value = false;
        comment.value = "";
        getD(props.id);
      }
    };
    const sendcomment = () => {
      console.log("点击了发送");
      console.log(currentItemId.value);
      sendC();
    };
    const hideInput = () => {
      showInput.value = false;
      showInput.value = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: details.value.avatar,
        b: common_vendor.t(details.value.nickName),
        c: common_vendor.t(details.value.createTime),
        d: common_vendor.t(details.value.theme),
        e: common_vendor.t(details.value.lecturerName),
        f: common_vendor.t(details.value.content),
        g: details.value.status == 1
      }, details.value.status == 1 ? {
        h: common_vendor.p({
          type: "email-filled",
          size: "20"
        })
      } : {}, {
        i: details.value.status == 2
      }, details.value.status == 2 ? {
        j: common_vendor.p({
          type: "auth",
          size: "20"
        })
      } : details.value.status == 3 ? {
        l: common_vendor.p({
          type: "vip-filled",
          size: "20"
        })
      } : {}, {
        k: details.value.status == 3,
        m: details.value.status == 1
      }, details.value.status == 1 ? {} : {}, {
        n: details.value.status == 2
      }, details.value.status == 2 ? {} : details.value.status == 3 ? {} : {}, {
        o: details.value.status == 3,
        p: details.value.tblLike == null
      }, details.value.tblLike == null ? {
        q: common_vendor.p({
          type: "heart",
          size: "20"
        })
      } : {
        r: common_vendor.p({
          type: "heart-filled",
          color: "red",
          size: "20"
        })
      }, {
        s: common_vendor.t(details.value.likeCount),
        t: common_vendor.o(($event) => iLike(details.value.id, details.value.tblLike)),
        v: common_vendor.p({
          type: "chat",
          size: "20"
        }),
        w: common_vendor.o(($event) => showInputBox(details.value.id)),
        x: details.value.likes.length !== 0
      }, details.value.likes.length !== 0 ? {
        y: common_vendor.p({
          type: "heart-filled",
          size: "20"
        }),
        z: common_vendor.f(details.value.likes, (item2, index2, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item2.nickName),
            b: item2.nickName,
            c: index2 !== details.value.likes.length - 1
          }, index2 !== details.value.likes.length - 1 ? {} : {}, {
            d: index2
          });
        })
      } : {}, {
        A: common_vendor.f(details.value.tblRecommendCommnets, (item3, index3, i0) => {
          return {
            a: common_vendor.t(item3.nickName),
            b: item3.nickName,
            c: common_vendor.t(item3.comment),
            d: common_vendor.t(item3.createTime),
            e: index3
          };
        }),
        B: showInput.value
      }, showInput.value ? {
        C: isInputFocused.value,
        D: common_vendor.o(hideInput),
        E: comment.value,
        F: common_vendor.o(($event) => comment.value = $event.detail.value),
        G: comment.value === "",
        H: common_vendor.o(sendcomment)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fa681abe"], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/recommend/recommendDetail.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=recommendDetail.js.map
