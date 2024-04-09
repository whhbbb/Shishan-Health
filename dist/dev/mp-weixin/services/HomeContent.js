"use strict";
const utils_http = require("../utils/http.js");
const getHomeContentAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/system/activity/list",
    data
  });
};
exports.getHomeContentAPI = getHomeContentAPI;
//# sourceMappingURL=HomeContent.js.map
