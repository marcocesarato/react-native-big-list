import PropTypes from "prop-types";
import React, { memo } from "react";
import { Animated } from "react-native";

const BigListSection = ({
  position,
  height,
  nextSectionPosition,
  scrollTopValue,
  children,
}) => {
  const inputRange = [-1, 0];
  const outputRange = [0, 0];
  inputRange.push(position);
  outputRange.push(0);
  const collisionPoint = (nextSectionPosition || 0) - height;
  if (collisionPoint >= position) {
    inputRange.push(collisionPoint, collisionPoint + 1);
    outputRange.push(collisionPoint - position, collisionPoint - position);
  } else {
    inputRange.push(position + 1);
    outputRange.push(1);
  }
  const translateY = scrollTopValue.interpolate({
    inputRange,
    outputRange,
  });
  const child = React.Children.only(children);
  const fillChildren =
    React.isValidElement(child) &&
    React.cloneElement(child, {
      style: { flex: 1 },
    });
  const style = [
    React.isValidElement(child) && child.props.style
      ? child.props.style
      : undefined,
    {
      zIndex: 10,
      height: height,
      transform: [{ translateY }],
    },
  ];
  return <Animated.View style={style}>{fillChildren}</Animated.View>;
};

BigListSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  height: PropTypes.number,
  nextSectionPosition: PropTypes.number,
  position: PropTypes.number,
  scrollTopValue: PropTypes.instanceOf(Animated.Value),
};

export default memo(BigListSection);
