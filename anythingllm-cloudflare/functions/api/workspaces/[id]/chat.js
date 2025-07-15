export async function onRequestPost(context) {
  try {
    const { request, params } = context;
    const { id } = params;
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Message is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Simple AI response simulation
    const responses = [
      "I understand your question about the documents in this workspace. Based on the content I've analyzed, here's what I can tell you...",
      "That's an interesting point. Let me search through the documents to provide you with relevant information...",
      "I found several references to that topic in the uploaded documents. Here's a summary...",
      "Based on the context from your documents, I can help you with that. Here's what I found...",
      "Let me analyze the documents in this workspace to give you the most accurate answer..."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    return new Response(JSON.stringify({
      success: true,
      message: randomResponse,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestGet(context) {
  try {
    const { request, params } = context;
    const { id } = params;
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    // Sample chat history
    const sampleMessages = [
      {
        id: 1,
        text: "Hello! How can I help you with your documents today?",
        sender: 'ai',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 2,
        text: "Can you summarize the main points from the uploaded documents?",
        sender: 'user',
        timestamp: new Date(Date.now() - 3300000).toISOString()
      },
      {
        id: 3,
        text: "Based on the documents in this workspace, here are the key points I've identified...",
        sender: 'ai',
        timestamp: new Date(Date.now() - 3000000).toISOString()
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      messages: sampleMessages
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}