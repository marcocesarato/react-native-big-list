import React, { memo } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import { mergeViewStyle } from "./utils";

export const BigListItemType = {
  SPACER: "spacer",
  HEADER: "header",
  SECTION_HEADER: "section_header",
  ITEM: "item",
  SECTION_FOOTER: "section_footer",
  FOOTER: "footer",
};

/**
 * List item.
 * @param {React.node} children
 * @param {array|object|null|undefined} style
 * @param {number} height
 * @param {number} width
 * @returns {JSX.Element}
 * @constructor
 */
const BigListItem = ({ children, style, height, width = "100%" }) => {
  return (
    <View
      style={mergeViewStyle(style, {
        height,
        width,
      })}
    >
      {children}
    </View>
  );
};

BigListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

BigListItem.defaultProps = {
  width: "100%",
};

export default memo(BigListItem);
