"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackHeaderMenuAction = exports.StackHeaderMenu = exports.StackHeaderBadge = exports.StackHeaderIcon = exports.StackHeaderLabel = void 0;
exports.convertStackHeaderMenuPropsToRNHeaderItem = convertStackHeaderMenuPropsToRNHeaderItem;
exports.convertStackHeaderMenuActionPropsToRNHeaderItem = convertStackHeaderMenuActionPropsToRNHeaderItem;
const react_1 = require("react");
const react_native_1 = require("react-native");
const primitives_1 = require("../../../primitives");
const utils_1 = require("../utils");
exports.StackHeaderLabel = primitives_1.Label;
exports.StackHeaderIcon = primitives_1.Icon;
exports.StackHeaderBadge = primitives_1.Badge;
exports.StackHeaderMenu = primitives_1.Menu;
function convertStackHeaderMenuPropsToRNHeaderItem(props) {
    const { children, title, style: _style, ...rest } = props;
    const stringChildren = react_1.Children.toArray(children)
        .filter((child) => typeof child === 'string')
        .join('');
    const label = (0, utils_1.getFirstChildOfType)(children, exports.StackHeaderLabel);
    const iconComponent = (0, utils_1.getFirstChildOfType)(children, exports.StackHeaderIcon);
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
    const actions = react_1.Children.toArray(children).filter((child) => (0, utils_1.isChildOfType)(child, exports.StackHeaderMenuAction) || (0, utils_1.isChildOfType)(child, exports.StackHeaderMenu));
    const labelStyle = react_native_1.StyleSheet.flatten(style
        ? {
            ...style,
            fontWeight: typeof style.fontWeight === 'number'
                ? String(style.fontWeight)
                : style.fontWeight,
        }
        : undefined);
    return {
        ...rest,
        type: 'menu',
        menu: {
            title,
            items: actions.map((action) => {
                if ((0, utils_1.isChildOfType)(action, exports.StackHeaderMenu)) {
                    return convertStackHeaderSubmenuMenuPropsToRNHeaderItem(action.props);
                }
                return convertStackHeaderMenuActionPropsToRNHeaderItem(action.props);
            }),
        },
        label: label?.props.children ?? stringChildren,
        labelStyle,
        icon,
    };
}
function convertStackHeaderSubmenuMenuPropsToRNHeaderItem(props) {
    const { children, title, ...rest } = props;
    const stringChildren = react_1.Children.toArray(children)
        .filter((child) => typeof child === 'string')
        .join('');
    const label = (0, utils_1.getFirstChildOfType)(children, exports.StackHeaderLabel);
    const iconComponent = (0, utils_1.getFirstChildOfType)(children, exports.StackHeaderIcon);
    const icon = (() => {
        if (!iconComponent) {
            return undefined;
        }
        if ('src' in iconComponent.props) {
            console.warn('When Icon with src is used inside Stack.Header.Menu as a submenu, only sf prop is supported. This is a limitation of React Native Screens.');
            return undefined;
        }
        return {
            type: 'sfSymbol',
            name: iconComponent.props.sf,
        };
    })();
    const actions = react_1.Children.toArray(props.children).filter((child) => (0, utils_1.isChildOfType)(child, exports.StackHeaderMenuAction) || (0, utils_1.isChildOfType)(child, exports.StackHeaderMenu));
    return {
        ...rest,
        type: 'submenu',
        items: actions.map((action) => {
            if ((0, utils_1.isChildOfType)(action, exports.StackHeaderMenu)) {
                return convertStackHeaderSubmenuMenuPropsToRNHeaderItem(action.props);
            }
            return convertStackHeaderMenuActionPropsToRNHeaderItem(action.props);
        }),
        label: label?.props.children ?? stringChildren,
        icon,
    };
}
exports.StackHeaderMenuAction = primitives_1.MenuAction;
function convertStackHeaderMenuActionPropsToRNHeaderItem(props) {
    const { children, isOn, unstable_keepPresented, ...rest } = props;
    const stringChildren = react_1.Children.toArray(children)
        .filter((child) => typeof child === 'string')
        .join('');
    const label = (0, utils_1.getFirstChildOfType)(children, exports.StackHeaderLabel);
    const iconComponent = (0, utils_1.getFirstChildOfType)(children, exports.StackHeaderIcon);
    const icon = (() => {
        if (!iconComponent) {
            return undefined;
        }
        if ('src' in iconComponent.props) {
            console.warn('When Icon is used inside Stack.Header.Menu.Action, only sf prop is supported. This is a limitation of React Native Screens.');
            return undefined;
        }
        return {
            type: 'sfSymbol',
            name: iconComponent.props.sf,
        };
    })();
    return {
        ...rest,
        type: 'action',
        label: label?.props.children ?? stringChildren,
        icon,
        state: isOn ? 'on' : 'off',
        keepsMenuPresented: unstable_keepPresented,
        onPress: props.onPress ?? (() => { }),
    };
}
//# sourceMappingURL=common.js.map