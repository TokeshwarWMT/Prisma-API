require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.use('/', require('./routes/userRoute'));

const port = 3000;

app.listen(port, () => {
  console.log(`Express Server is running on port ${port}`)
});