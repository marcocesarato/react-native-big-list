import React, { useCallback, useEffect, useRef } from "react";
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
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Create stable callbacks that safely handle events even after unmount
  const handleLoadStart = useCallback(() => {
    if (!isMountedRef.current) return;
    // Image load started - no-op
  }, []);

  const handleLoadEnd = useCallback(() => {
    if (!isMountedRef.current) return;
    // Image load ended - no-op
  }, []);

  const handleError = useCallback(() => {
    if (!isMountedRef.current) return;
    // Image load error - no-op
  }, []);

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
          fadeDuration={0}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
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

export default BigListPlaceholder;
