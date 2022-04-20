import express from "express";
import * as indexController from "../controllers/index";
import userRouter from "./users";
import accountRouter from "./account";
import authRouter from "./auth";

const router = express.Router();

router.get("/", indexController.index);
router.use("/users", userRouter);
router.use("/account", accountRouter);
router.use("/auth", authRouter);

export default router;
