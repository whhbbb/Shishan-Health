"use strict";
function debounce(handler, interval) {
  const wait = interval || 1500;
  var lastTime = 0;
  return function() {
    var nowTime = (/* @__PURE__ */ new Date()).getTime();
    if (nowTime - lastTime > wait) {
      handler.apply(this, arguments);
      lastTime = nowTime;
    }
  };
}
exports.debounce = debounce;
//# sourceMappingURL=tool.js.map
