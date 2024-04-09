"use strict";
const utils_http = require("../utils/http.js");
const getRecommedList = (query) => {
  return utils_http.http({
    method: "GET",
    url: `/system/recommend/list/?pageNum=${query.pageNum}&pageSize=${query.pageSize}`
  });
};
const getRecommedDetail = (id) => {
  return utils_http.http({
    method: "GET",
    url: `/system/recommend/${id}`
  });
};
const sendLike = (id) => {
  return utils_http.http({
    method: "GET",
    url: `/system/recommend/like/${id}`
  });
};
const deletLike = (id) => {
  return utils_http.http({
    method: "DELETE",
    url: `/system/recommend/like/${id}`
  });
};
const sendcommen = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/system/recommnedcomment",
    data
  });
};
const newRecommend = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/system/recommend",
    data
  });
};
exports.deletLike = deletLike;
exports.getRecommedDetail = getRecommedDetail;
exports.getRecommedList = getRecommedList;
exports.newRecommend = newRecommend;
exports.sendLike = sendLike;
exports.sendcommen = sendcommen;
//# sourceMappingURL=recommed.js.map
