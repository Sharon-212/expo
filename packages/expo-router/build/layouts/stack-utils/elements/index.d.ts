import { StackHeaderBackButton } from './StackHeaderBackButton';
import { StackHeaderButton } from './StackHeaderButton';
import { StackHeaderComponent } from './StackHeaderComponent';
import { StackHeaderItem } from './StackHeaderItem';
import { StackHeaderLeft, StackHeaderRight } from './StackHeaderLeftRight';
import { StackHeaderSearchBar } from './StackHeaderSearchBar';
import { StackHeaderTitle } from './StackHeaderTitle';
export declare const StackHeader: typeof StackHeaderComponent & {
    Left: typeof StackHeaderLeft;
    Right: typeof StackHeaderRight;
    BackButton: typeof StackHeaderBackButton;
    Title: typeof StackHeaderTitle;
    SearchBar: typeof StackHeaderSearchBar;
    Button: typeof StackHeaderButton;
    Badge: import("react").FC<import("./common").StackHeaderBadgeProps>;
    Label: import("react").FC<import("./common").StackHeaderLabelProps>;
    Icon: import("react").FC<import("./common").StackHeaderIconProps>;
    Menu: import("react").FC<import("./common").StackHeaderMenuProps>;
    MenuAction: import("react").FC<import("./common").StackHeaderMenuActionProps>;
    Item: typeof StackHeaderItem;
};
export { StackHeaderBackButton, StackHeaderComponent, StackHeaderLeft, StackHeaderRight, StackHeaderSearchBar, StackHeaderTitle, };
export { StackScreen, appendScreenStackPropsToOptions } from './StackScreen';
//# sourceMappingURL=index.d.ts.map