const path = require('path');
const express = require('express');
require('dotenv').config()
const app = express();

const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port 'http://localhost:${port}!`);
});
