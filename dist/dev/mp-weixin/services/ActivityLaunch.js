"use strict";
const utils_http = require("../utils/http.js");
const getCollegeListAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/depts/list"
  });
};
const launchActivityAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/system/activity",
    data
  });
};
const editActivityAPI = (data) => {
  return utils_http.http({
    method: "PUT",
    url: "/system/activity/edit",
    data
  });
};
const getActivityInfoAPI = (id) => {
  return utils_http.http({
    method: "GET",
    url: `/system/activity/${id}`
  });
};
const getLaunchPermissionAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/activity/menu"
  });
};
exports.editActivityAPI = editActivityAPI;
exports.getActivityInfoAPI = getActivityInfoAPI;
exports.getCollegeListAPI = getCollegeListAPI;
exports.getLaunchPermissionAPI = getLaunchPermissionAPI;
exports.launchActivityAPI = launchActivityAPI;
//# sourceMappingURL=ActivityLaunch.js.map
