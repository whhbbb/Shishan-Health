"use strict";
const utils_http = require("../utils/http.js");
const getAudit = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/xswc"
  });
};
exports.getAudit = getAudit;
//# sourceMappingURL=Audit.js.map
