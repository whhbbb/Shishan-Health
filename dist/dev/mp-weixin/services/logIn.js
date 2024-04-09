"use strict";
const utils_http = require("../utils/http.js");
const logInAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/login",
    data
  });
};
exports.logInAPI = logInAPI;
//# sourceMappingURL=logIn.js.map
