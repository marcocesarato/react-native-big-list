// Jest setup file for react-native-big-list tests

// Silence console warnings during tests unless you need to debug
global.console = {
  ...console,
  // Uncomment to suppress logs during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Filter specific deprecation warnings from react-test-renderer introduced in React 19+
// We only suppress the known deprecation message to keep other errors visible.
const originalConsoleError = console.error.bind(console);
console.error = (...args) => {
  try {
    const firstArg = typeof args[0] === 'string' ? args[0] : '';
    // message excerpt to match the warning shown by react-test-renderer
    if (firstArg.includes('react-test-renderer is deprecated')) {
      return;
    }
  } catch (e) {
    // If anything goes wrong while checking, fall through to original error
  }
  return originalConsoleError(...args);
};

