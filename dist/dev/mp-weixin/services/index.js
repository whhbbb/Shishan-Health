"use strict";
const utils_http = require("../utils/http.js");
const getIndexImg = () => {
  return utils_http.http({
    method: "GET",
    url: "/system/notice/list?status=0"
  });
};
exports.getIndexImg = getIndexImg;
//# sourceMappingURL=index.js.map
