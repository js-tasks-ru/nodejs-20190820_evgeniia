const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      if (pathname.indexOf('/') !== -1) {
        res.statusCode = 400;
        res.end('No sub folders in path');
        return;
      }
      if (!fs.existsSync(filepath)) {
        res.statusCode = 404;
        res.end('File not found');
        return;
      }

      filepath = path.normalize(filepath);
      fs.stat(filepath, function(err, stats) {
        if (err || !stats.isFile()) {
          res.statusCode = 404;
          res.end('Not found');
          return;
        }
        else if (stats.isFile()) {
          let contentType = mime.lookup(filepath);
          res.setHeader('Content-Type', contentType);
          let file = fs.createReadStream(filepath);
          file.on('open', function() {
            res.statusCode = 200;
            file.pipe(res);
          })
          file.on('error', function(err) {
            console.log('error', err);
            res.writeHead(403);
            res.write('file missing');
            res.end();
          })
        }
      });
    break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
