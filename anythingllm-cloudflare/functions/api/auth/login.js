export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email and password are required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // For demo purposes, using a simple hardcoded user
    // In production, this would query your D1 database
    const validUser = {
      id: 1,
      email: 'admin@example.com',
      password: 'admin123', // In production, this would be hashed
      name: 'Admin User',
      role: 'admin'
    };

    if (email === validUser.email && password === validUser.password) {
      // Generate a simple JWT token (in production, use a proper JWT library)
      const token = btoa(JSON.stringify({
        userId: validUser.id,
        email: validUser.email,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }));

      return new Response(JSON.stringify({
        success: true,
        token: token,
        user: {
          id: validUser.id,
          email: validUser.email,
          name: validUser.name,
          role: validUser.role
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid credentials'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}