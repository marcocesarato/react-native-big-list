import React, { PureComponent } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollViewProps,
} from "react-native";

interface BigListProps extends ScrollViewProps {
  actionSheetScrollRef?: any;
  contentInset?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  data?: unknown[];
  footerHeight?: string | number | (() => number);
  headerHeight?: string | number | (() => number);
  insetBottom?: number;
  insetTop?: number;
  itemHeight?: string | number | (() => number);
  keyboardDismissMode?: string;
  keyboardShouldPersistTaps?: string;
  onLayout?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  onScrollEnd?(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  removeClippedSubviews?: boolean;
  renderAccessory?(): React.ReactNode;
  renderActionSheetScrollViewWrapper?(
    element: React.ReactElement,
  ): React.ReactNode;
  renderEmpty?(): React.ReactNode;
  renderFooter?(): React.ReactNode;
  renderHeader?(): React.ReactNode;
  renderItem(item: object): React.ReactNode;
  renderSection?(section: number): React.ReactNode;
  renderSectionFooter?(section: number): React.ReactNode;
  scrollEventThrottle?: number;
  scrollTopValue?: number;
  sectionFooterHeight?: string | number | (() => number);
  sectionHeight?: string | number | (() => number);
  sections?: unknown[][];
  children?: null;
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
