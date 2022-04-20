import express from "express";
import * as userController from "../controllers/users";
const router = express.Router({ mergeParams: true });

router.get("/", userController.index);
router.post("/delete/:id", userController.index);
router.post("/update/:id", userController.index);

export default router;
