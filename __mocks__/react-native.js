const React = require('react');

// Mock React Native components
const View = (props) => React.createElement('View', props, props.children);
const Text = (props) => React.createElement('Text', props, props.children);
const ScrollView = React.forwardRef((props, ref) => {
  return React.createElement('ScrollView', { ...props, ref }, props.children);
});

// Mock Animated
const Animated = {
  View: View,
  ScrollView: ScrollView,
  Value: class AnimatedValue {
    constructor(value) {
      this._value = value;
    }
    setValue(value) {
      this._value = value;
    }
    interpolate() {
      return this;
    }
  },
  event: () => () => {},
  createAnimatedComponent: (Component) => Component,
};

// Mock Platform
const Platform = {
  OS: 'ios',
  select: (obj) => obj.ios || obj.default,
};

// Mock Dimensions
const Dimensions = {
  get: () => ({ width: 375, height: 667 }),
};

// Mock StyleSheet
const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => style,
  compose: (style1, style2) => [style1, style2],
};

module.exports = {
  View,
  Text,
  ScrollView,
  Animated,
  Platform,
  Dimensions,
  StyleSheet,
};
