import express from "express";
import * as indexController from "../controllers/index";
import accountRouter from "./account";

const router = express.Router();
router.get("/", indexController.index);
router.use("/account", accountRouter);

export default router;
