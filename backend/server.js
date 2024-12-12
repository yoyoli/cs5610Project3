const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // upload .env

const statusRoutes = require('./apis/status');
const userRoutes = require('./apis/user');

const app = express();

// MongoDB connect
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydatabase';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/status', statusRoutes);
app.use('/api/users', userRoutes);

const frontendDir = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDir));

// get request
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDir, 'index.html'));
});

// 404
app.use((req, res, next) => {
    res.status(404).send('Endpoint not found');
});

// error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
