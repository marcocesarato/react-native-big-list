/* eslint-disable no-undef */
import React, { PureComponent } from "react";
import {
  Animated,
  FlatListProps,
  ListRenderItemInfo,
  ListViewProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
  ViewStyle,
} from "react-native";

export type BigListRenderItemInfo<ItemT> = ListRenderItemInfo<ItemT> & {
  section?: number;
  key?: string;
  style?: ViewStyle | ViewStyle[];
};

export type BigListRenderItem<ItemT> = (
  info: BigListRenderItemInfo<ItemT>,
) => React.ReactElement | null;

interface BigListProps<ItemT>
  extends ScrollViewProps,
    Pick<
      FlatListProps<ItemT>,
      | "ListEmptyComponent"
      | "ListFooterComponent"
      | "ListFooterComponentStyle"
      | "ListHeaderComponent"
      | "ListHeaderComponentStyle"
      | "getItemLayout"
      | "numColumns"
      | "keyExtractor"
      | "onEndReached"
      | "onEndReachedThreshold"
      | "onRefresh"
      | "onViewableItemsChanged"
      | "columnWrapperStyle"
      | "refreshing"
      | "initialScrollIndex"
      | "removeClippedSubviews"
    >,
    Pick<
      ListViewProps,
      "renderFooter" | "renderHeader" | "stickySectionHeadersEnabled"
    > {
  inverted?: boolean | null | undefined;
  actionSheetScrollRef?: any | null | undefined;
  batchSizeThreshold?: number | null | undefined;
  data?: ItemT[];
  placeholder?: boolean;
  placeholderImage?: any;
  placeholderComponent?: React.ReactNode;
  footerHeight?: string | number | (() => number);
  headerHeight?: string | number | (() => number);
  hideMarginalsOnEmpty?: boolean | null | undefined;
  hideHeaderOnEmpty?: boolean | null | undefined;
  hideFooterOnEmpty?: boolean | null | undefined;
  insetBottom?: number;
  insetTop?: number;
  itemHeight:
    | string
    | number
    | ((section: number) => number)
    | ((section: number, index: number) => number);
  onScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  renderAccessory?: (list: React.ReactNode) => React.ReactNode;
  renderScrollViewWrapper?: (element: React.ReactNode) => React.ReactNode;
  renderEmpty?: () => React.ReactNode | null | undefined;
  renderItem: BigListRenderItem<ItemT> | null | undefined;
  controlItemRender?: boolean;
  renderSectionHeader?: (section: number) => React.ReactNode | null | undefined;
  renderSectionFooter?: (section: number) => React.ReactNode | null | undefined;
  sectionFooterHeight?: string | number | ((section: number) => number);
  sectionHeaderHeight?: string | number | ((section: number) => number);
  sections?: ItemT[][] | null | undefined;
  stickySectionHeadersEnabled?: boolean;
  children?: null | undefined;
  ScrollViewComponent?: React.ComponentType<ScrollViewProps> | React.Component<ScrollViewProps>;
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
