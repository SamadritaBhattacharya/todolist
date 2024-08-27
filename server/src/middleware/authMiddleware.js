const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

const verifyToken = asyncHandler(
    async (req,res, next) => {
        let token;

        try {
            token = req.cookies.jwt;
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();            
            
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
            
        }

        if (!token) {
            res.status(401);
            throw new Error('Not authorized, Please login');
        }

    }
);

module.exports = { verifyToken };
