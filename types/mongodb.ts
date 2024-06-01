import { Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  thumbnails: string[];
  year: string;
  url?: string;
  urlLabel?: string;
}
