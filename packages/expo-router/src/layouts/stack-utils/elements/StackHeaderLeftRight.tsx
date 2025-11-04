import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

import type { StackHeaderLeftProps, StackHeaderRightProps } from '../types';
import { isChildOfType } from '../utils';
import {
  convertStackHeaderButtonPropsToRNHeaderItem,
  StackHeaderButton,
} from './StackHeaderButton';
import { convertStackHeaderItemPropsToRNHeaderItem, StackHeaderItem } from './StackHeaderItem';
import {
  convertStackHeaderSpacingPropsToRNHeaderItem,
  StackHeaderSpacing,
} from './StackHeaderSpacing';
import { convertStackHeaderMenuPropsToRNHeaderItem, StackHeaderMenu } from './common';

export function StackHeaderLeft(props: StackHeaderLeftProps) {
  return null;
}

export function StackHeaderRight(props: StackHeaderRightProps) {
  return null;
}

function convertHeaderRightLeftChildrenToUnstableItems(
  children: React.ReactNode,
  side: 'Left' | 'Right'
):
  | NativeStackNavigationOptions['unstable_headerRightItems']
  | NativeStackNavigationOptions['unstable_headerLeftItems'] {
  const allChildren = React.Children.toArray(children);
  const actions = allChildren.filter(
    (child) =>
      isChildOfType(child, StackHeaderButton) ||
      isChildOfType(child, StackHeaderMenu) ||
      isChildOfType(child, StackHeaderSpacing) ||
      isChildOfType(child, StackHeaderItem)
  );
  if (actions.length !== allChildren.length) {
    console.warn(
      `Stack.Header.${side} only accepts <Stack.Header.Button>, <Stack.Header.Menu>, <Menu>, and <Stack.Header.Item> as children.`
    );
  }
  return () =>
    actions.map((action) => {
      if (isChildOfType(action, StackHeaderButton)) {
        return convertStackHeaderButtonPropsToRNHeaderItem(action.props);
      } else if (isChildOfType(action, StackHeaderMenu)) {
        return convertStackHeaderMenuPropsToRNHeaderItem(action.props);
      } else if (isChildOfType(action, StackHeaderSpacing)) {
        return convertStackHeaderSpacingPropsToRNHeaderItem(action.props);
      }
      return convertStackHeaderItemPropsToRNHeaderItem(action.props);
    });
}

export function appendStackHeaderRightPropsToOptions(
  options: NativeStackNavigationOptions,
  props: StackHeaderRightProps
): NativeStackNavigationOptions {
  if (props.asChild) {
    return {
      ...options,
      headerRight: () => props.children,
    };
  }

  return {
    ...options,
    unstable_headerRightItems: convertHeaderRightLeftChildrenToUnstableItems(
      props.children,
      'Right'
    ),
  };
}

export function appendStackHeaderLeftPropsToOptions(
  options: NativeStackNavigationOptions,
  props: StackHeaderLeftProps
): NativeStackNavigationOptions {
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
