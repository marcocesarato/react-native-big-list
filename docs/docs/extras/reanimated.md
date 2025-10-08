---
sidebar_position: 3
---

# Using with Reanimated 2

BigList fully supports React Native Reanimated 2's `useAnimatedScrollHandler` for high-performance scroll animations that run on the UI thread.

## Example Usage

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import BigList from 'react-native-big-list';
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

const MyAnimatedList = ({ data }) => {
  // Create a shared value to track scroll position
  const scrollY = useSharedValue(0);

  // Create an animated scroll handler (runs on UI thread)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animated header that shrinks on scroll
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 100],
      [100, 50],
      Extrapolate.CLAMP
    );

    return {
      height,
    };
  });

  const renderItem = ({ item, index }) => (
    <View style={{ height: 50, padding: 10 }}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[{ backgroundColor: 'blue' }, headerAnimatedStyle]}>
        <Text style={{ color: 'white', padding: 10 }}>Animated Header</Text>
      </Animated.View>
      <BigList
        data={data}
        renderItem={renderItem}
        itemHeight={50}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default MyAnimatedList;
```

## How it works

BigList properly forwards your Reanimated worklet handlers to the underlying ScrollView while maintaining its own internal virtualization logic. This allows:

1. **UI Thread Performance**: Reanimated worklets run on the UI thread for smooth animations
2. **Virtualization**: BigList's internal scroll handling continues to work for efficient item rendering
3. **No Performance Degradation**: Both handlers run in parallel without blocking each other

## Important Notes

- BigList already comes wrapped with `Animated.createAnimatedComponent`, so you **don't need to wrap it again**
- The `onScroll` prop accepts both regular JavaScript callbacks and Reanimated 2 worklets
- Make sure to set `scrollEventThrottle={16}` for smooth 60fps animations
- Your worklet handler is called after BigList's internal virtualization logic processes the scroll event

## Migration from Regular Callbacks

If you were previously using a regular `onScroll` callback:

```javascript
// Before (regular callback)
<BigList
  onScroll={(event) => {
    console.log(event.nativeEvent.contentOffset.y);
  }}
/>

// After (with Reanimated 2)
const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    scrollY.value = event.contentOffset.y;
  },
});

<BigList 
  onScroll={scrollHandler}
  scrollEventThrottle={16}
/>
```

Both patterns continue to work seamlessly - use regular callbacks for simple cases and Reanimated worklets when you need high-performance UI thread animations.

## Additional Examples

### Parallax Effect

```javascript
const ParallaxList = ({ data }) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const translateY = scrollY.value * 0.5; // Parallax factor
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        source={require('./background.jpg')}
        style={[StyleSheet.absoluteFill, backgroundStyle]}
      />
      <BigList
        data={data}
        renderItem={renderItem}
        itemHeight={100}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  );
};
```

### Fade In/Out Header

```javascript
const FadeHeaderList = ({ data }) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Text>Scroll to fade</Text>
      </Animated.View>
      <BigList
        data={data}
        renderItem={renderItem}
        itemHeight={80}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  );
};
```
