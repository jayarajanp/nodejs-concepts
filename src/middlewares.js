import compression from 'compression';
import * as express from 'express'

export function parseJsonObjectsInRequestBody() {
    return express.json();
}

export function parseUrlEncodedDataInRequestBody() {
    return express.urlencoded({ extended: true });
}

export function compressResponseBody() {
    return compression()
}

export function trackIncomingRequest() {
    return (req, res, next) => {
        const reqStart = Date.now();
        
        const cleanup = () => {
            // Ensure no hanging listeners exist regardless of which code path is taken.
            res.removeListener('finish', logFinish);
            res.removeListener('close', logAbort);
            res.removeListener('error', logError);
        };

        const constructIncomingRequestLog = (message, error) => {
            let log;

            const requestLog = `In-Request: '${req.method} ${req.originalUrl} ${JSON.stringify(req.params)}'.`;
            const responseLog = `In-Response: { StatusCode: ${res.statusCode}, StatusMessage: ${res.statusMessage}, ResponseLength: ${res.get('Content-Length') || 'N/A'} bits }.`;

            log = `${message}\n\t\t${requestLog}\n\t\t${responseLog}`;

            if (error) {
                const errorLog = `In-Error: ${error}`;
                log += `\n\t\t${errorLog}`;
            }

            const requestTimeTaken = `In-TimeTaken: ${Date.now() - reqStart}ms.`;
            log += `\n\t\t${requestTimeTaken}`;

            const requester = `In-Requester: \n\t\t{ \n\t\t  UserAgent: ${req.header('user-agent')},\n\t\t  Referer: ${req.header('referer')},\n\t\t  IP: ${req.ip} \n\t\t}.`;
            log += `\n\t\t${requester}`;

            return log;
        };

        const logFinish = () => {
            cleanup();
            console.log(constructIncomingRequestLog('Incoming request completed.'));
        };

        const logAbort = () => {
            cleanup();
            console.log(constructIncomingRequestLog('Incoming request aborted.'));
        };

        const logError = (error) => {
            cleanup();
            console.log(constructIncomingRequestLog('Incoming request failed.', error));
        };

        res.on('finish', logFinish); // successful pipeline (success or graceful failure)
        res.on('close', logAbort); // aborted pipeline (ungraceful failure)
        res.on('error', logError); // pipeline internal error

        next();
    };
}

export function addAccessControlHeaders() {
    return (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Methods', 'POST, GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.setHeader('Access-Control-Max-Age', 6000); // for 10minutes

        if (req.method === 'OPTIONS') {
            res.end();
        } else {
            next();
        }
    };
}