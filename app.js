const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hi');
})

app.listen(PORT, () => {
  console.log(`Application is being listened on port ${PORT}`);
})