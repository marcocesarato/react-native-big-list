import React, { PureComponent } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
} from "react-native";

interface BigListProps extends ScrollViewProps {
  actionSheetScrollRef?: unknown;
  contentInset?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  data?: unknown[];
  footerHeight?: string | number | (() => number);
  getItemLayout?: () => number;
  headerHeight?: string | number | (() => number);
  insetBottom?: number;
  insetTop?: number;
  itemHeight?:
    | string
    | number
    | ((item: { index: number; section?: number }) => number);
  keyboardDismissMode?: string;
  keyboardShouldPersistTaps?: string;
  ListEmptyComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ListFooterComponentStyle?: object | unknown[];
  ListHeaderComponent?: React.ReactNode;
  ListHeaderComponentStyle?: object | unknown[];
  onLayout?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  removeClippedSubviews?: boolean;
  renderAccessory?: (list: BigList) => React.ReactNode;
  renderActionSheetScrollViewWrapper?: (
    element: React.ReactNode,
  ) => React.ReactNode;
  renderEmpty?: () => React.ReactNode | null | undefined;
  renderFooter?: () => React.ReactNode | null | undefined;
  renderHeader?: () => React.ReactNode | null | undefined;
  renderItem: (item: object) => React.ReactNode | null | undefined;
  renderSection?: (section: number) => React.ReactNode | null | undefined;
  renderSectionFooter?: (section: number) => React.ReactNode | null | undefined;
  scrollEventThrottle?: number;
  scrollTopValue?: number;
  sectionFooterHeight?: string | number | ((section: number) => number);
  sectionHeight?: string | number | ((section: number) => number);
  sections?: unknown[][];
  children?: null | undefined;
}
export default class BigList extends PureComponent<BigListProps> {}

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
