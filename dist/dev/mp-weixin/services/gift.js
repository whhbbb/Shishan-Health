"use strict";
const utils_http = require("../utils/http.js");
const getGiftList = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/goods/list"
  });
};
const getGiftDetail = (id) => {
  return utils_http.http({
    method: "GET",
    url: `/system/goods/${id}`
  });
};
const exchangeGift = (data) => {
  return utils_http.http({
    method: "POST",
    url: `/system/usergoods`,
    data
  });
};
const getGiftHistory = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/usergoods/list?type=1"
  });
};
const getCreidHistory = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/credituser/list"
  });
};
exports.exchangeGift = exchangeGift;
exports.getCreidHistory = getCreidHistory;
exports.getGiftDetail = getGiftDetail;
exports.getGiftHistory = getGiftHistory;
exports.getGiftList = getGiftList;
//# sourceMappingURL=gift.js.map
