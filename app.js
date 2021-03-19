require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { APP_PORT } = require('./config');
const auth = require('./middlewares/auth');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const PORT = APP_PORT;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.use(/\/$/, auth);
app.use('/', routes);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
