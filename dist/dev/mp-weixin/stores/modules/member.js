"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.defineStore(
  "member",
  () => {
    const profile = common_vendor.ref();
    const setProfile = (val) => {
      profile.value = val;
    };
    const clearProfile = () => {
      profile.value = void 0;
    };
    return {
      profile,
      // memberInfo,
      setProfile,
      clearProfile
    };
  },
  // TODO: 持久化
  {
    persist: {
      storage: {
        setItem(key, value) {
          common_vendor.index.setStorageSync(key, value);
        },
        getItem(key) {
          return common_vendor.index.getStorageSync(key);
        }
      }
    }
  }
);
//# sourceMappingURL=member.js.map
