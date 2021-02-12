const app = require('./api');

const port = 3300;
const hostname = '127.0.0.1'

app.listen(port, hostname, () => {console.log(`Listening on http://${hostname}:${port}...`);});
