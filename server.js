import express from "express";
import { Socket } from "socket.io";
import { Server } from "socket.io";

import http from 'http';
import cors from "cors";
import  connectUsingMongoose  from "./config.js";
import { chatModel } from "./chat.schema.js";

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

    client.on("join", (data) => {
        client.username = data;
    });

    client.on('new_message', (message) => {
        let userMessage = {
            username: client.username,
            message: message
        }

        //adding in db
        const newChat=new chatModel(
            {
                username:client.username,
                message:message,
                timestamp:new Date()
            }
        );
        newChat.save();

        client.broadcast.emit('broadcast_message', userMessage);
    })
    client.on('disconnect', () => {
        console.log('Connection is disconnected');
    });
});

server.listen(3000, () => {
    console.log(`Listening on port 3000`);

    connectUsingMongoose();
});