"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackHeaderLeft = StackHeaderLeft;
exports.StackHeaderRight = StackHeaderRight;
exports.appendStackHeaderRightPropsToOptions = appendStackHeaderRightPropsToOptions;
exports.appendStackHeaderLeftPropsToOptions = appendStackHeaderLeftPropsToOptions;
const react_1 = __importDefault(require("react"));
const utils_1 = require("../utils");
const StackHeaderButton_1 = require("./StackHeaderButton");
const StackHeaderItem_1 = require("./StackHeaderItem");
const StackHeaderSpacing_1 = require("./StackHeaderSpacing");
const common_1 = require("./common");
function StackHeaderLeft(props) {
    return null;
}
function StackHeaderRight(props) {
    return null;
}
function convertHeaderRightLeftChildrenToUnstableItems(children, side) {
    const allChildren = react_1.default.Children.toArray(children);
    const actions = allChildren.filter((child) => (0, utils_1.isChildOfType)(child, StackHeaderButton_1.StackHeaderButton) ||
        (0, utils_1.isChildOfType)(child, common_1.StackHeaderMenu) ||
        (0, utils_1.isChildOfType)(child, StackHeaderSpacing_1.StackHeaderSpacing) ||
        (0, utils_1.isChildOfType)(child, StackHeaderItem_1.StackHeaderItem));
    if (actions.length !== allChildren.length) {
        console.warn(`Stack.Header.${side} only accepts <Stack.Header.Button>, <Stack.Header.Menu>, <Menu>, and <Stack.Header.Item> as children.`);
    }
    return () => actions.map((action) => {
        if ((0, utils_1.isChildOfType)(action, StackHeaderButton_1.StackHeaderButton)) {
            return (0, StackHeaderButton_1.convertStackHeaderButtonPropsToRNHeaderItem)(action.props);
        }
        else if ((0, utils_1.isChildOfType)(action, common_1.StackHeaderMenu)) {
            return (0, common_1.convertStackHeaderMenuPropsToRNHeaderItem)(action.props);
        }
        else if ((0, utils_1.isChildOfType)(action, StackHeaderSpacing_1.StackHeaderSpacing)) {
            return (0, StackHeaderSpacing_1.convertStackHeaderSpacingPropsToRNHeaderItem)(action.props);
        }
        return (0, StackHeaderItem_1.convertStackHeaderItemPropsToRNHeaderItem)(action.props);
    });
}
function appendStackHeaderRightPropsToOptions(options, props) {
    if (props.asChild) {
        return {
            ...options,
            headerRight: () => props.children,
        };
    }
    return {
        ...options,
        unstable_headerRightItems: convertHeaderRightLeftChildrenToUnstableItems(props.children, 'Right'),
    };
}
function appendStackHeaderLeftPropsToOptions(options, props) {
    if (props.asChild) {
        return {
            ...options,
            headerLeft: () => props.children,
        };
    }
    return {
        ...options,
        unstable_headerLeftItems: convertHeaderRightLeftChildrenToUnstableItems(props.children, 'Left'),
    };
}
//# sourceMappingURL=StackHeaderLeftRight.js.map