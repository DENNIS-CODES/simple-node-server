const http = require('http');
const url = require('url');
const fs = require('fs');


http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    if(q.path === "/"){
        fs.readFile('index.html', (err, data) => {
            if (err) throw new Error("Error");
            res.writeHead(200, {"Content-Type": 'text/html'});
            res.write(data);
            return res.end();
        })
    }
    else {
        fullpath = '.' + q.path + '.html';
        fs.readFile(fullpath, (err, data) => {
            if (err){
                return fs.readFile('404.html', (err, data) => {
                    if (err) throw err;
                    res.writeHead(404, {"Content-Type": 'text/html'});
                    res.write(data);
                    return res.end();
                })
            }
            res.writeHead(200, {"Content-Type": 'text/html'});
            res.write(data);
            return res.end();
        })
    }

}).listen(8080);