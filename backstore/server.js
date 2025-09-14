require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression'); 
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors'); 
const ApiError = require('./utils/apiError');
const globalErrorHandler = require('./Middleware/eroroMidelWare');
const dbConnection = require('./config/db');
const mountRoutes = require('./Routes/index');
const hpp = require('hpp');
//const path = require('path');
// Ensure models with virtual/populate refs are registered
require('./Models/ReviewUser/reviewUser');

// Connect to DB
dbConnection();

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); 
// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000,
  message:
    'Too many accounts created from this IP, please try again after an hour',
});
// Apply the rate limiting middleware to all requests
app.use('/api', limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
  hpp({
    whitelist: [
      'price',
      'sold',
      'quantity',
      'ratingsAverage',
      'ratingsQuantity',
    ],
  })
);

// Middlewares
app.use(express.json({ limit: '20kb' }));

app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  })
);

// Gère les requêtes preflight (OPTIONS)
app.options('*', cors());

// compress all responses
app.use(compression());

// Log requests in development mode
if (process.env.NODE_ENV=== 'development') {
  app.use(morgan('dev')); 
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
mountRoutes(app);

// Gestion des routes non trouvées:
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global Error Handling
app.use(globalErrorHandler);


// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
