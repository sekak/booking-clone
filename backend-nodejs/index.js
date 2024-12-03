import express, { json } from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Hotels from "./routes/hotels.js";
import Room from "./routes/rooms.js";
import Users from "./routes/users.js";
import Auth from "./routes/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'https://booking-clone-cmve.vercel.app/',
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO)
  .then((success) => console.log("mongodb is connect"))
  .catch((err) => console.log("There somthing wrong with mongodb", err));

app.use(cookieParser());

app.use("/api/hotel", Hotels);
app.use("/api/users", Users);
app.use("/api/auth", Auth);
app.use("/api/room", Room);


app.listen(8080, () => {
  console.log("server listenning on 8080 port");
});
