require('dotenv').config();
const { PORT, API_VERSION } = process.env;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

// API routes
app.use(`/api/${API_VERSION}`, [
    require('./server/routes/adminRoute'),
]);

// Page not found
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});