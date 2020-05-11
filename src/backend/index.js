const path = require('path');
const express = require('express');
const addAllRoutes = require('./routes');

const app = express();

// set up static files router
const options = {
    setHeaders: (res, path, stat) => { // eslint-disable-line no-shadow
        res.set('x-timestamp', Date.now());
    },
};
const staticFiles = express.static(path.join(__dirname, '..', '..', 'build'), options);
app.use(staticFiles);

addAllRoutes(app);

const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port 'http://localhost:${port}!`);
});
