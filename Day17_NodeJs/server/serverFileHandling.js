const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Secure HTTPS Server');
}).listen(8443, () => {
    console.log('HTTPS Server running on https://localhost:8443');
});