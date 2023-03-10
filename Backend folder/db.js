const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connectDB };
