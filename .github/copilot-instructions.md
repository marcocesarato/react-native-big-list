# React Native Big List - GitHub Copilot Instructions

<meta>
  <project-type>React Native Library</project-type>
  <platforms>iOS, Android, Web, Expo</platforms>
  <main-language>JavaScript (ES6+)</main-language>
  <framework>React Native</framework>
  <test-framework>Jest</test-framework>
  <docs-framework>Docusaurus</docs-framework>
  <license>MIT</license>
</meta>

## 🎯 Project Goal

<goal>
Make small, safe, well-tested improvements to this high-performance React Native list library. Focus on:
- **Bug fixes** with proper test coverage
- **Documentation** improvements and corrections
- **Small feature additions** that maintain backward compatibility
- **Performance optimizations** that are opt-in or transparent
- **Testing** enhancements and edge case coverage

⚠️ **Always prefer minimal, reversible changes with comprehensive validation**
</goal>

## 🗺️ Repository Architecture

### Core Components
<core-files>
| File | Purpose | Key Responsibilities |
|------|---------|---------------------|
| `lib/BigList.jsx` | Main component | Item rendering, scroll/layout event handling, public API |
| `lib/BigListProcessor.js` | Layout engine | Computes visible items, spacers, scroll positions |
| `lib/BigListItemRecycler.js` | Memory optimization | Recycles view objects, prevents memory leaks |
| `lib/BigListItem.jsx` | Item wrapper | Individual item rendering and lifecycle |
| `lib/BigListSection.jsx` | Section support | Section headers/footers, grouped data |
| `lib/BigListPlaceholder.jsx` | Loading states | Placeholder component for unrendered items |
</core-files>

### Public API & Types
<api-files>
| File | Purpose | Update Triggers |
|------|---------|----------------|
| `lib/index.d.ts` | TypeScript definitions | Any prop/method signature changes |
| `index.js` | Main export | New components or utility exports |
| `lib/utils.js` | Shared utilities | Helper functions used across components |
</api-files>

### Development & Testing
<dev-files>
| Directory | Purpose | Usage |
|-----------|---------|-------|
| `__tests__/` | Jest test suites | Validate behaviors, catch regressions |
| `example/` | Expo demo app | Smoke testing, performance validation |
| `docs/` | Docusaurus documentation | API docs, guides, examples |
| `scripts/` | Build tooling | Distribution, publishing automation |
</dev-files>

## 🧩 Architecture Patterns

### Core Design Principles
<patterns>
<pattern name="Pure JavaScript Implementation">
- **Why**: Cross-platform compatibility (iOS, Android, Web, Expo)
- **Rule**: Never add native modules or platform-specific code
- **Validation**: Test on multiple platforms including web
</pattern>

<pattern name="Height-First Rendering">
- **Concept**: All items must have deterministic heights
- **Implementation**: Heights specified as numbers or functions
- **Key Methods**: `BigList.getItemHeight()`, `BigListProcessor.getItemHeight()`
- **Validation**: Check height calculations in processor tests
</pattern>

<pattern name="Processor-Centric Layout">
- **Engine**: `BigListProcessor.process()` computes all layout
- **Outputs**: Visible items array, spacer components, total height
- **Invariants**: Spacer math must be consistent with recycling logic
- **Testing**: Layout changes require processor unit tests
</pattern>

<pattern name="View Recycling">
- **Manager**: `BigListItemRecycler` preserves React elements
- **Benefit**: Prevents expensive re-renders, maintains scroll performance
- **Caution**: Item key/shape changes need recycler mapping updates
- **Debug**: Visual glitches often indicate recycler issues
</pattern>

<pattern name="Dual Data Modes">
- **Flat Mode**: `data` prop with simple array
- **Section Mode**: `sections` prop with grouped data
- **Branching**: `this.hasSections()` determines code path
- **Requirement**: Update both modes for data-related changes
</pattern>
</patterns>

## 🛠️ Development Workflows

### Testing & Validation
<commands>
```bash
# Run complete test suite
yarn test
npm test

# Run tests in watch mode
yarn test --watch

# Run specific test file
yarn test BigList.basic.test.js

# Test with coverage
yarn test --coverage
```
</commands>

### Example App Development
<commands>
```bash
# Navigate to example directory
cd example/

# Install dependencies
yarn install
# or
npm install

# Start Expo development server
expo start

# Run on specific platform
expo start --ios
expo start --android
expo start --web
```
</commands>

### Build & Distribution
<commands>
```bash
# Build package for distribution
yarn prepare

# This runs:
# 1. bob build (creates dist files)
# 2. node scripts/dist.js (finalizes distribution)

# Lint and format code
yarn prettify  # Prettier formatting
yarn lint      # ESLint checking

# Pre-commit hooks run lint-staged automatically
```
</commands>

## 🔧 Change Guidelines

### Bug Fixes & Runtime Issues
<change-type category="bugfix">
**Focus Areas:**
- Scrolling math errors (off-by-one, position calculations)
- Spacer height inconsistencies
- Memory leaks in recycler
- Event handler edge cases

**Validation Process:**
1. Create focused Jest test reproducing the issue
2. Implement minimal fix
3. Verify test passes
4. Run full test suite
5. Test in example app with edge cases
</change-type>

### API Changes & Extensions
<change-type category="api">
**Required Updates:**
- `lib/index.d.ts` - TypeScript definitions
- `index.js` - Export declarations
- `docs/docs/*.md` - Documentation updates
- `example/` - Usage examples (if applicable)

**Backward Compatibility:**
- Add new props as optional with sensible defaults
- Deprecate old APIs before removing (use console.warn)
- Add migration notes to CHANGELOG.md
</change-type>

### Performance Optimizations
<change-type category="performance">
**Validation Requirements:**
- Profile with `example/` app using large datasets
- Create synthetic benchmark tests
- Make optimizations opt-in via props when behavior changes
- Document performance impact in PR description

**Common Areas:**
- Scroll event throttling
- Layout calculation caching
- Render cycle optimization
- Memory usage improvements
</change-type>

## 📖 Key Files Reference

### Primary Implementation
<file-reference>
| File | Focus Areas | Common Changes |
|------|-------------|----------------|
| `lib/BigList.jsx` | Event handlers, prop validation, lifecycle | onScroll logic, prop additions, state management |
| `lib/BigListProcessor.js` | Math calculations, layout logic | Height calculations, visible item computation, scrollToPosition |
| `lib/BigListItemRecycler.js` | Memory management, view reuse | Key mapping, recycling strategy, cleanup logic |
</file-reference>

### Documentation & API
<file-reference>
| File | Content Type | Update Triggers |
|------|--------------|-----------------|
| `docs/docs/props.md` | Prop documentation | New props, prop behavior changes |
| `docs/docs/methods.md` | Method documentation | New methods, signature changes |
| `__tests__/*.test.js` | Behavior validation | Any functional changes |
</file-reference>

## ✅ Quality Standards

### Code Style & Commit Standards
<standards>
**Commit Guidelines:**
- Keep changes small and focused (one behavior per PR)
- Write descriptive commit messages explaining the "why"
- Include test updates with behavioral changes
- Update documentation for public API changes

**Code Quality:**
- Follow existing code patterns and conventions
- Maintain consistency with current architecture
- Add TypeScript types for new functionality
- Include JSDoc comments for public methods

**Testing Requirements:**
- Unit tests for logic changes
- Integration tests for component behavior
- Performance tests for optimization changes
- Regression tests for bug fixes
</standards>

### Validation Checklist
<validation>
Before submitting changes:

- [ ] All tests pass (`yarn test`)
- [ ] Code follows project style (`yarn lint`, `yarn prettify`)
- [ ] Example app runs without errors (`cd example && expo start`)
- [ ] Documentation updated for API changes
- [ ] TypeScript definitions updated
- [ ] Backward compatibility maintained
- [ ] Performance impact assessed (if applicable)
</validation>

## 🔍 Common Implementation Patterns

### Scroll Position Calculations
<implementation-example>
**Pattern**: `BigListProcessor.scrollToPosition`
```javascript
// Always account for:
// 1. Header/content insets
// 2. Section headers (if sections mode)
// 3. Item positions and heights
// 4. Spacer components

const scrollPosition = headerHeight + sectionHeadersHeight + itemsHeight;
scrollView.scrollTo({ y: scrollPosition, animated: true });
```
</implementation-example>

### Height Calculations
<implementation-example>
**Pattern**: `BigList.getItemHeight` and `BigListProcessor.getItemHeight`
```javascript
// Handle both numeric and function forms:
const height = typeof itemHeight === 'function' 
  ? itemHeight(item, index) 
  : itemHeight;

// Always validate height is numeric
if (typeof height !== 'number' || height <= 0) {
  console.warn('Invalid item height:', height);
  return DEFAULT_ITEM_HEIGHT;
}
```
</implementation-example>

## 🆘 Troubleshooting Guide

### When You Get Stuck
<troubleshooting>
1. **Visual Bugs**: Run example app (`cd example && expo start`) to reproduce
2. **Logic Issues**: Add/update tests in `__tests__/` to encode expected behavior
3. **API Questions**: Check `docs/docs/props.md` and `docs/docs/methods.md`
4. **Performance Problems**: Profile with large datasets in example app
5. **Type Issues**: Update `lib/index.d.ts` alongside implementation changes
</troubleshooting>

### Common Issues & Solutions
<common-issues>
| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| Blank items appearing | Render performance | Optimize renderItem, check height calculations |
| Scroll position jumps | Height calculation errors | Validate height functions, check spacer math |
| Memory usage growing | Recycler not working | Check item key consistency, recycler mapping |
| TypeScript errors | Missing type definitions | Update `lib/index.d.ts` |
| Tests failing | Logic regression | Update tests to match new behavior |
</common-issues>

---

<footer>
**Remember**: This library prioritizes performance and stability. Always validate changes thoroughly and maintain backward compatibility unless explicitly requested otherwise.
</footer>
