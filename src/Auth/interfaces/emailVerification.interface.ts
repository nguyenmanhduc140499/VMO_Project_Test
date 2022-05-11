import { Document } from 'mongoose';
export interface EmailVerification extends Document {
  email: string;
  emailTocken: string;
  timestamp: Date;
}
