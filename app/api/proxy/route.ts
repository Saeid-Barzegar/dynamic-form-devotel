
export async function GET(request: Request) {
  // Extract the URL from query parameters
  const { searchParams } = new URL(request.url);
  // Create the api uri
  const endpoint = searchParams.get('url'); 
  // Validate the endpoint
  if (!endpoint || typeof endpoint !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Forward the request to the external API
    const apiResponse = await fetch(endpoint);

    // Check if the API response is OK
    if (!apiResponse.ok) {
      throw new Error(`API request failed with status ${apiResponse.status}`);
    }

    // Parse the API response and return it
    const data = await apiResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}