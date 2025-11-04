import type { NativeStackHeaderItemButton } from '@react-navigation/native-stack';
import type { ReactNode } from 'react';
import { type ColorValue, type StyleProp, type TextStyle } from 'react-native';
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
    style?: StyleProp<Pick<TextStyle, 'fontFamily' | 'fontSize' | 'color' | 'width'> & {
        /**
         * When set to 'transparent', the button will have no background color.
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
    onPress?: () => void;
    selected?: boolean;
    disabled?: boolean;
    tintColor?: ColorValue;
    /**
     * @default 'plain'
     */
    variant?: 'plain' | 'done' | 'prominent';
}
export declare function StackHeaderButton(props: StackHeaderButtonProps): null;
export declare function convertStackHeaderButtonPropsToRNHeaderItem(props: StackHeaderButtonProps): NativeStackHeaderItemButton;
export {};
//# sourceMappingURL=StackHeaderButton.d.ts.map