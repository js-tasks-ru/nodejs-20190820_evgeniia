const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');
const LimitExceededError = require('./LimitExceededError');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST': {
      if (pathname.indexOf('/') !== -1) { //(pathname.split('/').length > 1)
        res.statusCode = 400;
        res.end('No sub folders in path');
        return;
      }

      fs.exists(filepath, (exists) => {
        if (exists) {
          res.statusCode = 409;
          res.end('File already exists.');
          return;
        }

        const maxSize = 1024 * 1024;
        const lss = new LimitSizeStream({limit: maxSize});
        const ws = fs.createWriteStream(filepath);

        req
            .on('error', (err) => {
              if (fs.existsSync(filepath)) {
                fs.unlink(filepath, (err) => { res.end(); });
              }
              res.statusCode = 500;
              res.setHeader('Connection', 'close');
              res.write('Internal error');
            })
            .pipe(lss)
            .on('error', (err) => {
              if (err instanceof LimitExceededError) {
                if (fs.existsSync(filepath)) {
                  fs.unlink(filepath, (err) => { res.end(); });
                }
                res.statusCode = 413;
                res.setHeader('Connection', 'close');
                res.write('File too big.');
                res.end();
                return;
              }
            })
            .pipe(ws)
            .on('finish', () => {
              res.statusCode = 201;
              res.end('File saved');
            });
      });

      return;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
