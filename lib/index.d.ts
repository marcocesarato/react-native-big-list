import React, { PureComponent } from "react";
import {
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

interface Props extends ScrollViewProps {
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
}
export default class BigList extends PureComponent<Props> {}
