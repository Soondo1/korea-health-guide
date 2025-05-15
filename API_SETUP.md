# Setting Up API Keys for Real-Time Data

This project uses real-time data from external APIs. To get it working properly, you'll need to set up the following API keys:

## 1. News API (for Korean health news)

1. Visit [NewsAPI.org](https://newsapi.org/register) and create a free account
2. After registration, you'll get an API key
3. Create a `.env` file in the project root (if it doesn't exist)
4. Add your News API key to the `.env` file:
   ```
   VITE_NEWS_API_KEY=your_newsapi_key_here
   ```

## 2. Sanity API Token (for blog posts and content)

1. Visit [Sanity Manage](https://www.sanity.io/manage) and select your project (k-are1)
2. Navigate to the "API" tab
3. Under "Tokens", click "Create new token"
4. Give it a name (e.g., "Development" or "Production")
5. Select appropriate permissions (typically "Read" for frontend apps, "Write" if needed)
6. Click "Create token"
7. Copy the generated token value
8. Add it to your `.env` file:
   ```
   VITE_SANITY_API_TOKEN=your_sanity_token_here
   ```

## Important Notes

- Never commit your `.env` file to version control
- The development server must be restarted after adding API keys
- If you're using the project in development mode with `npm run dev`, the environment variables will be automatically loaded from your `.env` file
- In production, you'll need to set these environment variables in your hosting platform (e.g., Vercel, Netlify, etc.) 