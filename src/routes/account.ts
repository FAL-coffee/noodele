import express from "express";
import * as accountController from "../controllers/account";
import { validations } from "../services/account";
const router = express.Router({ mergeParams: true });

router.get("/new", accountController.index);
router.post("/new", validations, accountController.create);
router.get("/verify/:id/:hash", accountController.verify);

export default router;
