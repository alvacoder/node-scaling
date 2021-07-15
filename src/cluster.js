const http = require('http');
const cluster = require('cluster');
const cpus = require('os').cpus();
const numCpus = cpus.length;

if(cluster.isMaster) {
    for(let i = 0; i < numCpus - 1; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log(`worker process ${process.pid} has died.`);
        console.log(`starting new worker.`);
        cluster.fork();
        console.log(`${Object.keys(cluster.workers).length} remaining.`);
    })
} else {
    console.log(`Started a worker at pid ${process.pid}`);
    http.createServer((req, res) => {
        const message = `Worker process ${process.pid}`;
        console.log(message);
        res.end(message);
        if(req.url === '/kill') {
            process.exit();
        } else if(req.url === '/') {
            console.log(`serving from ${process.pid}`);
        }
    }).listen(4000);
}