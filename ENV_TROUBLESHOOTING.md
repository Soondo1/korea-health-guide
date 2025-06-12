# Environment Variables Troubleshooting Guide

This guide will help you resolve issues with environment variables in the Korea Health Guide application.

## Quick Fix

Run the following command to automatically create a `.env` file with default values:

```bash
npm run create-env
```

## Manual Setup

1. Create a file named `.env` in the root of your project (same level as package.json)
2. Add the following content:

```
# Sanity CMS Configuration
VITE_SANITY_PROJECT_ID=4zq6kq5m
VITE_SANITY_DATASET=k-are1
VITE_SANITY_API_VERSION=2023-05-03
VITE_SANITY_API_TOKEN=your_token_here

# News API Configuration
VITE_NEWS_API_KEY=your_news_api_key

# Environment (development, production, staging)
VITE_ENVIRONMENT=development
```

3. Replace `your_token_here` and `your_news_api_key` with your actual API tokens if you have them
4. Save the file and restart your development server

## Common Issues

### Environment Variables Not Loading

If your environment variables aren't being loaded by Vite, check the following:

1. **File Location**: The `.env` file must be in the project root directory, not in a subdirectory
2. **File Name**: The file must be named exactly `.env` (including the dot)
3. **Variable Format**: 
   - Variables must start with `VITE_` to be exposed to the client-side code
   - No spaces around equals sign (`VITE_VAR=value`, not `VITE_VAR = value`)
   - No quotes around values (use `VITE_VAR=value`, not `VITE_VAR="value"`)
   - No trailing spaces
4. **Restart Required**: After creating or modifying the `.env` file, restart your development server

### Sanity Configuration Issues

If you're seeing errors related to Sanity (like "Configuration must contain 'projectId'"), ensure:

1. The `.env` file includes the correct Sanity configuration variables
2. You're using the provided project ID (`4zq6kq5m`) and dataset (`k-are1`)
3. If you want to use your own Sanity project, update both the project ID and dataset name

### Environment Variables in Production

For production deployments (e.g., on Netlify):

1. Add the same environment variables in your hosting platform's dashboard
2. For Netlify, go to Site Settings → Environment Variables
3. Add each variable individually
4. Redeploy your site

## Debugging

The application includes built-in debugging tools that will:

1. Check if environment variables are properly loaded
2. Show which specific variables are missing
3. Provide guidance on how to fix issues

These debuggers run automatically in development mode and output to the browser console.

## Still Having Issues?

If you've followed all these steps and are still experiencing problems:

1. Check your browser console for specific error messages
2. Try clearing your browser cache and hard reloading the page
3. Verify that your `.env` file doesn't have any hidden characters or encoding issues
4. If using a custom Sanity project, verify that your API token has the correct permissions 