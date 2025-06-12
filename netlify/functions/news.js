// Netlify serverless function to proxy NewsAPI requests
exports.handler = async (event, context) => {
  // Extract limit parameter from query string, default to 10
  const { limit = 10 } = event.queryStringParameters || {};
  
  try {
    // Get the API key from environment variables
    const apiKey = process.env.NEWS_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Server configuration error: NEWS_API_KEY not set'
        }),
      };
    }
    
    // Construct the NewsAPI URL with the API key
    const apiUrl = `https://newsapi.org/v2/everything?q=health+korea&language=en&pageSize=${limit}&apiKey=${apiKey}`;
    
    // Fetch data from NewsAPI
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Return successful response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error in news function:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to fetch news data',
        message: error.message 
      }),
    };
  }
}; 