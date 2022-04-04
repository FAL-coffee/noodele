// var createError = require('http-errors');
// import { HttpError } from "http-errors";
import express, { Request, Response } from "express";
// import express from 'express'
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import * as usersRouter from "./routes/users";

const app = express();

// view engine setupts

app.set("views", path.join(__dirname, "views/"));
app.set("views", "/src/views");
app.set("view engine", "jade");
console.log("starting up");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/users", usersRouter.index);

// catch 404 and forward to error handler
app.use((_: Request, res: Response) => {
  res.send("404 error");
  res.render("error");
});

export default app;
