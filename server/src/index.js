const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const userRoutes= require('./routes/userRoutes.js')
const taskRoutes= require('./routes/taskRoutes.js')
const { verifyToken } = require('./middleware/authMiddleware.js');


dotenv.config();

const app = express();

connectDB();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
  }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRoutes)
app.use('/api/',verifyToken,taskRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));