import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const EmailVerificationSchema = new mongoose.Schema({
  email: String,
  emailToken: String,
  timestamp: Date,
});
