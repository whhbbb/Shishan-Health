"use strict";
const utils_http = require("../utils/http.js");
const getMyActivityAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/useractivity/myactivity"
  });
};
const getMyAddActivityAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/useractivity/myaddactivity"
  });
};
const getConnect = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/head/list"
  });
};
exports.getConnect = getConnect;
exports.getMyActivityAPI = getMyActivityAPI;
exports.getMyAddActivityAPI = getMyAddActivityAPI;
//# sourceMappingURL=my.js.map
