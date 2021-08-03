import React, { PureComponent } from "react";
import {
  Animated,
  LayoutChangeEvent,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
  ViewStyle,
} from "react-native";

interface BigListProps<ItemT> extends ScrollViewProps {
  inverted: bool | null | undefined;
  actionSheetScrollRef?: any | null | undefined;
  batchSizeThreshold?: number | null | undefined;
  contentInset?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  data?: ItemT[];
  placeholder?: boolean;
  placeholderImage?: any;
  placeholderComponent?: React.ReactNode;
  footerHeight?: string | number | (() => number);
  getItemLayout?: () => number;
  headerHeight?: string | number | (() => number);
  hideMarginalsOnEmpty?: boolean | null | undefined;
  hideHeaderOnEmpty?: boolean | null | undefined;
  hideFooterOnEmpty?: boolean | null | undefined;
  insetBottom?: number;
  insetTop?: number;
  itemHeight?:
    | string
    | number
    | ((item: { index: number; section?: number }) => number);
  keyboardDismissMode?: "none" | "interactive" | "on-drag";
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";
  keyExtractor?: (item: ItemT, index: number) => string | null | undefined;
  ListEmptyComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ListFooterComponentStyle?: ViewStyle | ViewStyle[];
  ListHeaderComponent?: React.ReactNode;
  ListHeaderComponentStyle?: ViewStyle | ViewStyle[];
  numColumns?: number | null | undefined;
  columnWrapperStyle?: ViewStyle | ViewStyle[];
  onEndReached?:
    | ((info: { distanceFromEnd: number }) => void)
    | null
    | undefined;
  onEndReachedThreshold?: number | null | undefined;
  onLayout?: (event: LayoutChangeEvent) => void;
  onRefresh?: () => void | null | undefined;
  onViewableItemsChanged?: () => any;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  removeClippedSubviews?: boolean;
  renderAccessory?: (list: React.ReactNode) => React.ReactNode;
  renderScrollViewWrapper?: (element: React.ReactNode) => React.ReactNode;
  renderEmpty?: () => React.ReactNode | null | undefined;
  renderFooter?: () => React.ReactNode | null | undefined;
  renderHeader?: () => React.ReactNode | null | undefined;
  renderItem: ListRenderItem<ItemT> | null | undefined;
  renderSectionHeader?: (section: number) => React.ReactNode | null | undefined;
  renderSectionFooter?: (section: number) => React.ReactNode | null | undefined;
  refreshing?: boolean | null | undefined;
  scrollEventThrottle?: number;
  initialScrollIndex?: number;
  sectionFooterHeight?: string | number | ((section: number) => number);
  sectionHeaderHeight?: string | number | ((section: number) => number);
  sections?: ItemT[][] | null | undefined;
  stickySectionHeadersEnabled: boolean;
  children?: null | undefined;
}
export default class BigList<ItemT = any> extends PureComponent<
  BigListProps<ItemT>
> {}

type BigListItemProps = {
  children?: React.ReactNode[] | React.ReactNode;
  height?: number | string;
  width?: number | string;
  style?: ViewStyle | ViewStyle[];
};

export class BigListItem extends PureComponent<BigListItemProps> {}

type BigListSectionProps = {
  children?: React.ReactNode[] | React.ReactNode;
  height?: number;
  nextSectionPosition?: number;
  position?: number;
  initialScrollIndex: string | number | Animated.Value;
};

export class BigListSection extends PureComponent<BigListSectionProps> {}
