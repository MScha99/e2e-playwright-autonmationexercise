# Automation Exercise E2E Test Repository

## Tech Stack & Dependencies
- Playwright: E2E testing framework
- TypeScript: Programming language
- Node.js: Runtime environment
- Page Object Model (POM): Design pattern for test organization
- Component Object Pattern: For reusable UI components

## Architecture Overview

### Directory Structure
```
├── components/           # Reusable UI components
├── config/              # Test configuration and data
├── pages/              # Page Object Models
├── tests/              # Test specifications
│   ├── auth/           # Authentication tests
│   ├── shopping-flow/  # E-commerce flow tests
│   └── other-content-verification/ # Other UI tests
└── utils/              # Utility functions
```

### Design Patterns
1. **Page Object Model (POM)**
   - Each page has its own class
   - Encapsulates page elements and actions
   - Located in `pages/` directory

2. **Component Pattern**
   - Reusable UI components (header, footer, modals)
   - Shared across multiple pages
   - Located in `components/` directory

3. **Test Data Management**
   - Centralized test data in `config/test_data.ts`
   - Environment configuration in `config/playwright.config.ts`

## Testing Patterns & Conventions

### Test Organization
- Tests grouped by functionality
- Clear test descriptions using test.describe()
- Step-by-step test execution with test.step()

### Best Practices
1. **Element Locators**
   - Prefer data-qa attributes when available
   - Use role-based selectors for accessibility
   - Fallback to CSS/XPath when necessary

2. **Test Independence**
   - Each test is self-contained
   - Setup/teardown using beforeEach/afterEach
   - Clean state between tests

3. **Error Handling**
   - Explicit timeouts and wait strategies
   - Clear error messages
   - Proper assertion messages

## Setup & Execution Instructions

### Prerequisites
- Node.js 14+
- npm/yarn

### Installation
```bash
npm install
```

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npx playwright test [testfile]

# Run with UI
npx playwright test --ui

# Run with specific browser
npx playwright test --project=chromium
```

### Test Reports
- HTML reports in `playwright-report/`
- Traces for failed tests
- Screenshots on failure

## Playwright Best Practices Implementation

1. **Automatic Wait Strategies**
   - Using proper expect conditions
   - Explicit waits when needed
   - Smart handling of dynamic content

2. **Rich Assertions**
   - Detailed assertion messages
   - Visual comparison when needed
   - State verification

3. **Cross-browser Testing**
   - Tests run on multiple browsers
   - Browser-specific configuration
   - Consistent behavior across browsers

4. **Performance Optimization**
   - Parallel test execution
   - Reused browser contexts
   - Efficient resource handling