const app = require('./api');

require('dotenv').config();

const port = process.env.PORT || 3300;

app.listen(port, () => {console.log(`Listening on http://localhost:${port}...`);});
