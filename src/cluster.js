const http = require('http');
const cluster = require('cluster');
const cpus = require('os').cpus();
const numCpus = cpus.length;

if(cluster.isMaster) {
    for(let i = 0; i < numCpus - 3; i++) {
        cluster.fork()
    }
} else {
    http.createServer((req, res) => {
        const message = `Worker process ${process.pid}`;
        console.log(message);
        res.end(message);
    }).listen(4000);
}