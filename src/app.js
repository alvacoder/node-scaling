const http = require("http");
const port = parseInt(process.argv[2] || '4000');

const options = [
    "go for it",
    "sleep on it",
    "take your time",
    "sky is your limit"
]

const server = http.createServer((req, res) => {
    const randomIndex = Math.floor(Math.random() * options.length)
    const payload = JSON.stringify({
        port,
        processID: process.pid,
        advise: options[randomIndex]
    })

    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(payload);
})

server.listen(port);
console.log(`Advise running on port ${port}`);