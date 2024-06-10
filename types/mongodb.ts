import { Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  thumbnail: string;
  gallery?: string[];
  projectCreated: Date;
  url?: string;
  urlLabel?: string;
}
