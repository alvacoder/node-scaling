const { fork } = require('child_process');

const processes = [
    fork('./src/app', ['4000']),
    fork('./src/app', ['4001']),
    fork('./src/app', ['4002']),
    fork('./src/app', ['4003'])
]

console.log(`Forked ${processes.length} processes`);