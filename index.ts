import express  from "express";
import {createServer} from "node:http"
import { Server } from "socket.io";
import path from "node:path"

const main=()=>{
    const app= express()
    app.use(express.static(path.resolve("./public")))
    const server= createServer(app)
    const io  = new Server(server)

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("chat message", (data) => {
            io.emit("chat message", data);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    server.listen(9000,()=>{
        console.log(`server is running on port 9000`)
    })
}

main()