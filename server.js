var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

function contentType(p) {
  switch (path.extname(p)) {
    case '.css': return 'text/css';
    case '.html': return 'text/html';
    case '.js': return 'text/javascript';
    default: return '';
  }
}

var server = http.createServer(function (req, res) {
  var urlPath = url.parse(req.url).path;
  if (urlPath === '/') {
    urlPath = '/gooey.html';
  }
  fs.readFile(path.join(process.cwd(), urlPath), function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Content-Type', contentType(urlPath));
      res.end(data);
    }
  });
});

server.listen(3000);