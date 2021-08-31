import { BigListItemType } from "./BigListItem";
import BigListItemRecycler from "./BigListItemRecycler";
import { isNumeric } from "./utils";

export default class BigListProcessor {
  /**
   * Constructor.
   * @param {ScrollView} scrollView
   * @param {array[]|object|null|undefined} sections
   * @param {number|function|null|undefined} headerHeight
   * @param {number|function|null|undefined} footerHeight
   * @param {number|function|null|undefined} sectionHeaderHeight
   * @param {number|function|null|undefined} itemHeight
   * @param {number|function|null|undefined} sectionFooterHeight
   * @param {number|function|null|undefined} insetTop
   * @param {number|function|null|undefined} insetBottom
   * @param {number|null|undefined} numColumns
   */
  constructor({
    scrollView,
    sections,
    headerHeight,
    footerHeight,
    sectionHeaderHeight,
    itemHeight,
    sectionFooterHeight,
    insetTop,
    insetBottom,
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
   * @param {number} top
   * @param {number} bottom
   * @param {array} prevItems
   * @returns {{items: [], height: *}}
   */
  process(top, bottom, prevItems) {
    const { sections } = this;
    const items = [];
    const recycler = new BigListItemRecycler(prevItems);

    let position;
    let counter = -1; // Counter of items per row pushed
    let height = this.insetTop;
    let spacerHeight = height;

    /**
     * The width of the row is the entire line.
     * @param {object} item
     * @returns {boolean}
     */
    const isFullRow = (item) => {
      // Only items can be rendered with column format, so all others are full row
      return item.type !== BigListItemType.ITEM;
    };

    /**
     * Is visible below.
     * @param {object} item
     * @returns {boolean}
     */
    const isVisibleBelow = (item) => {
      const { height: itemHeight } = item;
      counter = -1;
      if (height > bottom) {
        spacerHeight += itemHeight;
        return false;
      } else {
        return true;
      }
    };

    /**
     * Is the item visible.
     * @param {object} item
     * @param {bool} force
     * @returns {boolean}
     */
    const isVisible = (item, force = false) => {
      // Check section headers visibility below
      if (item.type === BigListItemType.SECTION_HEADER) {
        return isVisibleBelow(item);
      }
      // Dimensions
      const { height: itemHeight } = item;
      const fullRow = isFullRow(item);
      const prevHeight = height;
      // Increase or reset counter
      counter = fullRow ? -1 : counter + 1;
      if (fullRow || counter % this.numColumns === 0) {
        height += itemHeight;
      }
      // Check if is visible
      if (force || (height > top && prevHeight < bottom)) {
        return true;
      } else {
        if (fullRow || counter % this.numColumns === 0) {
          spacerHeight += itemHeight;
        }
        return false;
      }
    };

    /**
     * Get recycled views and push items.
     * @param {object} itemsArray
     */
    const push = (...itemsArray) => {
      itemsArray.forEach((item) => {
        items.push(recycler.get(item));
      });
    };

    /**
     * Push spacer.
     * @param {object} item
     */
    const pushSpacer = (item) => {
      if (spacerHeight > 0) {
        push({
          type: BigListItemType.SPACER,
          position: item.position - spacerHeight,
          height: spacerHeight,
          section: item.section,
          index: item.index,
        });
        spacerHeight = 0;
      }
    };

    /**
     * Push the item when is visible.
     * @param {object} item
     * @param {bool} force
     */
    const pushItem = (item, force = false) => {
      if (isVisible(item, force)) {
        pushSpacer(item);
        push(item);
      }
    };

    /**
     * Calculate spacer height.
     */
    const getSpacerHeight = () => {
      let itemsCounter = -1;
      return items.reduce((totalHeight, item, i) => {
        if (i !== items.length - 1) {
          const fullRow = isFullRow(item);
          itemsCounter = fullRow ? 0 : itemsCounter + 1;
          if (fullRow || itemsCounter % this.numColumns === 0) {
            return totalHeight + item.height;
          }
        }
        return totalHeight;
      }, 0);
    };

    // Header
    const headerHeight = this.getHeaderHeight();
    if (headerHeight > 0) {
      position = height;
      pushItem(
        {
          type: BigListItemType.HEADER,
          position: position,
          height: headerHeight,
        },
        true,
      );
    }
    // Sections
    for (let section = 0; section < sections.length; section++) {
      const rows = sections[section];
      if (rows === 0) {
        continue;
      }
      // Section Header
      const sectionHeaderHeight = this.getSectionHeaderHeight(section);
      position = height;
      height += sectionHeaderHeight;
      if (
        section > 1 &&
        items.length > 0 &&
        items[items.length - 1].type === BigListItemType.SECTION_HEADER
      ) {
        // Top Spacer
        const initialSpacerHeight = getSpacerHeight();
        const prevSection = items[items.length - 1];
        items.splice(0, items.length);
        push(
          {
            type: BigListItemType.HEADER,
            position: position,
            height: headerHeight,
          },
          {
            type: BigListItemType.SPACER,
            position: 0,
            height: initialSpacerHeight - headerHeight,
            section: prevSection.section,
            index: 0,
          },
          prevSection,
        );
      }
      pushItem({
        type: BigListItemType.SECTION_HEADER,
        position: position,
        height: sectionHeaderHeight,
        section: section,
      });
      // Items
      let itemHeight = this.getItemHeight(section);
      for (let index = 0; index < rows; index++) {
        if (!this.uniform) {
          itemHeight = this.getItemHeight(section, index);
        }
        position = height;
        pushItem({
          type: BigListItemType.ITEM,
          position: position,
          height: itemHeight,
          section: section,
          index: index,
        });
      }
      // Section Footer
      const sectionFooterHeight = this.getSectionFooterHeight(section);
      if (sectionFooterHeight > 0) {
        position = height;
        pushItem({
          type: BigListItemType.SECTION_FOOTER,
          position: position,
          height: sectionFooterHeight,
          section: section,
        });
      }
    }
    // Footer
    const footerHeight = this.getFooterHeight();
    if (footerHeight > 0) {
      position = height;
      pushItem(
        {
          type: BigListItemType.FOOTER,
          position: position,
          height: footerHeight,
        },
        true,
      );
    }
    // Bottom Spacer
    height += this.insetBottom;
    spacerHeight += this.insetBottom;
    if (spacerHeight > 0) {
      push({
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
   * @param {int} targetSection
   * @param {int} targetIndex
   * @param {boolean} animated
   */
  scrollToPosition(targetSection, targetIndex, animated) {
    const { sections, insetTop } = this;

    // Header + inset
    let scrollTop = insetTop + this.getHeaderHeight();
    let section = 0;
    let foundIndex = false;
    while (section <= targetSection) {
      const rows = Math.ceil(sections[section] / this.numColumns);
      if (rows === 0) {
        section += 1;
        continue;
      }
      // Section header
      scrollTop += this.getSectionHeaderHeight(section);

      // Items
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

      // Section footer
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
