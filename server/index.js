const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// CORS configuration (Apply early)
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://synaps-client.vercel.app"], // Allow localhost and production domain
  credentials: true // Allow credentials like cookies, authorization headers, etc.
}));

// Body parsing and file upload configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Serve static files
app.use('/uploads', express.static(__dirname + '/uploads'));

// Route handlers
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// MongoDB connection
connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });
