// findBeacon.js file
// Workerdata.path contains ts file path from js file is provided in worker file 
const path = require('path');
const { workerData } = require('worker_threads');
require('ts-node').register();
require(path.resolve(__dirname, workerData.path));