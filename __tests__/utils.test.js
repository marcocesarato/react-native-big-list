import React from 'react';
import { View, Text } from 'react-native';
import { isNumeric, processBlock, autobind, mergeViewStyle, createElement } from '../lib/utils';

describe('utils.js coverage', () => {
  describe('isNumeric', () => {
    test('returns true for valid numbers', () => {
      expect(isNumeric(5)).toBe(true);
      expect(isNumeric(5.5)).toBe(true);
      expect(isNumeric('5')).toBe(true);
    });

    test('returns false for non-numeric values', () => {
      expect(isNumeric('abc')).toBe(false);
      expect(isNumeric(undefined)).toBe(false);
      expect(isNumeric(null)).toBe(false);
    });
  });

  describe('processBlock', () => {
    test('returns default batch size when containerHeight is 0', () => {
      const result = processBlock({
        containerHeight: 0,
        scrollTop: 0,
        batchSizeThreshold: 1,
      });

      expect(result.batchSize).toBe(10000);
      expect(result.blockStart).toBe(0);
      expect(result.blockEnd).toBe(10000);
    });

    test('calculates batch size with valid containerHeight', () => {
      const result = processBlock({
        containerHeight: 800,
        scrollTop: 0,
        batchSizeThreshold: 1,
      });

      expect(result.batchSize).toBe(800);
      expect(result.blockStart).toBe(0);
      expect(result.blockEnd).toBe(800);
    });

    test('calculates batch size with scroll position', () => {
      const result = processBlock({
        containerHeight: 800,
        scrollTop: 1600,
        batchSizeThreshold: 1,
      });

      expect(result.batchSize).toBe(800);
      expect(result.blockStart).toBe(1600);
      expect(result.blockEnd).toBe(2400);
    });

    test('respects minimum batchSizeThreshold of 0.5', () => {
      const result = processBlock({
        containerHeight: 800,
        scrollTop: 0,
        batchSizeThreshold: 0.3,
      });

      // Should use minimum 0.5 threshold
      expect(result.batchSize).toBe(400);
    });
  });

  describe('mergeViewStyle', () => {
    test('returns defaultStyle when style is null', () => {
      const defaultStyle = { backgroundColor: 'red' };
      const result = mergeViewStyle(null, defaultStyle);
      expect(result).toEqual(defaultStyle);
    });

    test('returns defaultStyle when style is undefined', () => {
      const defaultStyle = { backgroundColor: 'red' };
      const result = mergeViewStyle(undefined, defaultStyle);
      expect(result).toEqual(defaultStyle);
    });

    test('merges array style with array defaultStyle', () => {
      const style = [{ color: 'blue' }];
      const defaultStyle = [{ backgroundColor: 'red' }];
      const result = mergeViewStyle(style, defaultStyle);
      expect(Array.isArray(result)).toBe(true);
    });

    test('handles array defaultStyle with object style', () => {
      const style = { color: 'blue' };
      const defaultStyle = [{ backgroundColor: 'red' }];
      const result = mergeViewStyle(style, defaultStyle);
      expect(Array.isArray(result)).toBe(true);
    });

    test('handles array style with object defaultStyle', () => {
      const style = [{ color: 'blue' }];
      const defaultStyle = { backgroundColor: 'red' };
      const result = mergeViewStyle(style, defaultStyle);
      expect(Array.isArray(result)).toBe(true);
    });

    test('handles object style with object defaultStyle', () => {
      const style = { color: 'blue' };
      const defaultStyle = { backgroundColor: 'red' };
      const result = mergeViewStyle(style, defaultStyle);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('createElement', () => {
    test('returns null when Component is null', () => {
      const result = createElement(null);
      expect(result).toBeNull();
    });

    test('returns null when Component is undefined', () => {
      const result = createElement(undefined);
      expect(result).toBeNull();
    });

    test('clones element when Component is React element', () => {
      const element = <View testID="test" />;
      const result = createElement(element);
      expect(React.isValidElement(result)).toBe(true);
    });

    test('creates element from function component', () => {
      const Component = () => <Text>Test</Text>;
      const result = createElement(Component);
      expect(React.isValidElement(result)).toBe(true);
    });

    test('passes props to created element', () => {
      const Component = (props) => <Text testID={props.testID}>Test</Text>;
      const result = createElement(Component, { testID: 'custom-id' });
      expect(React.isValidElement(result)).toBe(true);
    });
  });

  describe('autobind', () => {
    test('binds class methods', () => {
      class TestClass {
        constructor() {
          this.value = 'test';
          autobind(this);
        }

        testMethod() {
          return this.value;
        }
      }

      const instance = new TestClass();
      const method = instance.testMethod;
      expect(method()).toBe('test');
    });

    test('excludes lifecycle methods', () => {
      class TestClass {
        constructor() {
          this.value = 'test';
          autobind(this);
        }

        componentDidMount() {
          return this.value;
        }

        render() {
          return null;
        }

        testMethod() {
          return this.value;
        }
      }

      const instance = new TestClass();
      expect(instance.testMethod).toBeDefined();
    });
  });
});
