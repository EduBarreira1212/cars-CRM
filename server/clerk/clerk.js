import { createClerkClient } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const clerkSecretkey = process.env.CLERK_SECRET_KEY;

const clerkClient = createClerkClient({ secretKey: clerkSecretkey });

export default clerkClient;