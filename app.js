const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = 3000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Application is being listened on port ${PORT}`);
})