// var createError = require('http-errors');
// import { HttpError } from "http-errors";
import express, { Request, Response } from "express";
// import express from 'express
import { Pool } from "pg";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import * as usersRouter from "./routes/users";

const app = express();

// view engine setupts

app.set("view engine", "pug");
// app.set("/views", path.join(__dirname, "../views"));
app.set("views", "./src/views");
// app.set("view engine", "jade");
console.log("starting up");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// PostgreSQLの設定
const pool = new Pool({
  user: "postgres",
  host: "postgres",
  database: "postgres_db",
  password: "password",
  port: 5432,
});

app.get("/users", usersRouter.index);

app.get("/", async (_: Request, res: Response) => {
  const { rows } = await pool.query("select * from users");
  res.send(rows);
});

// catch 404 and forward to error handler
app.use((_: Request, res: Response) => {
  // res.send("404 error");
  // とりあえずrenderを試すために404でやったけど、404 (req,res,next)でerror.jadeを返すのは不適切っぽい
  // -> 500 (err,req,res,next)のerr:Errorをres.render(error, err)するべきかと思われ
  res.render("error", {
    message: "error message",
    error: { status: "status", stack: "stack" },
  });
});

export default app;
