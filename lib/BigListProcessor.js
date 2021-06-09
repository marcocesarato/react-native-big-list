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
  getsectionHeaderHeight(section) {
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
    let height = this.insetTop;
    let spacerHeight = height;
    let items = [];
    const recycler = new BigListItemRecycler(prevItems);

    /**
     * Is item visible.
     * @param itemHeight
     * @returns {boolean}
     */
    const isVisible = (itemHeight) => {
      const prevHeight = height;
      height += itemHeight;
      if (height < top || prevHeight > bottom) {
        spacerHeight += itemHeight;
        return false;
      } else {
        return true;
      }
    };

    /**
     * Is visible below.
     * @param itemHeight
     * @returns {boolean}
     */
    const isVisibleBelow = (itemHeight) => {
      if (height > bottom) {
        spacerHeight += itemHeight;
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
      if (spacerHeight > 0) {
        items.push(
          recycler.get(
            BigListItemType.SPACER,
            item.position - spacerHeight,
            spacerHeight,
            item.section,
            item.index,
          ),
        );
        spacerHeight = 0;
      }
      items.push(item);
    };
    let position;
    const headerHeight = this.getHeaderHeight();
    if (headerHeight > 0) {
      position = height;
      if (isVisible(headerHeight)) {
        push(recycler.get(BigListItemType.HEADER, position, headerHeight));
      }
    }
    for (let section = 0; section < sections.length; section++) {
      const rows = sections[section];
      if (rows === 0) {
        continue;
      }
      const sectionHeaderHeight = this.getsectionHeaderHeight(section);
      position = height;
      height += sectionHeaderHeight;
      if (
        section > 1 &&
        items.length > 0 &&
        items[items.length - 1].type === BigListItemType.SECTION
      ) {
        const spacerheight = items.reduce((totalHeight, item, i) => {
          if (i !== items.length - 1) {
            return totalHeight + item.height;
          }
          return totalHeight;
        }, 0);
        const prevSection = items[items.length - 1];
        const spacer = recycler.get(
          BigListItemType.SPACER,
          0,
          spacerheight,
          prevSection.section,
          0,
        );
        items = [spacer, prevSection];
      }
      if (isVisibleBelow(sectionHeaderHeight)) {
        push(
          recycler.get(
            BigListItemType.SECTION,
            position,
            sectionHeaderHeight,
            section,
          ),
        );
      }
      if (this.uniform) {
        const itemHeight = this.getItemHeight(section);
        for (let index = 0; index < rows; index++) {
          position = height;
          if (isVisible(itemHeight)) {
            push(
              recycler.get(
                BigListItemType.ROW,
                position,
                itemHeight,
                section,
                index,
              ),
            );
          }
        }
      } else {
        for (let index = 0; index < rows; index++) {
          const itemHeight = this.getItemHeight(section, index);
          position = height;
          if (isVisible(itemHeight)) {
            push(
              recycler.get(
                BigListItemType.ROW,
                position,
                itemHeight,
                section,
                index,
              ),
            );
          }
        }
      }
      const sectionFooterHeight = this.getSectionFooterHeight(section);
      if (sectionFooterHeight > 0) {
        position = height;
        if (isVisible(sectionFooterHeight)) {
          push(
            recycler.get(
              BigListItemType.SECTION_FOOTER,
              position,
              sectionFooterHeight,
              section,
            ),
          );
        }
      }
    }
    const footerHeight = this.getFooterHeight();
    if (footerHeight > 0) {
      position = height;
      if (isVisible(footerHeight)) {
        push(recycler.get(BigListItemType.FOOTER, position, footerHeight));
      }
    }
    height += this.insetBottom;
    spacerHeight += this.insetBottom;
    if (spacerHeight > 0) {
      items.push(
        recycler.get(
          BigListItemType.SPACER,
          height - spacerHeight,
          spacerHeight,
          sections.length,
        ),
      );
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
      const rows = sections[section];
      if (rows === 0) {
        section += 1;
        continue;
      }
      scrollTop += this.getsectionHeaderHeight(section);
      if (this.uniform) {
        const uniformHeight = this.getItemHeight(section);
        if (section === targetSection) {
          scrollTop += uniformHeight * targetIndex;
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
            scrollTop += this.getItemHeight(section, index);
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
      y: Math.max(0, scrollTop - this.getsectionHeaderHeight(targetSection)),
      animated,
    });
    return true;
  }
}
