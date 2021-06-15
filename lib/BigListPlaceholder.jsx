import React, { memo } from "react";
import PropTypes from "prop-types";
import { Animated, Image } from "react-native";

import { createElement, mergeViewStyle } from "./utils";

const BigListPlaceholder = ({
  component,
  image,
  style,
  height,
  width = "100%",
}) => {
  const bgStyles = {
    position: "absolute",
    resizeMode: "repeat",
    overflow: "visible",
    backfaceVisibility: "visible",
    flex: 1,
    height: "100%",
    width: "100%",
  };
  return (
    <Animated.View
      style={mergeViewStyle(style, {
        height,
        width,
      })}
    >
      {createElement(component) || (
        <Image
          source={image || require("./assets/placeholder.png")}
          style={bgStyles}
        />
      )}
    </Animated.View>
  );
};

BigListPlaceholder.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

BigListPlaceholder.defaultProps = {
  width: "100%",
};

export default memo(BigListPlaceholder);
