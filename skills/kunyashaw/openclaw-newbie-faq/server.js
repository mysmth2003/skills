const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.OPENCLAW_SKILL_PORT || 34567;
const SKILL_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.openclaw', 'workspace', 'skills', 'openclaw-newbie-faq');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(SKILL_DIR, 'web', req.url === '/' ? 'index.html' : req.url);
  
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1>');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`OpenCLAW 新手帮帮忙 Web 服务已启动`);
  console.log(`访问地址: http://localhost:${PORT}`);
  console.log(`按 Ctrl+C 停止服务`);
});
