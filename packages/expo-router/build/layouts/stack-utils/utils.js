"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChildOfType = isChildOfType;
exports.getFirstChildOfType = getFirstChildOfType;
const react_1 = require("react");
function isChildOfType(element, type) {
    return (0, react_1.isValidElement)(element) && element.type === type;
}
function getFirstChildOfType(children, type) {
    return react_1.Children.toArray(children).find((child) => isChildOfType(child, type));
}
//# sourceMappingURL=utils.js.map