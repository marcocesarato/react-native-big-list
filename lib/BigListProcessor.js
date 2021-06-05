import { BigListItemType } from "./BigListItem";
import BigListItemRecycler from "./BigListItemRecycler";
import { isNumeric } from "./utils";

export default class BigListProcessor {
  /**
   * Constructor.
   * @param headerHeight
   * @param footerHeight
   * @param sectionHeight
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
    sectionHeight,
    itemHeight,
    sectionFooterHeight,
    sections,
    insetTop,
    insetBottom,
    scrollView,
  }) {
    this.headerHeight = headerHeight;
    this.footerHeight = footerHeight;
    this.sectionHeight = sectionHeight;
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
  getItemHeight(section, row) {
    const { itemHeight } = this;
    return isNumeric(itemHeight)
      ? Number(itemHeight)
      : itemHeight(section, row);
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
  getSectionHeight(section) {
    const { sectionHeight } = this;
    return isNumeric(sectionHeight)
      ? Number(sectionHeight)
      : sectionHeight(section);
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
            item.row,
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
      const sectionHeight = this.getSectionHeight(section);
      position = height;
      height += sectionHeight;
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
      if (isVisibleBelow(sectionHeight)) {
        push(
          recycler.get(
            BigListItemType.SECTION,
            position,
            sectionHeight,
            section,
          ),
        );
      }
      if (this.uniform) {
        const itemHeight = this.getItemHeight(section);
        for (let row = 0; row < rows; row++) {
          position = height;
          if (isVisible(itemHeight)) {
            push(
              recycler.get(
                BigListItemType.ROW,
                position,
                itemHeight,
                section,
                row,
              ),
            );
          }
        }
      } else {
        for (let row = 0; row < rows; row++) {
          const itemHeight = this.getItemHeight(section, row);
          position = height;
          if (isVisible(itemHeight)) {
            push(
              recycler.get(
                BigListItemType.ROW,
                position,
                itemHeight,
                section,
                row,
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
   * @param targetRow
   * @param animated
   */
  scrollToPosition(targetSection, targetRow, animated) {
    const { sections, insetTop } = this;
    let scrollTop = insetTop + this.getHeaderHeight();
    let section = 0;
    let foundRow = false;
    while (section <= targetSection) {
      const rows = sections[section];
      if (rows === 0) {
        section += 1;
        continue;
      }
      scrollTop += this.getSectionHeight(section);
      if (this.uniform) {
        const uniformHeight = this.getItemHeight(section);
        if (section === targetSection) {
          scrollTop += uniformHeight * targetRow;
          foundRow = true;
        } else {
          scrollTop += uniformHeight * rows;
        }
      } else {
        for (let row = 0; row < rows; row++) {
          if (
            section < targetSection ||
            (section === targetSection && row < targetRow)
          ) {
            scrollTop += this.getItemHeight(section, row);
          } else if (section === targetSection && row === targetRow) {
            foundRow = true;
            break;
          }
        }
      }
      if (!foundRow) {
        scrollTop += this.getSectionFooterHeight(section);
      }
      section += 1;
    }
    this.scrollView.scrollTo({
      x: 0,
      y: Math.max(0, scrollTop - this.getSectionHeight(targetSection)),
      animated,
    });
  }
}
