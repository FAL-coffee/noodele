import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/";

const app = express();
app.set("view engine", "pug");
app.set("views", "./src/views");
console.log("starting up");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/", router);

// catch 404 and forward to error handler
app.use((_: Request, res: Response) => {
  res.render("error", {
    message: "error message",
    error: { status: "status404", stack: "stack" },
  });
});

// // catch 500 and forward to error handler
// app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
//   res.render("error", {
//     message: "error message",
//     error: { status: "status500", stack: error },
//   });
// });

export default app;
