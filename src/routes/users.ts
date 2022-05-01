import express, { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { UserController } from "../controllers/UserController";
import { UpdateUserByIdData } from "../services/users";
const router = express.Router({ mergeParams: true });
const userController = new UserController();

type DeleteParams = {
  userId: string;
};

type UpdateParams = {
  userId: string;
};

router.get("/", async (_: Request, res: Response) => {
  const { status, data, message } = await userController.list();
  if (status === 200) {
    res.render("users", { title: "users", items: data });
  } else if (status === 500) {
    res.render("error", {
      message: message,
      error: { status, stack: message },
    });
  }
});

router.post(
  "/delete/:id",
  async (req: Request<DeleteParams>, res: Response) => {
    const { status, message } = await userController.delete(req.params.userId);
    if (status === 200) {
      res.redirect("/");
    } else if (status === 500) {
      res.render("error", {
        message: message,
        error: { status, stack: message },
      });
    }
  }
);

router.post(
  "/update/:id",
  async (
    req: Request<UpdateParams, any, UpdateUserByIdData>,
    res: Response
  ) => {
    const userId = req.params.userId;
    const data = req.body;
    const { status, message } = await userController.update({ userId, data });
    if (status === 200) {
      res.redirect("/");
    } else if (status === 500) {
      res.render("error", {
        message: message,
        error: { status, stack: message },
      });
    }
  }
);

export default router;
