"use strict";
const utils_http = require("../utils/http.js");
const getColumnsAPI = (data) => {
  return utils_http.http({
    url: "/system/column/list",
    method: "GET",
    data
  });
};
const likeUpAPI = (id) => {
  return utils_http.http({
    url: `/system/column/like/${id}`,
    method: "GET"
  });
};
const likeDownAPI = (id) => {
  return utils_http.http({
    url: `/system/column/like/${id}`,
    method: "DELETE"
  });
};
const getColumnsDetailAPI = (id, type = 2) => {
  return utils_http.http({
    url: `/system/column/${id}/${type}`,
    method: "GET"
  });
};
exports.getColumnsAPI = getColumnsAPI;
exports.getColumnsDetailAPI = getColumnsDetailAPI;
exports.likeDownAPI = likeDownAPI;
exports.likeUpAPI = likeUpAPI;
//# sourceMappingURL=column.js.map
