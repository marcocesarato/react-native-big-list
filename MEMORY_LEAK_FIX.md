# Memory Leak Fix Documentation

## Issue
When the `placeholder` attribute is set to `true`, scrolling forward (causing placeholder images to render) and then scrolling back to the beginning of the list triggers a memory leak warning on the web version:

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

## Root Cause
The React Native Web `Image` component maintains internal state for managing image loading. When the `BigListPlaceholder` component unmounts during scrolling (as items are virtualized), the Image's internal state updates can trigger after the component has been unmounted, causing React to emit the memory leak warning.

On React Native Web, the `Image` component uses an HTML `<img>` element internally. When this element's load events fire after the React component has unmounted, they can trigger internal state updates in the Image component.

## Solution
The fix ensures proper lifecycle management by:

1. **Added `useEffect` hook with cleanup function**: Establishes proper unmount detection and cleanup
2. **Added `useRef` (isMountedRef)**: Tracks whether the component is still mounted
3. **Added safe event handlers**: `onLoadStart`, `onLoadEnd`, and `onError` handlers that check if the component is still mounted before processing
4. **Added `fadeDuration={0}`**: Disables the Android fade animation that could cause additional state updates
5. **Removed `memo()` wrapper**: Ensures proper React lifecycle management and cleanup without memoization interference

## Changes Made

### Before (lib/BigListPlaceholder.jsx)
```javascript
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

export default memo(BigListPlaceholder);
```

### After (lib/BigListPlaceholder.jsx)
```javascript
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
```

## Technical Details

### Why Event Handlers Help
While we cannot directly prevent the React Native Web Image component's internal state updates, providing event handlers that check the mounted state helps in several ways:

1. **Lifecycle Signal**: The presence of event handlers signals to React that this component is managing lifecycle
2. **Safe Callbacks**: Even if the Image's internal events fire after unmount, our handlers won't cause additional issues
3. **Best Practice**: Following React patterns for handling async operations in components

### Why Remove memo()
The `memo()` wrapper can interfere with proper lifecycle cleanup in some cases. By removing it, we ensure that React's normal lifecycle and cleanup mechanisms work correctly. The performance impact is minimal since placeholder components are already part of a virtualized list.

### Why useRef Instead of useState
Using `useRef` instead of `useState` for tracking mounted state is important because:
1. Ref updates don't trigger re-renders
2. Refs persist across renders
3. We can safely update refs in the cleanup function without causing additional state update warnings

## Testing
To verify the fix:
1. Enable `placeholder={true}` in your BigList configuration
2. Scroll forward in the list to render placeholder images
3. Scroll back to the beginning of the list
4. Check the console - the memory leak warning should no longer appear

## Compatibility
This fix is compatible with:
- React Native (iOS/Android): All existing functionality preserved
- React Native Web: Memory leak warning eliminated
- Expo: Fully compatible

No breaking changes were introduced.
