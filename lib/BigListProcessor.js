import { BigListItemType } from "./BigListItem";
import BigListItemRecycler from "./BigListItemRecycler";
import { isNumeric } from "./utils";

export default class BigListProcessor {
  /**
   * Constructor.
   * @param headerHeight
   * @param footerHeight
   * @param sectionHeaderHeight
   * @param itemHeight
   * @param sectionFooterHeight
   * @param sections
   * @param insetTop
   * @param insetBottom
   * @param scrollView
   * @param numColumns
   */
  constructor({
    headerHeight,
    footerHeight,
    sectionHeaderHeight,
    itemHeight,
    sectionFooterHeight,
    sections,
    insetTop,
    insetBottom,
    scrollView,
    numColumns,
  }) {
    this.headerHeight = headerHeight;
    this.footerHeight = footerHeight;
    this.sectionHeaderHeight = sectionHeaderHeight;
    this.itemHeight = itemHeight;
    this.sectionFooterHeight = sectionFooterHeight;
    this.sections = sections;
    this.insetTop = insetTop;
    this.insetBottom = insetBottom;
    this.uniform = isNumeric(itemHeight);
    this.scrollView = scrollView;
    this.numColumns = numColumns;
  }

  /**
   * Get item height.
   * @returns {number|*}
   */
  getItemHeight(section, index) {
    const { itemHeight } = this;
    return isNumeric(itemHeight)
      ? Number(itemHeight)
      : itemHeight(section, index);
  }

  /**
   * Get header height.
   * @returns {number|*}
   */
  getHeaderHeight() {
    const { headerHeight } = this;
    return isNumeric(headerHeight) ? Number(headerHeight) : headerHeight();
  }

  /**
   * Get footer height.
   * @returns {number|*}
   */
  getFooterHeight() {
    const { footerHeight } = this;
    return isNumeric(footerHeight) ? Number(footerHeight) : footerHeight();
  }

  /**
   * Get section height.
   * @returns {number|*}
   */
  getSectionHeaderHeight(section) {
    const { sectionHeaderHeight } = this;
    return isNumeric(sectionHeaderHeight)
      ? Number(sectionHeaderHeight)
      : sectionHeaderHeight(section);
  }

  /**
   * Get section footer height.
   * @returns {number|*}
   */
  getSectionFooterHeight(section) {
    const { sectionFooterHeight } = this;
    return isNumeric(sectionFooterHeight)
      ? Number(sectionFooterHeight)
      : sectionFooterHeight(section);
  }

  /**
   * Process list items.
   * @param top
   * @param bottom
   * @param prevItems
   * @returns {{items: [], height: *}}
   */
  process(top, bottom, prevItems) {
    const { sections } = this;
    let counter = -1;
    let height = this.insetTop;
    let spacerHeight = height;
    let items = [];
    const recycler = new BigListItemRecycler(prevItems);

    /**
     * Is item visible.
     * @param itemHeight
     * @param singleRow
     * @returns {boolean}
     */
    const isVisible = (itemHeight, singleRow = true) => {
      if (singleRow) {
        counter = -1;
      } else {
        counter++;
      }
      const prevHeight = height;
      if (singleRow || counter % this.numColumns === 0) {
        height += itemHeight;
      }
      if (height < top || prevHeight > bottom) {
        if (singleRow || counter % this.numColumns === 0) {
          spacerHeight += itemHeight;
        }
        return false;
      } else {
        return true;
      }
    };

    /**
     * Is visible below.
     * @param itemHeight
     * @param singleRow
     * @returns {boolean}
     */
    const isVisibleBelow = (itemHeight, singleRow = true) => {
      if (height > bottom) {
        if (singleRow || counter % this.numColumns === 0) {
          spacerHeight += itemHeight;
        }
        return false;
      } else {
        return true;
      }
    };

    /**
     * Push item.
     * @param item
     */
    const push = (item) => {
      const recycleItem = recycler.get(item);
      if (spacerHeight > 0) {
        items.push(
          recycler.get({
            type: BigListItemType.SPACER,
            position: item.position - spacerHeight,
            height: spacerHeight,
            section: item.section,
            index: item.index,
          }),
        );
        spacerHeight = 0;
      }
      items.push(recycleItem);
    };

    const calculateSpacerHeight = () => {
      let spacerCounter = -1;
      items.reduce((totalHeight, item, i) => {
        if (i !== items.length - 1) {
          const singleRow = item.type !== BigListItemType.ITEM;
          if (singleRow) {
            spacerCounter = 0;
          } else {
            spacerCounter++;
          }
          if (singleRow || spacerCounter % this.numColumns === 0) {
            return totalHeight + item.height;
          }
        }
        return totalHeight;
      }, 0);
    };

    let position;
    const headerHeight = this.getHeaderHeight();
    if (headerHeight > 0) {
      position = height;
      if (isVisible(headerHeight, true)) {
        push({
          type: BigListItemType.HEADER,
          position: position,
          height: headerHeight,
        });
      }
    }
    for (let section = 0; section < sections.length; section++) {
      const rows = sections[section];
      if (rows === 0) {
        continue;
      }
      const sectionHeaderHeight = this.getSectionHeaderHeight(section);
      position = height;
      height += sectionHeaderHeight;
      if (
        section > 1 &&
        items.length > 0 &&
        items[items.length - 1].type === BigListItemType.SECTION_HEADER
      ) {
        const initialSpacerHeight = calculateSpacerHeight();
        const prevSection = items[items.length - 1];
        const spacer = recycler.get({
          type: BigListItemType.SPACER,
          position: 0,
          height: initialSpacerHeight,
          section: prevSection.section,
          index: 0,
        });
        items = [spacer, prevSection];
      }
      if (isVisibleBelow(sectionHeaderHeight)) {
        push({
          type: BigListItemType.SECTION_HEADER,
          position: position,
          height: sectionHeaderHeight,
          section: section,
        });
      }
      if (this.uniform) {
        const itemHeight = this.getItemHeight(section);
        for (let index = 0; index < rows; index++) {
          position = height;
          if (isVisible(itemHeight, false)) {
            push({
              type: BigListItemType.ITEM,
              position: position,
              height: itemHeight,
              section: section,
              index: index,
            });
          }
        }
      } else {
        for (let index = 0; index < rows; index++) {
          const itemHeight = this.getItemHeight(section, index);
          position = height;
          if (isVisible(itemHeight, false)) {
            push({
              type: BigListItemType.ITEM,
              position: position,
              height: itemHeight,
              section: section,
              index: index,
            });
          }
        }
      }
      const sectionFooterHeight = this.getSectionFooterHeight(section);
      if (sectionFooterHeight > 0) {
        position = height;
        if (isVisible(sectionFooterHeight)) {
          push({
            type: BigListItemType.SECTION_FOOTER,
            position: position,
            height: sectionFooterHeight,
            section: section,
          });
        }
      }
    }
    const footerHeight = this.getFooterHeight();
    if (footerHeight > 0) {
      position = height;
      if (isVisible(footerHeight)) {
        push({
          type: BigListItemType.FOOTER,
          position: position,
          height: footerHeight,
        });
      }
    }
    height += this.insetBottom;
    spacerHeight += this.insetBottom;
    if (spacerHeight > 0) {
      items.push({
        type: BigListItemType.SPACER,
        position: height - spacerHeight,
        height: spacerHeight,
        section: sections.length,
      });
    }
    recycler.fill();
    return {
      height,
      items,
    };
  }

  /**
   * Scroll to position.
   * @param targetSection
   * @param targetIndex
   * @param animated
   */
  scrollToPosition(targetSection, targetIndex, animated) {
    const { sections, insetTop } = this;
    let scrollTop = insetTop + this.getHeaderHeight();
    let section = 0;
    let foundIndex = false;
    while (section <= targetSection) {
      const rows = Math.ceil(sections[section] / this.numColumns);
      if (rows === 0) {
        section += 1;
        continue;
      }
      scrollTop += this.getSectionHeaderHeight(section);
      if (this.uniform) {
        const uniformHeight = this.getItemHeight(section);
        if (section === targetSection) {
          scrollTop += uniformHeight * Math.ceil(targetIndex / this.numColumns);
          foundIndex = true;
        } else {
          scrollTop += uniformHeight * rows;
        }
      } else {
        for (let index = 0; index < rows; index++) {
          if (
            section < targetSection ||
            (section === targetSection && index < targetIndex)
          ) {
            scrollTop += this.getItemHeight(
              section,
              Math.ceil(index / this.numColumns),
            );
          } else if (section === targetSection && index === targetIndex) {
            foundIndex = true;
            break;
          }
        }
      }
      if (!foundIndex) {
        scrollTop += this.getSectionFooterHeight(section);
      }
      section += 1;
    }
    this.scrollView.scrollTo({
      x: 0,
      y: Math.max(0, scrollTop - this.getSectionHeaderHeight(targetSection)),
      animated,
    });
    return true;
  }
}
