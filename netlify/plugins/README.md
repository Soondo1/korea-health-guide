# Vite Build Plugin for Netlify

This custom Netlify build plugin helps ensure smooth Vite builds by:

1. Checking for required environment variables and providing defaults if missing
2. Ensuring Vite is available in the build environment
3. Providing helpful logging during the build process

## How it works

The plugin runs during the `onPreBuild` phase of Netlify's build process and:

- Checks for required Sanity CMS environment variables
- Verifies that Vite is installed and available
- Installs Vite if it's not already available

## Configuration

The plugin is configured in the `netlify.toml` file:

```toml
[[plugins]]
  package = "./netlify/plugins"
```

## Files

- `index.js` - The main plugin code
- `manifest.yml` - Plugin manifest required by Netlify
- `README.md` - This documentation file 