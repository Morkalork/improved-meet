const path = require('path');
const express = require('express');
const scrape = require('./scrape');

const app = express();

let ninjas = null;

module.exports = () => {
  scrape().then(result => {
    ninjas = result;

    app.use(express.static(path.resolve(__dirname, '../../public')));

    app.get('/ninja/all', (req, res) => {
      res.json(ninjas);
    });

    app.get('/ninja/:id', (req, res) => {
      res.json(ninjas.find(ninja => ninja.id === parseInt(req.params.id)));
    });

    app.listen(1337, () =>
      console.log('Server running on http://localhost:1337')
    );
  });
};
