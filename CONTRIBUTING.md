# Contributing to Cybernetic Navigator

First off, thank you for considering contributing to Cybernetic Navigator! It's people like you that make this project such a great tool.

## 🌟 Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. By participating, you are expected to uphold this standard. Please be respectful, inclusive, and constructive in all interactions.

## 🤔 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots or GIFs** if applicable
- **Include your environment details:**
  - OS and version
  - Node.js version
  - Browser and version
  - Any relevant error messages from the console

**Template for Bug Reports:**
```markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots.

## Environment
- OS: [e.g., Windows 11, macOS 13.0]
- Node.js: [e.g., v18.0.0]
- Browser: [e.g., Chrome 120]
```

### Suggesting Features

Feature suggestions are welcome! Before creating a feature request:

- **Check if the feature has already been requested**
- **Provide a clear use case** for the feature
- **Explain how it fits** with the cyberpunk aesthetic and AI focus

**Template for Feature Requests:**
```markdown
## Feature Description
A clear description of the feature.

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed Implementation
How do you envision this feature working?

## Alternatives Considered
What other solutions have you considered?

## Additional Context
Any other context, mockups, or examples.
```

### Contributing Code

We love pull requests! Here's how to contribute code:

#### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Cybernetic-Navigator.git
   cd Cybernetic-Navigator
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Set up your environment:**
   - Create a `.env.local` file
   - Add your `API_KEY=your_gemini_api_key`

6. **Start the development server:**
   ```bash
   npm run dev
   ```

#### Development Guidelines

**Code Style:**
- Use **TypeScript** for all new code
- Follow the existing code structure and naming conventions
- Use **functional components** with React hooks
- Maintain the **cyberpunk aesthetic** in any UI changes
- Write **clear, descriptive variable names**
- Add **comments** for complex logic

**Component Guidelines:**
- Keep components **focused and single-purpose**
- Use **TypeScript interfaces** for props
- Implement **proper error handling**
- Ensure components are **responsive**
- Maintain **accessibility** standards

**Styling:**
- Use **CSS variables** for theming (see existing `--primary-color`, etc.)
- Maintain the **cyberpunk aesthetic** (neon colors, glow effects, dark backgrounds)
- Ensure **responsive design** works on various screen sizes
- Test theme changes with the AI theme generator

**State Management:**
- Use **React hooks** (`useState`, `useEffect`, `useCallback`, `useRef`)
- Implement **localStorage** for data persistence when appropriate
- Keep state **as local as possible** to components
- Use **proper TypeScript types** for state

**API Integration:**
- All AI features should use the **geminiService.ts**
- Handle **API errors gracefully** with user-friendly messages
- Support both **environment variable** and **session API keys**
- Test with and without API keys configured

#### Testing Your Changes

Before submitting a pull request:

1. **Build the project:**
   ```bash
   npm run build
   ```
   Ensure there are no TypeScript errors or build failures.

2. **Test all features:**
   - Test your new feature/fix thoroughly
   - Test with different API key configurations
   - Test theme generation with various inputs
   - Verify data persistence (bookmarks, history, settings)
   - Test responsive behavior on different screen sizes

3. **Test browser compatibility:**
   - Chrome/Edge (primary)
   - Firefox
   - Safari (if possible)

4. **Check the console:**
   - No errors or warnings in the browser console
   - No TypeScript errors

#### Committing Your Changes

**Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add keyboard shortcuts for panel navigation

Added Ctrl+1-6 shortcuts to quickly switch between panels.
Improves user experience for power users.

Closes #123
```

```
fix: prevent duplicate bookmarks

Added validation to check if URL already exists before adding
to bookmarks. This prevents the same URL from being bookmarked
multiple times.

Fixes #456
```

#### Submitting a Pull Request

1. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub:
   - Use a clear and descriptive title
   - Fill out the PR template completely
   - Link any related issues
   - Add screenshots for UI changes
   - Describe what you changed and why

3. **PR Review Process:**
   - A maintainer will review your PR
   - Address any requested changes
   - Keep the PR updated with the main branch if needed
   - Once approved, your PR will be merged!

**Pull Request Template:**
```markdown
## Description
A clear description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Fixes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots
If applicable, add screenshots.

## Testing
How has this been tested?
- [ ] Development server
- [ ] Production build
- [ ] Multiple browsers
- [ ] Different API key configurations

## Checklist
- [ ] Code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented complex code
- [ ] My changes generate no new warnings
- [ ] I have tested my changes thoroughly
- [ ] UI changes maintain the cyberpunk aesthetic
```

### Documentation

Documentation improvements are always appreciated:

- Fix typos or clarify existing documentation
- Add examples and use cases
- Improve code comments
- Create tutorials or guides
- Add JSDoc comments to functions and components

## 📋 Project-Specific Guidelines

### Cyberpunk Aesthetic
- Maintain the neon glow theme
- Use dark backgrounds with bright accents
- Prefer futuristic terminology in UI text
- Keep animations smooth and cyber-themed

### AI Integration
- Always provide fallback behavior when AI is unavailable
- Handle API errors gracefully
- Show loading states for AI operations
- Test with various AI response scenarios

### Performance
- Keep bundle size reasonable
- Optimize images and assets
- Use lazy loading where appropriate
- Minimize re-renders with proper React patterns

### Accessibility
- Maintain keyboard navigation
- Ensure sufficient color contrast (even with neon colors)
- Add appropriate ARIA labels
- Test with screen readers when possible

## 🎯 Good First Issues

Look for issues labeled `good-first-issue` - these are great starting points for new contributors!

## 💬 Questions?

- Open a GitHub issue for technical questions
- Tag questions with the `question` label

## 🙏 Thank You!

Your contributions make Cybernetic Navigator better for everyone. We appreciate your time and effort!

---

**Happy Contributing! 🚀🎨**
