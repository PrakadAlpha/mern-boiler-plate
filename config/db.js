const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(`Mongo db connected on ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;