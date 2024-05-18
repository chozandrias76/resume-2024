const {version, name} = require("./package.json");

module.exports = {
  experimental: {
    instrumentationHook: true
  },
  env: {
    version,
    name
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/2087677**',
      },
      {
        protocol: 'https',
        hostname: 'swensonhcp-resume-website.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'place-hold.it',
        port: '',
        pathname: '**',
      },
    ],
  },
}