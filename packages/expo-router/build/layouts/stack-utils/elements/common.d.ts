import type { NativeStackHeaderItemMenu, NativeStackHeaderItemMenuAction } from '@react-navigation/native-stack';
import { type ReactNode } from 'react';
import { type ColorValue, type ImageSourcePropType, type StyleProp, type TextStyle } from 'react-native';
import type { SFSymbol } from 'sf-symbols-typescript';
export interface StackHeaderLabelProps {
    /**
     * The text to display as the label for the tab.
     */
    children?: string;
}
export declare const StackHeaderLabel: React.FC<StackHeaderLabelProps>;
export type StackHeaderIconProps = {
    src: ImageSourcePropType;
} | {
    sf: SFSymbol;
};
export declare const StackHeaderIcon: React.FC<StackHeaderIconProps>;
export interface StackHeaderBadgeProps {
    /**
     * The text to display as the badge
     */
    children?: string;
    style?: StyleProp<Pick<TextStyle, 'fontFamily' | 'fontSize' | 'color' | 'fontWeight' | 'backgroundColor'>>;
}
export declare const StackHeaderBadge: React.FC<StackHeaderBadgeProps>;
type NumericFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export interface StackHeaderMenuProps {
    /**
     * Can be an Icon, Label, Badge and Menu
     */
    children?: ReactNode;
    style?: StyleProp<Pick<TextStyle, 'fontFamily' | 'fontSize' | 'color' | 'width'> & {
        /**
         * When set to 'transparent', the menu button will have no background color.
         *
         * @platform iOS 26+
         */
        backgroundColor?: 'transparent';
        fontWeight?: NumericFontWeight | `${NumericFontWeight}`;
    }>;
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
    changesSelectionAsPrimaryAction?: boolean;
    /**
     * Optional title to show on top of the menu.
     */
    title?: string;
}
export declare const StackHeaderMenu: React.FC<StackHeaderMenuProps>;
export declare function convertStackHeaderMenuPropsToRNHeaderItem(props: StackHeaderMenuProps): NativeStackHeaderItemMenu;
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
export declare const StackHeaderMenuAction: React.FC<StackHeaderMenuActionProps>;
export declare function convertStackHeaderMenuActionPropsToRNHeaderItem(props: StackHeaderMenuActionProps): NativeStackHeaderItemMenuAction;
export {};
//# sourceMappingURL=common.d.ts.map