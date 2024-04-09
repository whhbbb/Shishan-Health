"use strict";
const utils_http = require("../utils/http.js");
const getPersonalInf = () => {
  return utils_http.http({
    method: "GET",
    url: "/user"
  });
};
const changePersonalInf = (data) => {
  return utils_http.http({
    method: "PUT",
    url: "/user",
    data
  });
};
const changePassword = (data) => {
  return utils_http.http({
    method: "PUT",
    url: "/user/resetPwd",
    data
  });
};
exports.changePassword = changePassword;
exports.changePersonalInf = changePersonalInf;
exports.getPersonalInf = getPersonalInf;
//# sourceMappingURL=personalInf.js.map
