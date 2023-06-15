const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const fetch = require("node-fetch");

// if (cluster.isMaster) {
//  console.log(`Master ${process.pid} is running`);

//  // Fork workers.
//  for (let i = 0; i < numCPUs; i++) {
//   cluster.fork();
//  }

//  cluster.on('exit', (worker, code, signal) => {
//   console.log(`worker ${worker.process.pid} died`);
//  });
// } else {
//  // Workers can share any TCP connection
//  // In this case it is an HTTP server
//  http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('hello world\n');
//  }).listen(8000);

//  console.log(`Worker ${process.pid} started`);
// }

// var { exec } = require('child_process');
// var child = exec('ls -al');
// console.log(child);
// child.stdout.pipe(process.stdout)
// child.stdin.pipe(process.stdout)
// child.stdout.pipe(console.log)
// child.stdout.pipe(process.stdin)

// const response = fetch('https://server.com/user/1')
//  .then(response => response.json())
//  .then(json => json)

// console.log('a', response.name)


function synRandomNum() { return Math.random().toString().slice(2,3); }


async function ayncRandomNum() { return Math.random().toString().slice(2,3); }

function timeoutRandomNum() { 
     return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(Math.random().toString().slice(2,3));
            }, 0);
        })
    }
    // http.createServer(function(req, res) {
    //      for(var i=0; i<10e7; i++) {
    //        var num = synRandomNum();
    //        res.write(num);
    //      }
    //      res.end();
    //     }).listen(8000);

    // http.createServer(async function(req, res) {
    //     for(var i=0; i<10e7; i++) {
    //         var num = await ayncRandomNum();
    //         res.write(num);
    //     }
    //     res.end();
    // }).listen(8000);

    // http.createServer(function(req, res) {
    //      for(var i=0; i<10e7; i++) {
    //        setImmediate(function() {
    //          res.write(syncRandomNum());
    //        })
    //      }
    //      res.end();
    //     }).listen(8000);

        // http.createServer(async function(req, res) {
        //     for(var i=0; i<10e7; i++) {
        //         var val = await timeoutRandomNum();
        //         res.write(val);
        //     }
        //     res.end();
        // }).listen(8000);
        
        setImmediate(() => {
            console.log(1)
        }, 100);

        process.nextTick(() => {
            console.log('111');
        }, 8000);

        http.createServer()