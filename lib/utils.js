import React from "react";

/**
 * Is numeric.
 * @param {any} num
 * @returns {boolean}
 */
export const isNumeric = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

/**
 * Process block.
 * @param {number} containerHeight
 * @param {number} scrollTop
 * @param {number|null|undefined} batchSizeThreshold
 * @returns {{blockStart: number, batchSize: number, blockEnd: number}}
 */
export const processBlock = ({
  containerHeight,
  scrollTop,
  batchSizeThreshold = 1,
}) => {
  if (containerHeight === 0) {
    return {
      batchSize: 0,
      blockStart: 0,
      blockEnd: 0,
    };
  }
  const batchSize = Math.ceil(
    containerHeight * Math.max(0.5, batchSizeThreshold),
  );
  const blockNumber = Math.ceil(scrollTop / batchSize);
  const blockStart = batchSize * blockNumber;
  const blockEnd = blockStart + batchSize;
  return { batchSize, blockStart, blockEnd };
};

/**
 * Autobind context to class methods.
 * @param {object} self
 * @returns {{}}
 */
export const autobind = (self = {}) => {
  const exclude = [
    "componentWillMount",
    /UNSAFE_.*/,
    "render",
    "getSnapshotBeforeUpdate",
    "componentDidMount",
    "componentWillReceiveProps",
    "shouldComponentUpdate",
    "componentWillUpdate",
    "componentDidUpdate",
    "componentWillUnmount",
    "componentDidCatch",
    "setState",
    "forceUpdate",
  ];

  const filter = (key) => {
    const match = (pattern) =>
      typeof pattern === "string" ? key === pattern : pattern.test(key);
    if (exclude) {
      return !exclude.some(match);
    }
    return true;
  };

  const getAllProperties = (object) => {
    const properties = new Set();
    do {
      for (const key of Object.getOwnPropertyNames(object).concat(
        Object.getOwnPropertySymbols(object),
      )) {
        properties.add([object, key]);
      }
    } while (
      (object = Object.getPrototypeOf(object)) &&
      object !== Object.prototype
    );
    return properties;
  };

  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === "constructor" || !filter(key)) {
      continue;
    }
    const descriptor = Object.getOwnPropertyDescriptor(object, key);
    if (descriptor && typeof descriptor.value === "function") {
      self[key] = self[key].bind(self);
    }
  }
  return self;
};

/**
 * Merge styles
 * @param {array|object|null|undefined} style
 * @param {array|object} defaultStyle
 * @returns {Object}
 */
export const mergeViewStyle = (style, defaultStyle = {}) => {
  let mergedStyle = style;
  if (mergedStyle == null) {
    mergedStyle = defaultStyle;
  } else if (Array.isArray(style) && Array.isArray(defaultStyle)) {
    const mergedDefaultStyle = [...defaultStyle];
    mergedDefaultStyle.concat(style);
    mergedStyle = mergedDefaultStyle;
  } else if (Array.isArray(defaultStyle)) {
    const mergedDefaultStyle = [...defaultStyle];
    mergedDefaultStyle.push(style);
    mergedStyle = mergedDefaultStyle;
  } else if (Array.isArray(style)) {
    mergedStyle = [...style];
    mergedStyle.unshift(defaultStyle);
  } else {
    mergedStyle = [defaultStyle, style];
  }
  return mergedStyle;
};

/**
 * Get element from component.
 * @param {React.node} Component
 * @param props
 * @returns {JSX.Element|[]|*}
 */
export const createElement = (Component, props = {}) => {
  return Component != null ? (
    React.isValidElement(Component) ? (
      React.cloneElement(Component, props)
    ) : (
      <Component {...props} />
    )
  ) : null;
};
