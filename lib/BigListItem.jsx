import PropTypes from "prop-types";
import React, { memo } from "react";
import { View } from "react-native";
import { mergeViewStyle } from "./utils";

export const BigListItemType = {
  ITEM: "item",
  SPACER: "spacer",
  HEADER: "header",
  SECTION: "section",
  ROW: "row",
  FOOTER: "footer",
  SECTION_FOOTER: "section_footer",
};

const BigListItem = ({ height, style, children }) => (
  <View style={mergeViewStyle(style, { height })}>{children}</View>
);

BigListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default memo(BigListItem);
