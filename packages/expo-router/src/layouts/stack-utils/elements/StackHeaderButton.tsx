import type { NativeStackHeaderItemButton } from '@react-navigation/native-stack';
import type { ReactNode } from 'react';
import React from 'react';
import { StyleSheet, type ColorValue, type StyleProp, type TextStyle } from 'react-native';

import { StackHeaderIcon, StackHeaderLabel } from './common';
import { getFirstChildOfType } from '../utils';

type NumericFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface StackHeaderButtonProps {
  /**
   * Supports two approaches:
   * 1. <Stack.Header.Button>Text</Stack.Header.Button> - children as text
   * 2. children as components:<Stack.Header.Button>
   * <Icon sf="icon-name" />
   * <Label>Button Text</Label>
   * <Badge>3</Badge>
   * </Stack.Header.Button>
   */
  children?: ReactNode;
  style?: StyleProp<
    Pick<TextStyle, 'fontFamily' | 'fontSize' | 'color' | 'width'> & {
      /**
       * When set to 'transparent', the button will have no background color.
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
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  tintColor?: ColorValue;
  /**
   * @default 'plain'
   */
  variant?: 'plain' | 'done' | 'prominent';
}

export function StackHeaderButton(props: StackHeaderButtonProps) {
  return null;
}

export function convertStackHeaderButtonPropsToRNHeaderItem(
  props: StackHeaderButtonProps
): NativeStackHeaderItemButton {
  const { children, style: _style, ...rest } = props;
  const stringChildren = React.Children.toArray(children)
    .filter((child) => typeof child === 'string')
    .join('');
  const label = getFirstChildOfType(children, StackHeaderLabel);
  const iconComponent = getFirstChildOfType(children, StackHeaderIcon);
  const icon: NativeStackHeaderItemButton['icon'] = (() => {
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
  return {
    ...rest,
    type: 'button',
    label: label?.props.children ?? stringChildren,
    onPress: props.onPress ?? (() => {}),
    selected: !!props.selected,
    labelStyle: style
      ? {
          ...style,
          fontWeight:
            typeof style.fontWeight === 'number'
              ? (String(style.fontWeight) as `${NumericFontWeight}`)
              : style.fontWeight,
        }
      : undefined,
    icon,
  };
}
