var createError = require("http-errors");
// import { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
// import express from 'express
// import { Pool } from "pg";
// import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { PrismaClient } from "@prisma/client";
import * as usersRouter from "./routes/users";

const app = express();
const prisma = new PrismaClient();
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
app.use(express.static("public"));

const allowed = async (authorization: string): Promise<Boolean> => {
  if (!authorization || !authorization.startsWith("Basic")) {
    return false;
  }
  // const allowedUsers = await prisma.user.findMany();

  const encodeeData = authorization.substring(6);
  const decodedData = Buffer.from(encodeeData, "base64").toString();
  const colonIndex = decodedData.indexOf(":");
  const username = decodedData.slice(0, colonIndex);
  const password = decodedData.substring(colonIndex + 1);
  const targetUser = await prisma.user.findUnique({
    where: { name: username },
  });
  // console.log(targetUser);
  // if (!!allowedUsers.find((user)=>{!!user}) && allowedUsers[username] === password) {
  if (!!targetUser && targetUser.password === password) {
    return true;
  } else {
    return false;
  }
};

app.use("/*", async (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === "/") {
    next();
  } else {
    const authorization: string = req.headers["authorization"] || "";
    if (await allowed(authorization)) {
      next();
    } else {
      // res.setHeader('WWW-Authenticate', 'Basic realm="tutorial"');
      res.setHeader("WWW-Authenticate", "Basic");
      next(createError(401));
    }
  }
});

// app.use('/', indexRouter);
app.use("/users", (_: Request, __: Response, next: NextFunction) => {
  next();
});
app.get("/users", usersRouter.index);
app.post("/users/new", usersRouter.create);
app.post("/users/delete/:id", usersRouter.deletion);
// app.put("/users/update/:id", usersRouter.update);
app.post("/users/update/:id", usersRouter.update);

app.get("/", async (_: Request, res: Response) => {
  res.redirect("/users");
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
