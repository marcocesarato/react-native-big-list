import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Animated, Platform, ScrollView, View } from "react-native";

import BigListItem, { BigListItemType } from "./BigListItem";
import BigListProcessor from "./BigListProcessor";
import BigListSection from "./BigListSection";
import { autobind, createElement, processBlock } from "./utils";

class BigList extends PureComponent {
  /**
   * Constructor.
   * @param props
   */
  constructor(props) {
    super(props);
    autobind(this);
    // Initialize properties and state
    this.containerHeight = 0;
    this.scrollTop = 0;
    this.scrollTopValue = this.props.scrollTopValue || new Animated.Value(0);
    this.scrollView = React.createRef();
    this.state = this.getListState();
  }

  /**
   * Get list state.
   * @param data
   * @param headerHeight
   * @param footerHeight
   * @param sectionHeight
   * @param itemHeight
   * @param getItemLayout
   * @param sectionFooterHeight
   * @param sections
   * @param insetTop
   * @param insetBottom
   * @param batchSize
   * @param blockStart
   * @param blockEnd
   * @param prevItems
   * @returns {{blockStart: *, batchSize: *, blockEnd: *, items: [], height: *}|{blockStart, batchSize, blockEnd, items: [], height: *}}
   */
  static getListState(
    {
      data,
      headerHeight,
      footerHeight,
      sectionHeight,
      itemHeight,
      getItemLayout,
      sectionFooterHeight,
      sections,
      insetTop,
      insetBottom,
    },
    { batchSize, blockStart, blockEnd, items: prevItems },
  ) {
    if (batchSize === 0) {
      return {
        batchSize,
        blockStart,
        blockEnd,
        height: insetTop + insetBottom,
        items: [],
      };
    }
    const self = BigList;
    const layoutItemHeight = self.getItemHeight(itemHeight, getItemLayout);
    const sectionLengths = self.getSectionLengths(sections, data);
    const processor = new BigListProcessor({
      sections: sectionLengths,
      itemHeight: layoutItemHeight,
      headerHeight,
      footerHeight,
      sectionHeight,
      sectionFooterHeight,
      insetTop,
      insetBottom,
    });
    return {
      ...{
        batchSize,
        blockStart,
        blockEnd,
      },
      ...processor.process(
        blockStart - batchSize,
        blockEnd + batchSize,
        prevItems || [],
      ),
    };
  }

  /**
   * Get list state
   * @param {object} props
   * @param {object} options.
   * @return {{blockStart: *, batchSize: *, blockEnd: *, items: *[], height: *}|{blockStart, batchSize, blockEnd, items: *[], height: *}}
   */
  getListState(props, options) {
    return this.constructor.getListState(
      props || this.props,
      options || processBlock(this.containerHeight, this.scrollTop),
    );
  }

  /**
   * Get sections item lengths.
   * @param {array} sections
   * @param {array} data
   * @returns {int[]}
   */
  static getSectionLengths(sections = null, data = null) {
    if (sections !== null) {
      return sections.map((section) => {
        return section.length;
      });
    }
    return [data?.length];
  }

  /**
   * Get sections item lengths.
   * @returns {int[]}
   */
  getSectionLengths() {
    const { sections, data } = this.props;
    return this.constructor.getSectionLengths(sections, data);
  }

  /**
   * Get item height.
   * @param itemHeight
   * @param getItemLayout
   * @return {null|*}
   */
  static getItemHeight(itemHeight, getItemLayout) {
    if (getItemLayout) {
      const itemLayout = getItemLayout([], 0);
      return itemLayout.length;
    }
    if (itemHeight) {
      return itemHeight;
    }
    return null;
  }

  /**
   * Get item height.
   * @return {null|*}
   */
  getItemHeight() {
    const { itemHeight, getItemLayout } = this.props;
    return this.constructor.getItemHeight(itemHeight, getItemLayout);
  }

  /**
   * Is item visible.
   * @param {int} indexOrSection
   * @param {int|null} row
   * @returns {boolean}
   */
  isVisible(indexOrSection, row = null) {
    let section = indexOrSection;
    if (!this.hasSections()) {
      row = section;
      section = 1;
    }
    const position =
      this.props.headerHeight +
      section * this.props.sectionHeight +
      row * this.props.itemHeight;
    return (
      position >= this.scrollTop &&
      position <= this.scrollTop + this.containerHeight
    );
  }

  /**
   * Get Scroll View reference.
   * @returns {ScrollView|null}
   */
  getScrollView() {
    return this.scrollView.current;
  }

  /**
   * Get list processor,
   * @returns {BigListProcessor}
   */
  getListProcessor() {
    const scrollView = this.getScrollView();
    if (scrollView != null) {
      const {
        headerHeight,
        footerHeight,
        sectionHeight,
        sectionFooterHeight,
        insetTop,
        insetBottom,
      } = this.props;
      const itemHeight = this.getItemHeight();
      const sectionLengths = this.getSectionLengths();
      return new BigListProcessor({
        sections: sectionLengths,
        headerHeight,
        footerHeight,
        sectionHeight,
        sectionFooterHeight,
        itemHeight,
        insetTop,
        insetBottom,
        scrollView,
      });
    }
    return null;
  }

  /**
   * Scroll to.
   * @param {int} section
   * @param {int} index
   * @param {bool} animated
   * @returns {bool}
   */
  scrollTo({ index, section = 0, animated = true }) {
    const processor = this.getListProcessor();
    if (processor != null && index != null && section != null) {
      return processor.scrollToPosition(section, index, animated);
    }
    return false;
  }

  /**
   * Alias of scrollTo
   * @see scrollTo
   * @param {object} options
   * @returns {bool}
   */
  scrollToIndex(options) {
    return this.scrollTo(options);
  }

  /**
   * Scroll to item.
   * @param {object} item
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToItem({ item, animated = false }) {
    let index;
    if (this.hasSections()) {
      const coords = JSON.stringify(
        this.map((a) => {
          return a[0] + "|" + a[1];
        }),
      );
      index = coords.indexOf(item[0] + "|" + item[1]) !== -1;
    } else {
      index = this.props.data.indexOf(item);
    }
    return this.scrollTo({ index, animated });
  }

  /**
   * Scroll to offset.
   * @param {number} offset
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToOffset({ offset, animated = false }) {
    if (this.scrollView.current != null) {
      this.scrollView.current.scrollTo({
        x: 0,
        y: offset,
        animated,
      });
      return true;
    }
    return false;
  }

  /**
   * Scroll to top.
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToTop({ animated = true }) {
    return this.scrollTo({ section: 0, index: 0, animated });
  }

  /**
   * Scroll to end.
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToEnd({ animated = true }) {
    const { data } = this.props;
    let section = 0;
    let index = 0;
    if (this.hasSections()) {
      const sectionLengths = this.getSectionLengths();
      section = sectionLengths[sectionLengths.length - 1];
    } else {
      index = data.length;
    }
    return this.scrollTo({ section, index, animated });
  }

  /**
   * Scroll to section.
   * @param {int} section
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToSection({ section, animated = true }) {
    return this.scrollTo({ index: 0, section, animated });
  }

  /**
   * Handle scroll.
   * @param event
   */
  onScroll(event) {
    const { nativeEvent } = event;
    const { contentInset } = this.props;
    this.containerHeight =
      nativeEvent.layoutMeasurement.height -
      (contentInset.top || 0) -
      (contentInset.bottom || 0);
    this.scrollTop = Math.min(
      Math.max(0, nativeEvent.contentOffset.y),
      nativeEvent.contentSize.height - this.containerHeight,
    );
    const nextState = processBlock(this.containerHeight, this.scrollTop);
    if (
      nextState.batchSize !== this.state.batchSize ||
      nextState.blockStart !== this.state.blockStart ||
      nextState.blockEnd !== this.state.blockEnd
    ) {
      this.setState(nextState);
    }
    const { onScroll } = this.props;
    if (onScroll != null) {
      onScroll(event);
    }
  }

  /**
   * Handle layout.
   * @param event
   */
  onLayout(event) {
    const { nativeEvent } = event;
    const { contentInset } = this.props;
    this.containerHeight =
      nativeEvent.layout.height -
      (contentInset.top || 0) -
      (contentInset.bottom || 0);
    const nextState = processBlock(this.containerHeight, this.scrollTop);
    if (
      nextState.batchSize !== this.state.batchSize ||
      nextState.blockStart !== this.state.blockStart ||
      nextState.blockEnd !== this.state.blockEnd
    ) {
      this.setState(nextState);
    }
    const { onLayout } = this.props;
    if (onLayout != null) {
      onLayout(event);
    }
  }

  /**
   * Handle scroll end.
   * @param event
   */
  onScrollEnd(event) {
    const { renderAccessory, onScrollEnd } = this.props;
    if (renderAccessory != null) {
      this.forceUpdate();
    }
    if (onScrollEnd) {
      onScrollEnd(event);
    }
  }

  /**
   * Is empty
   * @returns {boolean}
   */
  isEmpty() {
    const sectionLengths = this.getSectionLengths();
    const length = sectionLengths.reduce((total, rowLength) => {
      return total + rowLength;
    }, 0);
    return length === 0;
  }

  /**
   * Get derived state.
   * @param props
   * @param state
   * @returns {{blockStart: *, batchSize: *, blockEnd: *, items: *[], height: *}|{blockStart, batchSize, blockEnd, items: *[], height: *}}
   */
  static getDerivedStateFromProps(props, state) {
    return BigList.getListState(props, state);
  }

  /**
   * Has sections.
   * @returns {boolean}
   */
  hasSections() {
    return this.props.sections !== null;
  }

  /**
   * Get item data.
   * @param section
   * @param row
   * @returns {*}
   */
  getItem(section = 0, row) {
    if (this.hasSections()) {
      return this.props.sections[section][row];
    } else {
      return this.props.data[row];
    }
  }

  /**
   * Get items data.
   * @returns {*}
   */
  getItems() {
    return this.hasSections() ? this.props.sections : this.props.data;
  }

  /**
   * Render all list items.
   * @returns {[]|*}
   */
  renderItems() {
    const {
      ListEmptyComponent,
      ListFooterComponent,
      ListFooterComponentStyle,
      ListHeaderComponent,
      ListHeaderComponentStyle,
      renderHeader,
      renderFooter,
      renderSection,
      renderItem,
      renderSectionFooter,
      renderEmpty,
    } = this.props;
    const { items = [] } = this.state;
    if (this.isEmpty()) {
      if (ListEmptyComponent != null) {
        return createElement(ListHeaderComponent);
      }
      if (renderEmpty != null) {
        return renderEmpty();
      }
    }
    const sectionPositions = [];
    items.forEach(({ type, position }) => {
      if (type === BigListItemType.SECTION) {
        sectionPositions.push(position);
      }
    });
    const children = [];
    items.forEach(({ type, key, position, height, section, row }) => {
      let child;
      let style;
      switch (type) {
        case BigListItemType.HEADER:
          if (ListFooterComponent != null) {
            child = createElement(ListHeaderComponent);
            style = ListHeaderComponentStyle;
          } else {
            child = renderHeader();
          }
        // falls through
        case BigListItemType.FOOTER:
          if (type === BigListItemType.FOOTER) {
            if (ListFooterComponent != null) {
              child = createElement(ListFooterComponent);
              style = ListFooterComponentStyle;
            } else {
              child = renderFooter();
            }
          }
        // falls through
        case BigListItemType.ROW:
          if (type === BigListItemType.ROW) {
            const item = this.getItem(section, row);
            if (this.hasSections()) {
              child = renderItem({ item, section, index: row });
            } else {
              child = renderItem({ item, index: row });
            }
          }
        // falls through
        case BigListItemType.SECTION_FOOTER:
          if (type === BigListItemType.SECTION_FOOTER) {
            child = renderSectionFooter(section);
          }
        // falls through
        case BigListItemType.ITEM:
          if (child != null) {
            children.push(
              <BigListItem key={key} height={height} style={style}>
                {child}
              </BigListItem>,
            );
          }
          break;
        case BigListItemType.SPACER: {
          children.push(<BigListItem key={key} height={height} />);
          break;
        }
        case BigListItemType.SECTION:
          sectionPositions.shift();
          child = renderSection(section);
          if (child != null) {
            children.push(
              <BigListSection
                key={key}
                height={height}
                position={position}
                nextSectionPosition={sectionPositions[0]}
                scrollTopValue={this.scrollTopValue}
              >
                {child}
              </BigListSection>,
            );
          }
          break;
      }
    });
    return children;
  }

  /**
   * Component did mount.
   */
  componentDidMount() {
    if (this.scrollView.current != null) {
      if (Platform.OS !== "web") {
        // Disabled on web
        this.scrollTopValueAttachment = Animated.attachNativeEvent(
          this.scrollView.current,
          "onScroll",
          [{ nativeEvent: { contentOffset: { y: this.scrollTopValue } } }],
        );
      }
    }
  }

  /**
   * Component did update.
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.scrollTopValue !== this.props.scrollTopValue) {
      throw new Error("scrollTopValue cannot changed after mounting");
    }
  }

  /**
   * Component will unmount.
   */
  componentWillUnmount() {
    if (this.scrollTopValueAttachment != null) {
      this.scrollTopValueAttachment.detach();
    }
  }

  /**
   * Render.
   * @returns {JSX.Element}
   */
  render() {
    // Reduce list properties
    const {
      data,
      sections,
      scrollTopValue,
      renderHeader,
      renderFooter,
      renderSection,
      renderItem,
      renderSectionFooter,
      renderActionSheetScrollViewWrapper,
      renderEmpty,
      renderAccessory,
      itemHeight,
      footerHeight,
      headerHeight,
      sectionHeight,
      sectionFooterHeight,
      insetTop,
      insetBottom,
      actionSheetScrollRef,
      ...props
    } = this.props;

    const wrapper = renderActionSheetScrollViewWrapper || ((val) => val);
    const scrollViewProps = {
      ...props,
      ...{
        ref: (ref) => {
          this.scrollView.current = ref;
          if (actionSheetScrollRef) {
            actionSheetScrollRef.current = ref;
          }
        },
        onScroll: this.onScroll,
        onLayout: this.onLayout,
        onMomentumScrollEnd: this.onScrollEnd,
        onScrollEndDrag: this.onScrollEnd,
      },
    };
    const scrollView = wrapper(
      <ScrollView {...scrollViewProps}>{this.renderItems()}</ScrollView>,
    );
    return (
      <View
        style={{
          flex: 1,
          maxHeight: Platform.select({ web: "100vh", default: "100%" }),
        }}
      >
        {scrollView}
        {renderAccessory != null ? renderAccessory(this) : null}
      </View>
    );
  }
}

BigList.propTypes = {
  actionSheetScrollRef: PropTypes.any,
  bottom: PropTypes.number,
  contentInset: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  data: PropTypes.array,
  footerHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  getItemLayout: PropTypes.func,
  headerHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  insetBottom: PropTypes.number,
  insetTop: PropTypes.number,
  itemHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  keyboardDismissMode: PropTypes.string,
  keyboardShouldPersistTaps: PropTypes.string,
  ListEmptyComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]),
  ListFooterComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]),
  ListFooterComponentStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  ListHeaderComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]),
  ListHeaderComponentStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onLayout: PropTypes.func,
  onScroll: PropTypes.func,
  onScrollEnd: PropTypes.func,
  removeClippedSubviews: PropTypes.bool,
  renderAccessory: PropTypes.func,
  renderActionSheetScrollViewWrapper: PropTypes.func,
  renderEmpty: PropTypes.func,
  renderFooter: PropTypes.func,
  renderHeader: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  renderSection: PropTypes.func,
  renderSectionFooter: PropTypes.func,
  scrollEventThrottle: PropTypes.number,
  scrollTopValue: PropTypes.number,
  sectionFooterHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  sectionHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  sections: PropTypes.array,
};

BigList.defaultProps = {
  // Data
  data: [],
  sections: null,
  // Renders
  renderItem: () => null,
  renderHeader: () => null,
  renderFooter: () => null,
  renderSection: () => null,
  renderSectionFooter: () => null,
  // Height
  itemHeight: 50,
  headerHeight: 0,
  footerHeight: 0,
  sectionHeight: 0,
  sectionFooterHeight: 0,
  // Scroll
  removeClippedSubviews: false,
  scrollEventThrottle: 16,
  // Keyboard
  keyboardShouldPersistTaps: "always",
  keyboardDismissMode: "interactive",
  // Insets
  insetTop: 0,
  insetBottom: 0,
  contentInset: { top: 0, right: 0, left: 0, bottom: 0 },
};

export default BigList;
