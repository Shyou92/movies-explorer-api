require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  APP_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = require('./config');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const PORT = APP_PORT;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
