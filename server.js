const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Middleware to check the API key
app.use(cors());
app.use(express.json());

// Check API key
const API_KEY = process.env.API_KEY;
app.use((req, res, next) => {
  const apiKey = req.header('api-key');
  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
  next();
});

// Game data
const gamesData = {
  game1: {
    imageUrl: 'https://k4.games/games/farm-2048/thumb_2.png',
    gameUrl: 'https://k4.games/games/farm-2048/',
    gameFolder: '/static/game1',
  },
  game2: {
    imageUrl: 'https://k4.games/games/2048-unblocked/thumb_2.png',
    gameUrl: 'https://k4.games/games/2048-unblocked/',
    gameFolder: '/static/game2',
  },
  game3: {
    imageUrl: 'https://k4.games/games/gift-unlock/thumb_2.png',
    gameUrl: 'https://k4.games/games/gift-unlock/',
    gameFolder: '/static/game3',
  },
};

// Fetch data for a game
app.get('/data/:game', (req, res) => {
  const game = req.params.game;
  if (gamesData[game]) {
    res.json(gamesData[game]);
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

// Serve static files (images, game folders)
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
