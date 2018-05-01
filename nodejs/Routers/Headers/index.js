const express = require('express');
const HeadersRouter = express.Router();

HeadersRouter.use((request, response, next) => {
    try {
        response.set({
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            Vary: 'Origin',
            'Content-Type': 'application/json',
        });
    } catch (e) {
        console.log('This error here:', e);
    }
    console.log(`${request.method} ${request.url} ${JSON.stringify(request.body) || 'No request body'}`);
    next();
});
HeadersRouter.use((request, response, next) => {
    if (request.method === 'OPTIONS') {
        try {
            response.set({
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'content-type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Max-Age': '3600',
                'Allow': 'PATCH, PUT, DELETE, TRACE, HEAD, GET, POST, OPTIONS',
            });
        } catch (e) {
            console.log('This error here (2):', e);
        }
        response.sendStatus(200);
    }
    next();
});

exports.HeadersRouter = HeadersRouter;
