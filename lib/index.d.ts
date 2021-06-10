import React, { PureComponent } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
  LayoutChangeEvent,
  ListRenderItem,
  ViewStyle,
} from "react-native";

interface BigListProps<ItemT> extends ScrollViewProps {
  actionSheetScrollRef?: unknown;
  contentInset?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  data?: ItemT[];
  footerHeight?: string | number | (() => number);
  getItemLayout?: () => number;
  headerHeight?: string | number | (() => number);
  insetBottom?: number;
  insetTop?: number;
  itemHeight?:
    | string
    | number
    | ((item: { index: number; section?: number }) => number);
  keyboardDismissMode?: "none" | "interactive" | "on-drag";
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";
  ListEmptyComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ListFooterComponentStyle?: ViewStyle | ViewStyle[];
  ListHeaderComponent?: React.ReactNode;
  ListHeaderComponentStyle?: ViewStyle | ViewStyle[];
  onLayout?: (event: LayoutChangeEvent) => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  removeClippedSubviews?: boolean;
  renderAccessory?: (list: React.ReactNode) => React.ReactNode;
  renderActionSheetScrollViewWrapper?: (
    element: React.ReactNode,
  ) => React.ReactNode;
  renderEmpty?: () => React.ReactNode | null | undefined;
  renderFooter?: () => React.ReactNode | null | undefined;
  renderHeader?: () => React.ReactNode | null | undefined;
  renderItem: ListRenderItem<ItemT> | null | undefined;
  renderSectionHeader?: (section: number) => React.ReactNode | null | undefined;
  renderSectionFooter?: (section: number) => React.ReactNode | null | undefined;
  scrollEventThrottle?: number;
  scrollTopValue?: number;
  sectionFooterHeight?: string | number | ((section: number) => number);
  sectionHeaderHeight?: string | number | ((section: number) => number);
  sections?: ItemT[][];
  stickySectionHeadersEnabled: boolean;
  children?: null | undefined;
}
export default class BigList<ItemT = any> extends PureComponent<
  BigListProps<ItemT>
> {}

type BigListItemProps = {
  children?: React.ReactNode[] | React.ReactNode;
  height?: number;
};

export class BigListItem extends PureComponent<BigListItemProps> {}

type BigListSectionProps = {
  children?: React.ReactNode[] | React.ReactNode;
  height?: number;
  nextSectionPosition?: number;
  position?: number;
  scrollTopValue: string | number | Animated.Value;
};

export class BigListSection extends PureComponent<BigListSectionProps> {}
