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
      const res = await services_Audit.getAudit();
      console.log(res);
      isPastTargetDate.value = res.data;
      console.log(isPastTargetDate.value);
      if (isPastTargetDate.value) {
        getRecommed();
      }
    };
    common_vendor.onLoad(() => {
      getA();
    });
    common_vendor.onReachBottom(() => {
      console.log("触发上拉");
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
        console.log(res.rows);
        total.value = res.total;
        DataSource.value = res.rows;
        pageNum = pageNum + 1;
      } else {
        if (DataSource.value.length >= total.value) {
          console.log("没数据了");
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
        console.log(res.rows);
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
      console.log(objId);
      let index = DataSource.value.findIndex((obj) => obj.id === objId);
      console.log(index);
      const res = await services_recommed.getRecommedDetail(objId);
      console.log(res);
      if (index !== -1) {
        DataSource.value.splice(index, 1, res.data);
      }
    };
    const sendLikeTo = async (id) => {
      const res = await services_recommed.sendLike(id);
      console.log(res);
      if (res.code == 200) {
        exchangeObject(id);
      }
    };
    const delLike = async (id) => {
      const res = await services_recommed.deletLike(id);
      console.log(res);
      if (res.code == 200) {
        exchangeObject(id);
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
        common_vendor.index.showToast({
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
        comment.value = "";
        exchangeObject(currentItemId.value);
      }
    };
    const sendcomment = () => {
      console.log("点击了发送");
      console.log(currentItemId.value);
      console.log(comment.value);
      sendC();
    };
    const hideInput = () => {
      showInput.value = false;
    };
    const goRDid = common_vendor.ref();
    common_vendor.onShow(() => {
      console.log(common_vendor.index.getStorageSync("goRD_id"));
      goRDid.value = common_vendor.index.getStorageSync("goRD_id");
      if (goRDid.value) {
        console.log("刷新！！！");
        exchangeObject(goRDid.value);
      }
    });
    const goRD = async (id) => {
      const res = await services_recommed.getRecommedDetail(id);
      common_vendor.index.setStorageSync("goRD_id", id);
      console.log(res);
      common_vendor.index.navigateTo({
        url: "/pages/recommend/recommendDetail?id=" + id
      });
    };
    const gotoRD = (id) => {
      console.log("去详情！");
      goRD(id);
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: isPastTargetDate.value
      }, isPastTargetDate.value ? {
        b: common_vendor.f(DataSource.value, (item0, index0, i0) => {
          return common_vendor.e({
            a: item0.avatar,
            b: common_vendor.t(item0.nickName),
            c: common_vendor.t(item0.theme),
            d: common_vendor.t(item0.lecturerName),
            e: common_vendor.t(item0.content),
            f: common_vendor.t(item0.createTime),
            g: item0.status == 1
          }, item0.status == 1 ? {
            h: "49548fa9-0-" + i0,
            i: common_vendor.p({
              type: "email-filled",
              size: "20"
            })
          } : {}, {
            j: item0.status == 2
          }, item0.status == 2 ? {
            k: "49548fa9-1-" + i0,
            l: common_vendor.p({
              type: "auth",
              size: "20"
            })
          } : item0.status == 3 ? {
            n: "49548fa9-2-" + i0,
            o: common_vendor.p({
              type: "vip-filled",
              size: "20"
            })
          } : {}, {
            m: item0.status == 3,
            p: item0.status == 1
          }, item0.status == 1 ? {} : {}, {
            q: item0.status == 2
          }, item0.status == 2 ? {} : item0.status == 3 ? {} : {}, {
            r: item0.status == 3,
            s: item0.tblLike == null
          }, item0.tblLike == null ? {
            t: "49548fa9-3-" + i0,
            v: common_vendor.p({
              type: "heart",
              size: "20"
            })
          } : {
            w: "49548fa9-4-" + i0,
            x: common_vendor.p({
              type: "heart-filled",
              color: "red",
              size: "20"
            })
          }, {
            y: common_vendor.t(item0.likeCount),
            z: common_vendor.o(($event) => iLike(item0.id, item0.tblLike), index0),
            A: "49548fa9-5-" + i0,
            B: common_vendor.o(($event) => showInputBox(item0.id), index0),
            C: item0.likes.length !== 0
          }, item0.likes.length !== 0 ? {
            D: "49548fa9-6-" + i0,
            E: common_vendor.p({
              type: "heart-filled",
              size: "20"
            }),
            F: common_vendor.f(item0.likes, (item2, index2, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item2.nickName),
                b: item2.nickName,
                c: index2 !== item0.likes.length - 1
              }, index2 !== item0.likes.length - 1 ? {} : {}, {
                d: index2
              });
            })
          } : {}, {
            G: common_vendor.f(item0.tblRecommendCommnets, (item3, index3, i1) => {
              return common_vendor.e({
                a: index3 < 4
              }, index3 < 4 ? {
                b: common_vendor.t(item3.nickName),
                c: item3.nickName
              } : {}, {
                d: index3 < 4
              }, index3 < 4 ? {
                e: common_vendor.t(item3.comment)
              } : {}, {
                f: index3
              });
            }),
            H: item0.tblRecommendCommnets.length >= 3
          }, item0.tblRecommendCommnets.length >= 3 ? {
            I: "49548fa9-7-" + i0,
            J: common_vendor.p({
              color: "rgb(88, 103, 138)",
              type: "right",
              size: "13"
            })
          } : {}, {
            K: common_vendor.o(($event) => gotoRD(item0.id), index0),
            L: index0
          });
        }),
        c: common_vendor.p({
          type: "chat",
          size: "20"
        }),
        d: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.bottom) + 100 + "rpx"
      } : {}, {
        e: isPastTargetDate.value
      }, isPastTargetDate.value ? {
        f: common_vendor.p({
          type: "plusempty",
          size: "20"
        }),
        g: common_vendor.o(rclick)
      } : {}, {
        h: showInput.value
      }, showInput.value ? {
        i: isInputFocused.value,
        j: common_vendor.o(hideInput),
        k: comment.value,
        l: common_vendor.o(($event) => comment.value = $event.detail.value),
        m: comment.value === "",
        n: common_vendor.o(sendcomment)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-49548fa9"], ["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/recommend/recommend.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=recommend.js.map
