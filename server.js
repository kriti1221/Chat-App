import express from "express";
import { Socket } from "socket.io";
import { Server } from "socket.io";

import http from 'http';
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', client => {
    console.log("Connection is established");
    client.on('disconnect', () => {
        console.log('Connection is disconnected');
    });
});

server.listen(3000, () => {
    console.log(`Listening on port 3000`);
});