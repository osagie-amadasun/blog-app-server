const express = require('express');
const error = require('./middleware/error');
const commentsRouter = require('./routes/commentsRouter');
const usersRouter = require('./routes/usersRouter');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);



// Routes
app.get('/', (req, res) => {
    res.send('Testing Comments API');
});

// Error Handling Middleware
app.use(error);

const port = 5000;
// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});