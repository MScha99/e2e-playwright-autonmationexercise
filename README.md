# Automation Exercise E2E Test Repository
This repository contains end-to-end Playwright tests for the Automation Exercise online ecommerce web application. The tests implement the test cases specified on the official Automation Exercise Test Cases page.  

https://www.automationexercise.com/test_cases


## Tech Stack & Dependencies
- Playwright: E2E testing framework
- TypeScript: Programming language
- Node.js: Runtime environment
- Page Object Model (POM): Design pattern for test organization
- Component Object Pattern: For reusable UI components

## CI Integration & Flakiness Monitoring  
- GitHub Actions: Every push and pull request triggers this suite via GitHub Actions.  
- Flakiness Testing: Each test has been run 400 times locally to detect and eliminate intermittent failures. 

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
   - Prefer user-facing attributes selectors whenever possible (most realistic) 
   - Use test-id attributes when needed   
   - Fallback to CSS/XPath when necessary

2. **Test Independence**
   - Each test is self-contained
   - Setup/teardown using beforeEach/afterEach
   - Clean state between tests


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
   - Smart handling of dynamic content

2. **Rich Assertions**
   - Detailed assertion messages
   - State verification

3. **Cross-browser Testing**
   - Tests run on multiple browsers
   - Consistent behavior across browsers

4. **Performance Optimization**
   - Parallel test execution
   - Reused browser contexts
   - Efficient resource handling

