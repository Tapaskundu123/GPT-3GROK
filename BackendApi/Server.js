import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import GPT3Router from './src/Routes/GPT3.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
  'https://gpt-3-grok.vercel.app',
  'https://gpt-3-grok-9epxxicdl-tapaskundu123s-projects.vercel.app',
  'https://gpt-3-grok-git-main-tapaskundu123s-projects.vercel.app',
  'http://localhost:3000' // (optional) for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },// Adjust to your React app’s port
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.use('/api/GPT3', GPT3Router);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});