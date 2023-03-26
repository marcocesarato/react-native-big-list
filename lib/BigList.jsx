import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  Platform,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";

import BigListItem, { BigListItemType } from "./BigListItem";
import BigListPlaceholder from "./BigListPlaceholder";
import BigListProcessor from "./BigListProcessor";
import BigListSection from "./BigListSection";
import {
  autobind,
  createElement,
  isNumeric,
  mergeViewStyle,
  processBlock,
} from "./utils";

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
    this.scrollTopValue =
      this.props.initialScrollIndex || new Animated.Value(0);
    this.scrollView = React.createRef();
    this.state = this.getListState();
    this.viewableItems = [];
  }

  /**
   * Get list state.
   * @param {array} data
   * @param {array[]|object|null|undefined} sections
   * @param {array} prevItems
   * @param {number|null} batchSizeThreshold
   * @param {number|function|null|undefined} headerHeight
   * @param {number|function|null|undefined} footerHeight
   * @param {number|function|null|undefined} sectionHeaderHeight
   * @param {number|function|null|undefined} itemHeight
   * @param {number|function|null|undefined} sectionFooterHeight
   * @param {number|null|undefined} insetTop
   * @param {number|null|undefined} insetBottom
   * @param {number|null|undefined} numColumns
   * @param {number|null|undefined} batchSize
   * @param {number|null|undefined} blockStart
   * @param {number|null|undefined} blockEnd
   * @param {function|null|undefined} getItemLayout
   * @returns {{blockStart: *, batchSize: *, blockEnd: *, items: [], height: *}|{blockStart, batchSize, blockEnd, items: [], height: *}}
   */
  static getListState(
    {
      data,
      sections,
      batchSizeThreshold,
      headerHeight,
      footerHeight,
      sectionHeaderHeight,
      itemHeight,
      sectionFooterHeight,
      insetTop,
      insetBottom,
      numColumns,
      getItemLayout,
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
      sectionHeaderHeight,
      sectionFooterHeight,
      insetTop,
      insetBottom,
      numColumns,
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
    const stateProps = props || this.props;
    return this.constructor.getListState(
      stateProps,
      options ||
        processBlock({
          containerHeight: this.containerHeight,
          scrollTop: this.scrollTop,
          batchSizeThreshold: stateProps.batchSizeThreshold,
        }),
    );
  }

  /**
   * Get sections item lengths.
   * @param {array[]|object<string, object>|null|undefined} sections
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
   * @param {number} itemHeight
   * @param {function|null|undefined} getItemLayout
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
   * @param {int} index
   * @param {int} section
   * @returns {boolean}
   */
  isVisible({ index, section = 0 }) {
    const position = this.getItemOffset({ index, section });
    return (
      position >= this.scrollTop &&
      position <= this.scrollTop + this.containerHeight
    );
  }

  /**
   * Provides a reference to the underlying scroll component.
   * @returns {ScrollView|null}
   */
  getNativeScrollRef() {
    return this.scrollView.current;
  }

  /**
   * Get list processor,
   * @returns {BigListProcessor}
   */
  getListProcessor() {
    const scrollView = this.getNativeScrollRef();
    if (scrollView != null) {
      const {
        headerHeight,
        footerHeight,
        sectionHeaderHeight,
        sectionFooterHeight,
        insetTop,
        insetBottom,
        numColumns,
      } = this.props;
      const itemHeight = this.getItemHeight();
      const sectionLengths = this.getSectionLengths();
      return new BigListProcessor({
        sections: sectionLengths,
        headerHeight,
        footerHeight,
        sectionHeaderHeight,
        sectionFooterHeight,
        itemHeight,
        insetTop,
        insetBottom,
        scrollView,
        numColumns,
      });
    }
    return null;
  }

  /**
   * Displays the scroll indicators momentarily.
   */
  flashScrollIndicators() {
    const scrollView = this.getNativeScrollRef();
    if (scrollView != null) {
      scrollView.flashScrollIndicators();
    }
  }

  /**
   * Scrolls to a given x, y offset, either immediately, with a smooth animation.
   * @param {int} x
   * @param {int} y
   * @param {bool} animated
   */
  scrollTo({ x = 0, y = 0, animated = true } = {}) {
    const scrollView = this.getNativeScrollRef();
    if (scrollView != null) {
      scrollView.scrollTo({
        x: x,
        y: y,
        animated,
      });
    }
  }

  /**
   * Scroll to index.
   * @param {int} index
   * @param {int} section
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToIndex({ index, section = 0, animated = true }) {
    const processor = this.getListProcessor();
    if (processor != null && index != null && section != null) {
      return processor.scrollToPosition(section, index, animated);
    }
    return false;
  }

  /**
   * Alias to scrollToIndex with polyfill for SectionList.
   * @see scrollToIndex
   * @param {int} itemIndex
   * @param {int} sectionIndex
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToLocation({ itemIndex, sectionIndex, animated = true }) {
    return this.scrollToIndex({
      section: sectionIndex,
      index: itemIndex,
      animated,
    });
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
    return this.scrollToIndex({ index, animated });
  }

  /**
   * Scroll to offset.
   * @param {number} offset
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToOffset({ offset, animated = false }) {
    const scrollRef = this.getNativeScrollRef();
    if (scrollRef != null) {
      scrollRef.scrollTo({
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
  scrollToTop({ animated = true } = {}) {
    return this.scrollTo({ x: 0, y: 0, animated });
  }

  /**
   * Scroll to end.
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToEnd({ animated = true } = {}) {
    const { data } = this.props;
    let section = 0;
    let index = 0;
    if (this.hasSections()) {
      const sectionLengths = this.getSectionLengths();
      section = sectionLengths[sectionLengths.length - 1];
    } else {
      index = data.length;
    }
    return this.scrollToIndex({ section, index, animated });
  }

  /**
   * Scroll to section.
   * @param {int} section
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToSection({ section, animated = true }) {
    return this.scrollToIndex({ index: 0, section, animated });
  }

  /**
   * On viewable items changed.
   */
  onViewableItemsChanged() {
    const { onViewableItemsChanged } = this.props;
    if (onViewableItemsChanged) {
      const prevItems = this.viewableItems;
      const currentItems = this.state.items
        .map(({ type, section, index, key }) => {
          if (type === BigListItemType.ITEM) {
            return {
              item: this.getItem({ section, index }),
              section: section,
              key: key,
              index: (section + 1) * index,
              isViewable: this.isVisible({ section, index }),
            };
          }
          return false;
        })
        .filter(Boolean);
      this.viewableItems = currentItems.filter((item) => item.isViewable);
      const changed = prevItems
        .filter(
          ({ index: prevIndex }) =>
            !this.viewableItems.some(
              ({ index: nextIndex }) => nextIndex === prevIndex,
            ),
        )
        .map((item) => {
          item.isViewable = this.isVisible({
            section: item.section,
            index: item.index,
          });
          return item;
        });

      const prevViewableItem = prevItems.length;
      const currentViewableItem = this.viewableItems.length;

      if (changed.length > 0 || prevViewableItem !== currentViewableItem) {
        onViewableItemsChanged({ viewableItems: this.viewableItems, changed });
      }
    }
  }

  /**
   * Handle scroll.
   * @param event
   */
  onScroll(event) {
    const { nativeEvent } = event;
    const { contentInset, batchSizeThreshold, onViewableItemsChanged } =
      this.props;
    this.containerHeight =
      nativeEvent.layoutMeasurement.height -
      (contentInset.top || 0) -
      (contentInset.bottom || 0);
    this.scrollTop = Math.min(
      Math.max(0, nativeEvent.contentOffset.y),
      nativeEvent.contentSize.height - this.containerHeight,
    );

    const nextState = processBlock({
      containerHeight: this.containerHeight,
      scrollTop: this.scrollTop,
      batchSizeThreshold,
    });

    if (
      nextState.batchSize !== this.state.batchSize ||
      nextState.blockStart !== this.state.blockStart ||
      nextState.blockEnd !== this.state.blockEnd
    ) {
      this.setState(nextState);
    }

    if (onViewableItemsChanged) {
      this.onViewableItemsChanged();
    }

    const { onScroll, onEndReached, onEndReachedThreshold } = this.props;
    if (onScroll != null) {
      onScroll(event);
    }
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const distanceFromEnd =
      contentSize.height - (layoutMeasurement.height + contentOffset.y);
    if (distanceFromEnd <= layoutMeasurement.height * onEndReachedThreshold) {
      if (!this.endReached) {
        this.endReached = true;
        onEndReached && onEndReached({ distanceFromEnd });
      }
    } else {
      this.endReached = false;
    }
  }

  /**
   * Handle layout.
   * @param event
   */
  onLayout(event) {
    const { nativeEvent } = event;
    const { contentInset, batchSizeThreshold } = this.props;
    this.containerHeight =
      nativeEvent.layout.height -
      (contentInset.top || 0) -
      (contentInset.bottom || 0);
    const nextState = processBlock({
      containerHeight: this.containerHeight,
      scrollTop: this.scrollTop,
      batchSizeThreshold,
    });
    if (
      nextState.batchSize !== this.state.batchSize ||
      nextState.blockStart !== this.state.blockStart ||
      nextState.blockEnd !== this.state.blockEnd
    ) {
      this.setState(nextState);
    }
    const { onLayout } = this.props;
    if (onLayout) {
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
   * Handle scroll end.
   * @param event
   */
  onMomentumScrollEnd(event) {
    const { onMomentumScrollEnd } = this.props;
    this.onScrollEnd(event);
    if (onMomentumScrollEnd) {
      onMomentumScrollEnd(event);
    }
  }

  /**
   * Is empty
   * @returns {boolean}
   */
  isEmpty() {
    const sectionLengths = this.getSectionLengths();
    const length = sectionLengths.reduce((total, sectionLength) => {
      return total + sectionLength;
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
   * Get item scroll view offset.
   * @param {int} section
   * @param {int} index
   * @returns {*}
   */
  getItemOffset({ section = 0, index }) {
    const {
      insetTop,
      headerHeight,
      sectionHeaderHeight,
      sectionFooterHeight,
      numColumns,
      itemHeight,
    } = this.props;

    // Header + inset
    let offset =
      insetTop + isNumeric(headerHeight)
        ? Number(headerHeight)
        : headerHeight();

    const sections = this.getSectionLengths();
    let foundIndex = false;
    let s = 0;

    while (s <= section) {
      const rows = Math.ceil(sections[s] / numColumns);
      if (rows === 0) {
        s += 1;
        continue;
      }

      // Section header
      offset += isNumeric(sectionHeaderHeight)
        ? Number(sectionHeaderHeight)
        : sectionHeaderHeight(s);

      // Items
      if (isNumeric(itemHeight)) {
        const uniformHeight = this.getItemHeight(section);
        if (s === section) {
          offset += uniformHeight * Math.ceil(index / numColumns);
          foundIndex = true;
        } else {
          offset += uniformHeight * rows;
        }
      } else {
        for (let i = 0; i < rows; i++) {
          if (s < section || (s === section && i < index)) {
            offset += itemHeight(s, Math.ceil(i / numColumns));
          } else if (s === section && i === index) {
            foundIndex = true;
            break;
          }
        }
      }

      // Section footer
      if (!foundIndex) {
        offset += isNumeric(sectionFooterHeight)
          ? Number(sectionFooterHeight)
          : sectionFooterHeight(s);
      }
      s += 1;
    }

    return offset;
  }

  /**
   * Get item data.
   * @param {int} section
   * @param {int} index
   * @returns {*}
   */
  getItem({ index, section = 0 }) {
    if (this.hasSections()) {
      return this.props.sections[section][index];
    } else {
      return this.props.data[index];
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
      keyExtractor,
      numColumns,
      hideMarginalsOnEmpty,
      hideHeaderOnEmpty,
      hideFooterOnEmpty,
      columnWrapperStyle,
      controlItemRender,
      placeholder,
      placeholderComponent,
      placeholderImage,
      ListEmptyComponent,
      ListFooterComponent,
      ListFooterComponentStyle,
      ListHeaderComponent,
      ListHeaderComponentStyle,
      renderHeader,
      renderFooter,
      renderSectionHeader,
      renderItem,
      renderSectionFooter,
      renderEmpty,
    } = this.props;
    const { items = [] } = this.state;

    const itemStyle = this.getBaseStyle();
    const fullItemStyle = mergeViewStyle(itemStyle, {
      width: "100%",
    });

    // On empty list
    const isEmptyList = this.isEmpty();
    const emptyItem = ListEmptyComponent
      ? createElement(ListEmptyComponent, {style: fullItemStyle})
      : renderEmpty
      ? createElement(renderEmpty(), {style: fullItemStyle})
      : null;

    if (isEmptyList && emptyItem) {
      if (hideMarginalsOnEmpty || (hideHeaderOnEmpty && hideFooterOnEmpty)) {
        // Render empty
        return emptyItem;
      } else {
        // Add empty item
        const headerIndex = items.findIndex(
          (item) => item.type === BigListItemType.HEADER,
        );
        items.splice(headerIndex + 1, 0, {
          type: BigListItemType.EMPTY,
          key: 'empty',
        });
        if (hideHeaderOnEmpty) {
          // Hide header
          items.splice(headerIndex, 1);
        }
        if (hideFooterOnEmpty) {
          // Hide footer
          const footerIndex = items.findIndex(
            (item) => item.type === BigListItemType.FOOTER,
          );
          items.splice(footerIndex, 1);
        }
      }
    }

    // Sections positions
    const sectionPositions = [];
    items.forEach(({ type, position }) => {
      if (type === BigListItemType.SECTION_HEADER) {
        sectionPositions.push(position);
      }
    });

    // Render items
    const children = [];
    items.forEach(({ type, key, position, height, section, index }) => {
      const itemKey = key || position; // Fallback fix
      let uniqueKey = String((section + 1) * index);
      let child;
      let style;
      switch (type) {
        case BigListItemType.HEADER:
          if (ListHeaderComponent != null) {
            child = createElement(ListHeaderComponent);
            style = mergeViewStyle(fullItemStyle, ListHeaderComponentStyle);
          } else {
            child = renderHeader();
            style = fullItemStyle;
          }
        // falls through
        case BigListItemType.FOOTER:
          if (type === BigListItemType.FOOTER) {
            if (ListFooterComponent != null) {
              child = createElement(ListFooterComponent);
              style = mergeViewStyle(fullItemStyle, ListFooterComponentStyle);
            } else {
              child = renderFooter();
              style = fullItemStyle;
            }
          }
        // falls through
        case BigListItemType.SECTION_FOOTER:
          if (type === BigListItemType.SECTION_FOOTER) {
            height = isEmptyList ? 0 : height; // Hide section footer on empty
            child = renderSectionFooter(section);
            style = fullItemStyle;
          }
        // falls through
        case BigListItemType.ITEM:
          if (type === BigListItemType.ITEM) {
            const item = this.getItem({ section, index });
            uniqueKey = keyExtractor
              ? keyExtractor(item, uniqueKey)
              : uniqueKey;
            style =
              numColumns > 1
                ? mergeViewStyle(itemStyle, columnWrapperStyle || {})
                : itemStyle;

            const renderArguments = {
              item,
              index,
              section: undefined,
              key: undefined,
              style: undefined,
            };

            if (this.hasSections()) {
              renderArguments.section = section;
            }
            if (controlItemRender) {
              renderArguments.key = uniqueKey;
              renderArguments.style = mergeViewStyle(style, {
                height,
                width: 100 / numColumns + "%",
              });
            }
            child = renderItem(renderArguments);
          }
          if (child != null) {
            children.push(
              type === BigListItemType.ITEM && controlItemRender ? (
                child
              ) : (
                <BigListItem
                  key={itemKey}
                  uniqueKey={uniqueKey}
                  height={height}
                  width={100 / numColumns + "%"}
                  style={style}
                >
                  {child}
                </BigListItem>
              ),
            );
          }
          break;
        case BigListItemType.EMPTY:
          children.push(
            <React.Fragment key={itemKey}>
              {emptyItem}
            </React.Fragment>
          );
          break;
        case BigListItemType.SPACER:
          children.push(
            placeholder ? (
              <BigListPlaceholder
                key={itemKey}
                height={height}
                image={placeholderImage}
                component={placeholderComponent}
              />
            ) : (
              <BigListItem key={itemKey} height={height} />
            ),
          );
          break;
        case BigListItemType.SECTION_HEADER:
          height = isEmptyList ? 0 : height; // Hide section header on empty
          sectionPositions.shift();
          child = renderSectionHeader(section);
          if (child != null) {
            children.push(
              <BigListSection
                key={itemKey}
                style={fullItemStyle}
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
    const { stickySectionHeadersEnabled, nativeOffsetValues } = this.props;
    const scrollView = this.getNativeScrollRef();
    if (
      stickySectionHeadersEnabled &&
      scrollView != null &&
      Platform.OS !== "web"
    ) {
      // Disabled on web
      this.scrollTopValueAttachment = Animated.attachNativeEvent(
        scrollView,
        "onScroll",
        [{ nativeEvent: { contentOffset: { y: this.scrollTopValue } } }],
      );
    }
    if (nativeOffsetValues && scrollView != null && Platform.OS !== "web") {
      Animated.attachNativeEvent(scrollView, "onScroll", [
        {
          nativeEvent: {
            contentOffset: nativeOffsetValues,
          },
        },
      ]);
    }
  }

  /**
   * Component did update.
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.initialScrollIndex !== this.props.initialScrollIndex) {
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
   * Get base style.
   * @return {{transform: [{scaleX: number}]}|{transform: [{scaleY: number}]}}
   */
  getBaseStyle() {
    const { inverted, horizontal } = this.props;
    if (inverted) {
      if (horizontal) {
        return {
          transform: [{ scaleX: -1 }],
        };
      } else {
        return {
          transform: [{ scaleY: -1 }],
        };
      }
    }
    return {};
  }

  /**
   * Render.
   * @returns {JSX.Element}
   */
  render() {
    // Reduce list properties
    const {
      data,
      keyExtractor,
      inverted,
      horizontal, // Disabled
      placeholder,
      placeholderImage,
      placeholderComponent,
      sections,
      initialScrollIndex,
      columnWrapperStyle,
      renderHeader,
      renderFooter,
      renderSectionHeader,
      renderItem,
      renderSectionFooter,
      renderScrollViewWrapper,
      renderEmpty,
      renderAccessory,
      itemHeight,
      footerHeight,
      headerHeight,
      sectionHeaderHeight,
      sectionFooterHeight,
      insetTop,
      insetBottom,
      actionSheetScrollRef,
      stickySectionHeadersEnabled,
      onEndReached,
      onEndReachedThreshold,
      onRefresh,
      refreshing,
      ListEmptyComponent,
      ListFooterComponent,
      ListFooterComponentStyle,
      ListHeaderComponent,
      ListHeaderComponentStyle,
      hideMarginalsOnEmpty,
      hideFooterOnEmpty,
      hideHeaderOnEmpty,
      ScrollViewComponent,
      ...props
    } = this.props;

    const wrapper = renderScrollViewWrapper || ((val) => val);
    const handleScroll =
      stickySectionHeadersEnabled && Platform.OS === "web"
        ? Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollTopValue } } }],
            {
              listener: (event) => this.onScroll(event),
              useNativeDriver: false,
            },
          )
        : this.onScroll;

    const defaultProps = {
      refreshControl:
        onRefresh && !this.props.refreshControl ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : null,
      contentContainerStyle: {
        maxWidth: "100%",
      },
    };

    const overwriteProps = {
      ref: (ref) => {
        this.scrollView.current = ref;
        if (actionSheetScrollRef) {
          actionSheetScrollRef.current = ref;
        }
      },
      onScroll: handleScroll,
      onLayout: this.onLayout,
      onMomentumScrollEnd: this.onMomentumScrollEnd,
      onScrollEndDrag: this.onScrollEnd,
    };

    const scrollViewProps = {
      ...defaultProps,
      ...props,
      ...overwriteProps,
    };

    // Content container style merge
    scrollViewProps.contentContainerStyle = mergeViewStyle(
      props.contentContainerStyle,
      defaultProps.contentContainerStyle,
    );

    const ListScrollView = ScrollViewComponent || Animated.ScrollView;

    const scrollView = wrapper(
      <ListScrollView {...scrollViewProps}>
        {this.renderItems()}
      </ListScrollView>,
    );

    const scrollStyle = mergeViewStyle(
      {
        flex: 1,
        maxHeight: Platform.select({ web: "100vh", default: "100%" }),
      },
      this.getBaseStyle(),
    );

    return (
      <View style={scrollStyle}>
        {scrollView}
        {renderAccessory != null ? renderAccessory(this) : null}
      </View>
    );
  }
}

BigList.propTypes = {
  inverted: PropTypes.bool,
  horizontal: PropTypes.bool,
  actionSheetScrollRef: PropTypes.any,
  batchSizeThreshold: PropTypes.number,
  bottom: PropTypes.number,
  numColumns: PropTypes.number,
  columnWrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentInset: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  controlItemRender: PropTypes.bool,
  data: PropTypes.array,
  placeholder: PropTypes.bool,
  placeholderImage: PropTypes.any,
  placeholderComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]),
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
  onEndReached: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  onLayout: PropTypes.func,
  onRefresh: PropTypes.func,
  onScroll: PropTypes.func,
  onScrollEnd: PropTypes.func,
  onViewableItemsChanged: PropTypes.func,
  removeClippedSubviews: PropTypes.bool,
  renderAccessory: PropTypes.func,
  renderScrollViewWrapper: PropTypes.func,
  renderEmpty: PropTypes.func,
  renderFooter: PropTypes.func,
  renderHeader: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  renderSectionHeader: PropTypes.func,
  renderSectionFooter: PropTypes.func,
  keyExtractor: PropTypes.func,
  refreshing: PropTypes.bool,
  scrollEventThrottle: PropTypes.number,
  initialScrollIndex: PropTypes.number,
  hideMarginalsOnEmpty: PropTypes.bool,
  sectionFooterHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  sectionHeaderHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  sections: PropTypes.array,
  stickySectionHeadersEnabled: PropTypes.bool,
  nativeOffsetValues: PropTypes.shape({
    x: PropTypes.instanceOf(Animated.Value),
    y: PropTypes.instanceOf(Animated.Value),
  }),
  ScrollViewComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.elementType,
  ]),
};

BigList.defaultProps = {
  // Data
  data: [],
  inverted: false,
  horizontal: false,
  sections: null,
  refreshing: false,
  batchSizeThreshold: 1,
  numColumns: 1,
  placeholder: Platform.select({
    web: false,
    default: false /* TODO: default disabled until a solution for different screen sizes is found */,
  }),
  // Renders
  renderItem: () => null,
  renderHeader: () => null,
  renderFooter: () => null,
  renderSectionHeader: () => null,
  renderSectionFooter: () => null,
  hideMarginalsOnEmpty: false,
  hideFooterOnEmpty: false,
  hideHeaderOnEmpty: false,
  controlItemRender: false,
  // Height
  itemHeight: 50,
  headerHeight: 0,
  footerHeight: 0,
  sectionHeaderHeight: 0,
  sectionFooterHeight: 0,
  // Scroll
  stickySectionHeadersEnabled: true,
  removeClippedSubviews: false,
  scrollEventThrottle: Platform.OS === "web" ? 5 : 16,
  // Keyboard
  keyboardShouldPersistTaps: "always",
  keyboardDismissMode: "interactive",
  // Insets
  insetTop: 0,
  insetBottom: 0,
  contentInset: { top: 0, right: 0, left: 0, bottom: 0 },
  onEndReachedThreshold: 0,
  nativeOffsetValues: undefined,
  ScrollViewComponent: Animated.ScrollView,
};

export default BigList;
