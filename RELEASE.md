# Release Process

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) to automate versioning and CHANGELOG generation via GitHub Actions.

## Prerequisites

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- Commit message format: `<type>(<scope>): <subject>`
  - **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
  - **Example**: `feat(tabs): add URL-driven navigation support`

## Automated Release Process

Both the package and documentation site have **fully automated** changelog generation and publishing via GitHub Actions.

### React-Fluid-Tabs Package

**Trigger:** Push changes to `react-fluid-tabs/` folder on `main` branch

**What happens automatically:**
1. GitHub Actions runs `standard-version` to:
   - Analyze commits since last release
   - Bump version in `react-fluid-tabs/package.json`
   - Generate changelog entries in `react-fluid-tabs/CHANGELOG.md`
   - Create git commit and tag
2. Builds the package
3. Publishes to npm registry
4. Pushes changelog updates back to repository

### Documentation Site

**Trigger:** Push changes to `docs/` folder on `main` branch

**What happens automatically:**
1. GitHub Actions runs `standard-version` to update `docs/CHANGELOG.md` and `docs/package.json`
2. Changes are committed and pushed automatically
3. Docs are built and deployed to GitHub Pages

## How to Release

Simply push your changes to the appropriate folder on the `main` branch:

```bash
# For package changes
git add react-fluid-tabs/
git commit -m "feat(tabs): add new feature"
git push origin main

# For docs changes
git add docs/
git commit -m "docs: update API reference"
git push origin main
```

GitHub Actions will automatically handle versioning, changelog generation, and publishing.

## Commit Message Examples

```bash
# Features (minor version bump)
git commit -m "feat(tabs): add swipe gesture support"
git commit -m "feat(buttons): add indicator customization"

# Bug fixes (patch version bump)
git commit -m "fix(navigation): resolve browser back button issue"
git commit -m "fix(animation): prevent transition on initial load"

# Breaking changes (major version bump)
git commit -m "feat(tabs)!: redesign API for better flexibility

BREAKING CHANGE: The tabs prop structure has changed"

# Other commits (no version bump)
git commit -m "docs: update README with new examples"
git commit -m "chore: update dependencies"
```

## Configuration

The release process is configured in `.versionrc.json`:
- Only bumps version in `react-fluid-tabs/package.json`
- Updates `react-fluid-tabs/CHANGELOG.md`
- Skips automatic commit/tag (handled by npm scripts)
