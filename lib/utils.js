import React from "react";

/**
 * Is numeric.
 * @param num
 * @returns {boolean}
 */
export const isNumeric = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

/**
 * Process block.
 * @param containerHeight
 * @param scrollTop
 * @returns {{blockStart: number, batchSize: number, blockEnd: number}}
 */
export const processBlock = (containerHeight, scrollTop) => {
  if (containerHeight === 0) {
    return {
      batchSize: 0,
      blockStart: 0,
      blockEnd: 0,
    };
  }
  const batchSize = Math.ceil(containerHeight / 2);
  const blockNumber = Math.ceil(scrollTop / batchSize);
  const blockStart = batchSize * blockNumber;
  const blockEnd = blockStart + batchSize;
  return { batchSize, blockStart, blockEnd };
};

/**
 * For each object indexed.
 * @param fn
 * @param obj
 * @returns {*}
 */
export const forEachObjIndexed = (fn, obj) => {
  const keyList = Object.keys(obj);
  let idx = 0;
  while (idx < keyList.length) {
    const key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }
  return obj;
};

/**
 * Autobind context to class methods.
 * @param self
 * @returns {{}}
 */
export const autobind = (self = {}) => {
  const exclude = [
    "componentWillMount",
    "UNSAFE_componentWillMount",
    "render",
    "getSnapshotBeforeUpdate",
    "componentDidMount",
    "componentWillReceiveProps",
    "UNSAFE_componentWillReceiveProps",
    "shouldComponentUpdate",
    "componentWillUpdate",
    "UNSAFE_componentWillUpdate",
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
      for (const key of Reflect.ownKeys(object)) {
        properties.add([object, key]);
      }
    } while (
      (object = Reflect.getPrototypeOf(object)) &&
      object !== Object.prototype
    );
    return properties;
  };

  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === "constructor" || !filter(key)) {
      continue;
    }
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
    if (descriptor && typeof descriptor.value === "function") {
      self[key] = self[key].bind(self);
    }
  }
  return self;
};

/**
 * Merge styles
 * @param style
 * @param defaultStyle
 * @returns {*[]}
 */
export const mergeViewStyle = (style, defaultStyle) => {
  if (style == null) {
    style = defaultStyle;
  } else if (Array.isArray(style) && Array.isArray(defaultStyle)) {
    defaultStyle.concat(style);
    style = defaultStyle;
  } else if (Array.isArray(defaultStyle)) {
    defaultStyle.push(style);
    style = defaultStyle;
  } else if (Array.isArray(style)) {
    style.unshift(defaultStyle);
  } else {
    style = [defaultStyle, style];
  }
  return style;
};

/**
 * Get element from component.
 * @param Component
 * @returns {JSX.Element|[]|*}
 */
export const createElement = (Component) => {
  return React.isValidElement(Component) ? Component : <Component />;
};
