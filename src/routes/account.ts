import express from "express";
import * as accountController from "../controllers/account";
const router = express.Router({ mergeParams: true });

router.get("/new", accountController.index);
router.post("/new", accountController.create);

export default router;
