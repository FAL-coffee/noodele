import express from "express";
import * as userController from "../controllers/users";
const router = express.Router({ mergeParams: true });

router.get("/", userController.index);
router.post("/delete/:id", userController.remove);
router.post("/update/:id", userController.update);

export default router;
