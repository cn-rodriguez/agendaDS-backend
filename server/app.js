require("dotenv").config();

const Server = require("./models/server");

const server = new Server();
server.listen();
// const express = require("express");

// const PORT = process.env.PORT || 3001;

// const app = express();

// app.get("/api", (req, res) => {
//   res.json({
//     message: "Hello from server!",
//   });
// });

// app.get("/history", (req, res) => {
//   res.json({
//     id1: {
//       Date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
//       Time: `${new Date().getHours()}:${new Date().getMinutes()}`,
//       Teacher: "John Doe",
//       Status: "Canceled",
//     },
//     id2: {
//       Date: `${
//         new Date().getDate() + 1
//       }/${new Date().getMonth()}/${new Date().getFullYear()}`,
//       Time: `${new Date().getHours()}:${new Date().getMinutes()}`,
//       Teacher: "John Doe",
//       Status: "Canceled",
//     },
//     id3: {
//       Date: `${
//         new Date().getDate() + 2
//       }/${new Date().getMonth()}/${new Date().getFullYear()}`,
//       Time: `${new Date().getHours() + 3}:${new Date().getMinutes()}`,
//       Teacher: "John Doe",
//       Status: "Pending",
//     },
//   });
// });

// app.get("/meetings", (req, res) => {
//   res.json({
//     meetings: [
//       {
//         title: "Docente: @Romina Gonzales",
//         date: "2022-12-08",
//       },
//       {
//         title: "Docente: @Jose Perez",
//         date: "2022-12-25",
//       },
//       {
//         title: "Docente: @Jorge Penca",
//         date: "2023-09-11",
//       },
//       {
//         title: "Docente: @Lilia Romero",
//         date: "2022-12-31",
//       },
//     ],
//   });
// });

// app.listen(PORT, () => {
//   console.log("Server listening on port " + PORT);
// });
