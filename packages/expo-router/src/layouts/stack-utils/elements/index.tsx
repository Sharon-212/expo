import { StackHeaderBackButton } from './StackHeaderBackButton';
import { StackHeaderButton } from './StackHeaderButton';
import { StackHeaderComponent } from './StackHeaderComponent';
import { StackHeaderItem } from './StackHeaderItem';
import { StackHeaderLeft, StackHeaderRight } from './StackHeaderLeftRight';
import { StackHeaderSearchBar } from './StackHeaderSearchBar';
import { StackHeaderTitle } from './StackHeaderTitle';
import {
  StackHeaderBadge,
  StackHeaderIcon,
  StackHeaderLabel,
  StackHeaderMenu,
  StackHeaderMenuAction,
} from './common';

export const StackHeader = Object.assign(StackHeaderComponent, {
  Left: StackHeaderLeft,
  Right: StackHeaderRight,
  BackButton: StackHeaderBackButton,
  Title: StackHeaderTitle,
  SearchBar: StackHeaderSearchBar,
  Button: StackHeaderButton,
  Badge: StackHeaderBadge,
  Label: StackHeaderLabel,
  Icon: StackHeaderIcon,
  Menu: StackHeaderMenu,
  MenuAction: StackHeaderMenuAction,
  Item: StackHeaderItem,
});

export {
  StackHeaderBackButton,
  StackHeaderComponent,
  StackHeaderLeft,
  StackHeaderRight,
  StackHeaderSearchBar,
  StackHeaderTitle,
};
export { StackScreen, appendScreenStackPropsToOptions } from './StackScreen';
