const http = require('http');

const server = http.createServer((req,res) =>{
    res.end('voici la réponse du serveur !');
});

server.listen(process.env.PORT || 3000);