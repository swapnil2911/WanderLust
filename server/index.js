import dotenv from 'dotenv';
dotenv.config();
const CONNECTION_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from "./routes/user.js";
import profileRoutes from "./routes/profile.js";
import accountRoutes from "./routes/account.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))	
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', function (req, res, next) {
  req.secret = SECRET;
  next();
}, postRoutes);

app.use('/profile', function (req, res, next) {
  req.secret = SECRET;
  next();
}, profileRoutes);

app.use("/user", function (req, res, next) {
  req.secret = SECRET;
  next();
}, userRoutes);

app.use("/account", function (req, res, next) {
  req.secret = SECRET;
  next();
}, accountRoutes);

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);