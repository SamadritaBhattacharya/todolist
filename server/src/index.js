const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express();

connectDB();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
  }));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));