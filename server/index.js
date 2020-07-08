// import express from 'express';
// import http from 'http';
// import bodyParser from 'body-parser';
// import morgan from 'morgan';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// App setup



// Server setup
const port = process.env.PORT || 1732;
const server = http.createServer(app);
server.listen(port);

console.log("Server listening on: ", port);