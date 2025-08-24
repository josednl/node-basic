const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 8080;

const server = http.createServer(async (req, res) => {
	let filePath = '';

	if (req.url === '/' || req.url === '/index') {
		filePath = './index.html';
	} else if (req.url === '/about') {
		filePath = './about.html';
	} else if (req.url === '/contact-me') {
		filePath = './contact-me.html';
	} else {
		filePath = './404.html';
	}

	try {
		const data = await fs.readFile(path.resolve(__dirname, filePath));
		const statusCode = filePath === './404.html' ? 404 : 200;
		res.writeHead(statusCode, { 'content-type': 'text/html' });
		res.end(data);
	} catch (error) {
		res.writeHead(500, { 'content-type': 'text/plain' });
		res.end('500 - Internal Server Error');
	}
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
