require('dotenv').config();
const { PORT, API_VERSION, HOSTNAME } = process.env;
const express = require('express');
const app = express();

app.use(express.static('../frontend/public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));


// API routes
app.use('/api/'+API_VERSION, [
    require('./server/routes/adminRoute'),
]);


app.get('/',(req, res) => {
    res.send("Website is under construction!");
});
// Page not found
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running on port ${PORT}`);
});