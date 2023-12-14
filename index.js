const express = require('express');
require('dotenv').config()
const file = require('./Model/file')
const FileRouter = require('./Route/file')
const app = express();
const showRouter = require('./Route/show');
const downRouter = require('./Route/download');

app.use(express.json());

file.connectDb();

const port = process.env.PORT || 3000;

// app.use('/api',FileRouter);
app.use('/files',showRouter);
app.use('/files',downRouter);
app.use('/api',FileRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
