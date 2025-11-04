"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackHeaderButton = StackHeaderButton;
exports.convertStackHeaderButtonPropsToRNHeaderItem = convertStackHeaderButtonPropsToRNHeaderItem;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const common_1 = require("./common");
const utils_1 = require("../utils");
function StackHeaderButton(props) {
    return null;
}
function convertStackHeaderButtonPropsToRNHeaderItem(props) {
    const { children, style: _style, ...rest } = props;
    const stringChildren = react_1.default.Children.toArray(children)
        .filter((child) => typeof child === 'string')
        .join('');
    const label = (0, utils_1.getFirstChildOfType)(children, common_1.StackHeaderLabel);
    const iconComponent = (0, utils_1.getFirstChildOfType)(children, common_1.StackHeaderIcon);
    const icon = (() => {
        if (!iconComponent) {
            return undefined;
        }
        if ('src' in iconComponent.props) {
            return {
                type: 'image',
                source: iconComponent.props.src,
            };
        }
        return {
            type: 'sfSymbol',
            name: iconComponent.props.sf,
        };
    })();
    const style = react_native_1.StyleSheet.flatten(_style);
    return {
        ...rest,
        type: 'button',
        label: label?.props.children ?? stringChildren,
        onPress: props.onPress ?? (() => { }),
        selected: !!props.selected,
        labelStyle: style
            ? {
                ...style,
                fontWeight: typeof style.fontWeight === 'number'
                    ? String(style.fontWeight)
                    : style.fontWeight,
            }
            : undefined,
        icon,
    };
}
//# sourceMappingURL=StackHeaderButton.js.map