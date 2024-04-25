"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_personalInf = require("../../../services/personalInf.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "userImage",
  props: {
    userAvatar: null
  },
  setup(__props) {
    const props = __props;
    const popup = common_vendor.ref();
    const avatar = common_vendor.ref(props.userAvatar);
    const editUserImg = async (imgUrl) => {
      const res = await services_personalInf.changePersonalInf({
        // userName: props.userName,
        avatar: imgUrl
      });
      console.log(res);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "none"
        });
        avatar.value = imgUrl;
      } else {
        common_vendor.index.showToast({
          title: "修改失败",
          icon: "none"
        });
      }
    };
    const doImg = () => {
      console.log("点击了图片");
      if (popup.value) {
        popup.value.open("bottom");
      }
    };
    const chooseImage = () => {
      var _a;
      console.log("从相册选择");
      (_a = popup.value) == null ? void 0 : _a.close();
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["album"],
        success: (success) => {
          common_vendor.index.uploadFile({
            url: "https://www.academictime.cn:3166/system/common/upload",
            filePath: success.tempFilePaths[0],
            header: {
              Authorization: "Bearer " + common_vendor.index.getStorageSync("token"),
              "Content-Type": "multipart/form-data"
            },
            name: "file",
            success: (success2) => {
              console.log(success2);
              const resData = JSON.parse(success2.data);
              console.log(resData);
              editUserImg(resData.msg);
            }
          });
        },
        fail: (err) => {
          console.log(err);
          common_vendor.index.showToast({
            title: "上传失败",
            icon: "none"
          });
        },
        complete: (complete) => {
          console.log(complete);
        }
      });
    };
    const saveImage = () => {
      var _a;
      (_a = popup.value) == null ? void 0 : _a.close();
      common_vendor.index.downloadFile({
        url: avatar.value,
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: (success) => {
                console.log(success);
              },
              fail: (err) => {
                console.log(err);
              },
              complete: (complete) => {
                console.log(complete);
              }
            });
          } else {
            common_vendor.index.showToast({
              title: "保存失败",
              icon: "none"
            });
          }
        },
        fail: (fail) => {
          console.log("下载失败", fail);
        }
      });
    };
    const cancel = () => {
      var _a;
      console.log("取消");
      (_a = popup.value) == null ? void 0 : _a.close();
    };
    return (_ctx, _cache) => {
      return {
        a: avatar.value,
        b: common_vendor.o(doImg),
        c: common_vendor.o(chooseImage),
        d: common_vendor.o(saveImage),
        e: common_vendor.o(cancel),
        f: common_vendor.sr(popup, "0d3ceef4-0", {
          "k": "popup"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/whhbbb/Documents/Project-storage/xswc_game/src/pages/my/components/userImage.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=userImage.js.map
