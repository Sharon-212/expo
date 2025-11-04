import type {
  NativeStackHeaderItemMenu,
  NativeStackHeaderItemMenuAction,
  NativeStackHeaderItemMenuSubmenu,
} from '@react-navigation/native-stack';
import { Children, type ReactNode } from 'react';
import {
  StyleSheet,
  type ColorValue,
  type ImageSourcePropType,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import type { SFSymbol } from 'sf-symbols-typescript';

import { Badge, Icon, Label, Menu, MenuAction } from '../../../primitives';
import { getFirstChildOfType, isChildOfType } from '../utils';

export interface StackHeaderLabelProps {
  /**
   * The text to display as the label for the tab.
   */
  children?: string;
}

export const StackHeaderLabel: React.FC<StackHeaderLabelProps> = Label;

export type StackHeaderIconProps =
  | {
      // TODO: add support for vector icons
      src: ImageSourcePropType;
    }
  | {
      sf: SFSymbol;
    };

export const StackHeaderIcon: React.FC<StackHeaderIconProps> = Icon;

export interface StackHeaderBadgeProps {
  /**
   * The text to display as the badge
   */
  children?: string;

  style?: StyleProp<
    Pick<TextStyle, 'fontFamily' | 'fontSize' | 'color' | 'fontWeight' | 'backgroundColor'>
  >;
}

export const StackHeaderBadge: React.FC<StackHeaderBadgeProps> = Badge;

type NumericFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface StackHeaderMenuProps {
  /**
   * Can be an Icon, Label, Badge and Menu
   */
  children?: ReactNode;
  style?: StyleProp<
    Pick<TextStyle, 'fontFamily' | 'fontSize' | 'color' | 'width'> & {
      /**
       * When set to 'transparent', the menu button will have no background color.
       *
       * @platform iOS 26+
       */
      backgroundColor?: 'transparent';
      fontWeight?: NumericFontWeight | `${NumericFontWeight}`;
    }
  >;
  sharesBackground?: boolean;
  identifier?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  tintColor?: ColorValue;
  /**
   * @default 'plain'
   */
  variant?: 'plain' | 'done' | 'prominent';

  // TODO
  changesSelectionAsPrimaryAction?: boolean;
  /**
   * Optional title to show on top of the menu.
   */
  title?: string;
}

export const StackHeaderMenu: React.FC<StackHeaderMenuProps> = Menu;

export function convertStackHeaderMenuPropsToRNHeaderItem(
  props: StackHeaderMenuProps
): NativeStackHeaderItemMenu {
  const { children, title, style: _style, ...rest } = props;
  const stringChildren = Children.toArray(children)
    .filter((child) => typeof child === 'string')
    .join('');
  const label = getFirstChildOfType(children, StackHeaderLabel);
  const iconComponent = getFirstChildOfType(children, StackHeaderIcon);
  const icon: NativeStackHeaderItemMenu['icon'] = (() => {
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
  const style = StyleSheet.flatten(_style);
  const actions = Children.toArray(children).filter(
    (child) => isChildOfType(child, StackHeaderMenuAction) || isChildOfType(child, StackHeaderMenu)
  );
  const labelStyle = StyleSheet.flatten(
    style
      ? {
          ...style,
          fontWeight:
            typeof style.fontWeight === 'number'
              ? (String(style.fontWeight) as `${NumericFontWeight}`)
              : style.fontWeight,
        }
      : undefined
  );

  return {
    ...rest,
    type: 'menu',
    menu: {
      title,
      items: actions.map((action) => {
        if (isChildOfType(action, StackHeaderMenu)) {
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

function convertStackHeaderSubmenuMenuPropsToRNHeaderItem(
  props: StackHeaderMenuProps
): NativeStackHeaderItemMenuSubmenu {
  const { children, title, ...rest } = props;
  const stringChildren = Children.toArray(children)
    .filter((child) => typeof child === 'string')
    .join('');
  const label = getFirstChildOfType(children, StackHeaderLabel);
  const iconComponent = getFirstChildOfType(children, StackHeaderIcon);
  const icon: NativeStackHeaderItemMenu['icon'] = (() => {
    if (!iconComponent) {
      return undefined;
    }
    if ('src' in iconComponent.props) {
      console.warn(
        'When Icon with src is used inside Stack.Header.Menu as a submenu, only sf prop is supported. This is a limitation of React Native Screens.'
      );
      return undefined;
    }
    return {
      type: 'sfSymbol',
      name: iconComponent.props.sf,
    };
  })();
  const actions = Children.toArray(props.children).filter(
    (child) => isChildOfType(child, StackHeaderMenuAction) || isChildOfType(child, StackHeaderMenu)
  );

  return {
    ...rest,
    type: 'submenu',
    items: actions.map((action) => {
      if (isChildOfType(action, StackHeaderMenu)) {
        return convertStackHeaderSubmenuMenuPropsToRNHeaderItem(action.props);
      }
      return convertStackHeaderMenuActionPropsToRNHeaderItem(action.props);
    }),
    label: label?.props.children ?? stringChildren,
    icon,
  };
}

export interface StackHeaderMenuActionProps {
  /**
   * Can be an Icon or Label
   */
  children?: ReactNode;
  /**
   * If `true`, the menu item will be disabled and not selectable.
   *
   * @see [Apple documentation](https://developer.apple.com/documentation/uikit/uimenuelement/attributes/disabled) for more information.
   */
  disabled?: boolean;
  /**
   * If `true`, the menu item will be displayed as destructive.
   *
   * @see [Apple documentation](https://developer.apple.com/documentation/uikit/uimenuelement/attributes/destructive) for more information.
   */
  destructive?: boolean;
  /**
   * If `true`, the menu will be kept presented after the action is selected.
   *
   * This is marked as unstable, because when action is selected it will recreate the menu,
   * which will close all opened submenus and reset the scroll position.
   *
   * @see [Apple documentation](https://developer.apple.com/documentation/uikit/uimenuelement/attributes/keepsmenupresented) for more information.
   */
  unstable_keepPresented?: boolean;
  /**
   * If `true`, the menu item will be displayed as selected.
   */
  isOn?: boolean;
  onPress?: () => void;
  /**
   * An elaborated title that explains the purpose of the action.
   */
  discoverabilityLabel?: string;
  hidden?: boolean;
}

export const StackHeaderMenuAction: React.FC<StackHeaderMenuActionProps> = MenuAction;

export function convertStackHeaderMenuActionPropsToRNHeaderItem(
  props: StackHeaderMenuActionProps
): NativeStackHeaderItemMenuAction {
  const { children, isOn, unstable_keepPresented, ...rest } = props;
  const stringChildren = Children.toArray(children)
    .filter((child) => typeof child === 'string')
    .join('');
  const label = getFirstChildOfType(children, StackHeaderLabel);
  const iconComponent = getFirstChildOfType(children, StackHeaderIcon);
  const icon: NativeStackHeaderItemMenuAction['icon'] = (() => {
    if (!iconComponent) {
      return undefined;
    }
    if ('src' in iconComponent.props) {
      console.warn(
        'When Icon is used inside Stack.Header.Menu.Action, only sf prop is supported. This is a limitation of React Native Screens.'
      );
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
    onPress: props.onPress ?? (() => {}),
  };
}
