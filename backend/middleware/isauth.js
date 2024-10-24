const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
require('dotenv').config();

exports.isauth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.authenticateSocket = (socket, next) => {
    const token = socket.handshake.auth.token; 

    if (!token) {
        return next(new Error('Authentication error'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Authentication error'));
        }

        socket.user = decoded;
        next();
    });
};
