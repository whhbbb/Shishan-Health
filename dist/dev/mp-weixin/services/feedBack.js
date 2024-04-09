"use strict";
const utils_http = require("../utils/http.js");
const postFeedbackAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/system/feedback",
    data
  });
};
exports.postFeedbackAPI = postFeedbackAPI;
//# sourceMappingURL=feedBack.js.map
