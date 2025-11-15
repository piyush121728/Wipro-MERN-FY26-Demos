// here we will create a simple http based backend server using nodejs based on following steps

// Importing ../index.js
const msg = require('./msg.js');

// Importing fs module for file handling
const fs = require('fs');

// Importing url module for url handling
const url = require('url');

//Step 1: Creating http constant
const http = require('http')



//Step 2: creating Http server
const server = http.createServer((req, res) => {
    // Set header type

    if(req.url === "/favicon.ico"){
        return res.end();
    }

    // Creating a "log.txt" file and log the timing of every request
    const log = `New request received -> Date : ${Date.now()}, method : ${req.method}, url : ${req.url}\n`;

    const myUrl = url.parse(req.url,true);
    // console.log(myUrl); // Return Url object

    fs.appendFile('log.txt',log,()=>{
        switch(myUrl.pathname){
            case "/":
                res.end("Homepage");
                break;
            case "/about":
                res.end("About");
                break;
            case "/contact":
                res.end("Contact");
                // res.end(`Hii, ${myUrl.query.myname}`);
                break;
            default:
                res.end("404: Page not found");
                break;
        }
    })

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send response
    // res.end(msg.resMsg);
    
});

//Step 3: starting the server @3000 port
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`${msg.consMsg} http://localhost:${PORT}`);
});

//Step 4: running the server
//node server.js


// Task 1: create a file "log.txt" and log the timing of every request