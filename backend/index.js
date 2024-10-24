const express = require('express');
const { createServer } = require("http");
const authRoutes = require('./routes/userroutes');
const countryroutes = require('./routes/countryroute');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const cors = require('cors');
const { realdata } = require('./models/Livetimedata');
const { getRandomValue } = require('./utils/random');
const {authenticateSocket} = require('./middleware/isauth')
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? 'https://yourfrontenddomain.com' : '*',
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
});

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://yourfrontenddomain.com' : '*',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());



app.use('/api/data', countryroutes);
app.use('/api/auth', authRoutes);

const generateRandomData = () => {
    return realdata.map(country => ({
        country: country.country,
        annual_gdp: getRandomValue(15000000, 30000000),
        population: Math.floor(getRandomValue(500000000, 1500000000)),
        unemployment_rate: getRandomValue(0, 20),
        education_expenditure_as_percent_of_gdp: getRandomValue(0, 15), 
    }));
};


io.use(authenticateSocket);

io.on('connection', (socket) => {
    if (!socket.user) {
        console.error('Unauthenticated user tried to connect');
        socket.disconnect();
        return;
    }
    // console.log('A user connected:', socket.user);
    const interval = setInterval(() => {
        try {
            socket.emit('realdata', generateRandomData());
        } catch (error) {
            console.error('Error emitting data:', error);
        }
    }, 3000);

    socket.on('disconnect', () => {
        clearInterval(interval);
        // console.log('User disconnected:', socket.user);
    });
});

mongoose.connect(process.env.MONGODB_PATH).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
