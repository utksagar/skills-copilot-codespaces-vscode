// create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = [];

http.createServer((req, res) => {
    const {pathname, query} = url.parse(req.url, true);
    if (pathname === '/' || pathname === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname === '/comments') {
        if (req.method === 'GET') {
            res.end(JSON.stringify(comments));
        } else if (req.method === 'POST') {
            let str = '';
            req.on('data', data => {
                str += data;
            });
            req.on('end', () => {
                const comment = JSON.parse(str);
                comment.dateTime = new Date();
                comments.push(comment);
                res.end(JSON.stringify(comment));
            });
        }
    } else {
        res.end('404 Not Found');
    }
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});