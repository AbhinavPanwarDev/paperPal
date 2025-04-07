// Check required environment variables
const requiredEnvVars = [
  'KINDE_CLIENT_ID',
  'KINDE_CLIENT_SECRET',
  'KINDE_ISSUER_URL',
  'KINDE_SITE_URL',
  'KINDE_POST_LOGOUT_REDIRECT_URL',
  'KINDE_POST_LOGIN_REDIRECT_URL',
  'DATABASE_URL',
  'UPLOADTHING_SECRET',
  'UPLOADTHING_APP_ID',
  'PINECONE_API_KEY',
  'OPENAI_API_KEY',
];

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  console.error(
    `Error: The following environment variables are missing: ${missingEnvVars.join(
      ', '
    )}`
  );
  process.exit(1);
}

console.log('All required environment variables are present.');
process.exit(0); 