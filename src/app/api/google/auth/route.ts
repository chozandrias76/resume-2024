import { google } from 'googleapis';

const { YOUTUBE_CLIENT_ID: clientId, YOUTUBE_CLIENT_SECRET: clientSecret, YOUTUBE_REDIRECT_URI: redirectUri } = process.env;

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

export async function GET() {
  const scopes = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.force-ssl"
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  return Response.redirect(authUrl);
}
