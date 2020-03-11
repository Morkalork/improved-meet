const rp = require('request-promise');
const $ = require('cheerio');

const URL = 'https://tretton37.com/meet';

const scraper = () => {
  return new Promise((resolve, reject) => {
    rp(URL)
      .then(html => {
        const ninjas = [];
        $('.ninjas .ninja-summary', html).each((index, summary) => {
          const ninja = {
            id: index,
            name: $(summary)
              .find('.contact-info h1 a')
              .text(),
            imageUrl: $(summary)
              .find('> a img')
              .attr('src'),
            links: []
          };
          $(summary)
            .find('.contact-info .social-icons a')
            .each((_, link) => {
              ninja.links.push($(link).attr('href'));
            });
          ninjas.push(ninja);
        });
        resolve(ninjas);
      })
      .catch(e => {
        console.error('FAIL: ', e);
        reject(e);
      });
  });
};

module.exports = scraper;