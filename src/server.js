/* eslint-disable for-direction */
// 'use strict'

/* Prerequisites - Node should be installed (LTS version recommended); For multiple Node versions 
   use nvm (Node Version Manager) and install using 'nvm install --lts'. You can switch versions using 'nvm use <version>' */
// See Node version using 'node -v'`
// npm install express-generator ---> Generates node application with express skeleton
// package.json was created by 'npm init'
// package.json should have "type: 'module'" for ES6 import to work or use 'require'
// Install eslint and execute for the first time using 'npx eslint --init'
// const express = require('express') ---> Not required if ES6; 'import' is better because 'require' imports on runtime unlike 'import' and (so) also static analysis is not possible
// Put semicolumn after your statement or JS will put it for you (Automatic Semicolon Injection) and that can cause unexpected problems

// TODO: Promises, async-await, CORS, fetch, mysql2

import express from 'express' // 'npm install --save-dev @types/express needed for intellisense (not sure for import);
// import * as fetch from 'node-fetch' // TODO: Use this somewhere
// import * as cache from 'node-cache' // TODO: Use this somewhere
import { Invariables } from './invariables.js' // import * as Inv from './invariables.js' ---> Imports everything into the namespace Inv
import * as middlewares from './middlewares.js';
import * as generic from './controllers/generic.js'
import * as algos from './controllers/algos.js'
import * as data from './controllers/data.js'

const exitTimeout = 20

const app = express();

registerUncaughtErrors();

useMiddlewares();

configureControllers();

app.listen(Invariables.PORT_NUMBER, Invariables.HOST_NAME, () => {
    console.log('Server started');
    throw new Error('Test');
});

function registerUncaughtErrors() {
    process.on('uncaughtException', (err) => {
        console.log('Uncaught exception occured. Error: ', err);
        setTimeout(() => process.exit(1), exitTimeout);
    }).on('unhandledRejection', (reason) => {
        console.log('Uncaught rejection encountered. Reason: ', reason);
    });
}

function useMiddlewares() {
    app.use(middlewares.parseJsonObjectsInRequestBody());
    app.use(middlewares.parseUrlEncodedDataInRequestBody());
    app.use(middlewares.compressResponseBody());
}

function configureControllers() {
    app.use('/api/generic', generic.router)
    app.use('/api/algos', algos.router);
    app.use('/api/data', data.router);
}



