import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import { IProject } from '../../types/mongodb';

const portfolioProjectSchema = new mongoose.Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  gallery: { type: [String], required: false },
  projectCreated: { type: Date, required: true },
  url: { type: String, required: false },
  urlLabel: { type: String, required: false },
});

// Check if the model already exists before defining it
const PortfolioProject = mongoose.models.PortfolioProject || mongoose.model('PortfolioProject', portfolioProjectSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const projects = await PortfolioProject
          .find({})
          .sort({ projectCreated: -1 });
        res.status(200).json({ success: true, projects });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Method not supported' });
      break;
  }
}
