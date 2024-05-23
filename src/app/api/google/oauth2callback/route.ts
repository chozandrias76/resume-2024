import { google } from 'googleapis';

const { YOUTUBE_CLIENT_ID: clientId, YOUTUBE_CLIENT_SECRET: clientSecret, YOUTUBE_REDIRECT_URI: redirectUri } = process.env;

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return Response.json({ error: "Missing code parameter" }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store tokens securely
    // You can store tokens in a database or environment variables
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);

    return new Response('Authentication successful! You can close this tab.', { status: 200 });
  } catch (error) {
    console.error("Error getting tokens:", error);
    return new Response('Authentication failed', { status: 500 });
  }
}