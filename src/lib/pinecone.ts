import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = () => {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  return pinecone;
}