# Password Generator Assignment

## Project Overview

This project implements a Password Generator component as required by the Neo4j Design System team's UI challenge.

## Technical Challenges & Assumptions

### React & Needle Compatibility

I encountered compatibility issues between the latest React version and the Needle design system, particularly with `react-dom` dependencies. I resolved this by:

- Using a compatible React version that works with Needle
- Implementing workarounds for certain component integrations
- Maintaining proper typing despite version conflicts

### Component Structure

I used BEM methodology for CSS organization in both the Password Generator and the custom Slider components:

- Class naming follows the `block__element--modifier` pattern
- Styles are scoped to their respective components
- Common variables are extracted to maintain consistency

### Password Generation Edge Cases

I handled several important edge cases:

1. **All Unchecked Checkboxes**: When users deselect all character type options, the password consists only of numbers. I implemented a toast notification (using Needle's toast component) to warn users about generating potentially vulnerable passwords.

2. **Minimum Length Requirements**: Passwords below 8 characters trigger vulnerability warnings.

3. **Character Set Inclusion**: The generator ensures at least one character from each selected set appears in the final password.

### Custom Slider Implementation

Per requirements, I built the slider from scratch instead of using Needle's component:

- Full keyboard navigation support (arrow keys, home/end)
- Mouse dragging and track click positioning
- ARIA attributes for accessibility
- Visual states for different interactions
- Proper event handling to update only on explicit user actions

### Challenges

Implementation Challenge with TextInput rightElement
The Actual Challenge:

- Attempt to use the rightElement prop of the Needle TextInput component to add the copy button functionality
- This prop is designed to allow adding elements to the right side of an input field
- Despite trying multiple approaches (Fragment, cloneElement, ReactElement), couldn't get the [useCopyToClipboard](https://needle.neo4j.design/?path=/docs/hooks-usecopytoclipboard--usecopytoclipboard) to work properly in the rightElement.

## Development Approach

- Started with the custom Slider component to ensure it worked properly
- Implemented core password generation logic with proper character set handling
- Integrated Needle components where appropriate
- Added edge case handling and user feedback
- Wrote tests for components and utility functions

## Technical Decisions

### State Management

I used React's built-in hooks for state management:

- useState for tracking password options
- useCallback for optimizing event handlers
- useRef to avoid unnecessary re-renders

### Testing Strategy

- Used Jest and React Testing Library
- Focused on component behavior rather than implementation details
- Mocked external dependencies for isolated testing
- Verified key user interactions work as expected

I'm looking forward to discussing my implementation in more detail during the interview.
Below are the setup instructions for running the project and the code quality tools used.

---

## Setup Instructions

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`
4. Run tests with `npm test`

## Code Quality Tools

This project uses:

- **ESLint** for static code analysis
- **Prettier** for code formatting

### Available Scripts

- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check if files are properly formatted

### Editor Integration

For the best development experience, please install ESLint and Prettier extensions in your editor.

## Technology Stack

- React
- TypeScript
- Neo4j's Needle component library
