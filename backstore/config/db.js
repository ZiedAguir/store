const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    // Use DATABASE_URL for production (Render) or MONGO_URI for local development
    const mongoUri = process.env.DATABASE_URL || process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('No database URL provided. Please set DATABASE_URL or MONGO_URI environment variable.');
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = dbConnection;
