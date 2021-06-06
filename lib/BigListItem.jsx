import PropTypes from "prop-types";
import React, { memo } from "react";
import { View } from "react-native";

export const BigListItemType = {
  ITEM: "item",
  SPACER: "spacer",
  HEADER: "header",
  SECTION: "section",
  ROW: "row",
  FOOTER: "footer",
  SECTION_FOOTER: "section_footer",
};

const BigListItem = ({ height, children }) => (
  <View style={{ height }}>{children}</View>
);

BigListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  height: PropTypes.number,
};

export default memo(BigListItem);
