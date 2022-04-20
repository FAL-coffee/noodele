import express from "express";
import * as userController from "../controllers/users";
const router = express.Router({ mergeParams: true });

router.get("/", userController.index);

export default router;
