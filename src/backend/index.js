const scrape = require('./scrape');
const server = require('./server');

switch (process.argv[2]) {
  case 'scrape':
    scrape().then(result => console.log(result));
  default:
    server();
}
