import express, { Request, Response } from "express";
import userRouter from "./users";
import accountRouter from "./account";
import authRouter from "./auth";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.render("index");
});

router.use("/users", userRouter);
router.use("/account", accountRouter);
router.use("/auth", authRouter);

export default router;
