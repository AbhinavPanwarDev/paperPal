import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = async () => {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: 'us-east-1',
  });

  return pinecone;
}