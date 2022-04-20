import { Request, Response } from "express";
import * as services from "../services/users";

export const index = async (_: Request, res: Response) => {
  try {
    const users = await services.getUserList();
    res.render("users", { title: "users", items: users });
  } catch (error) {
    res.render("error", {
      message: "error message",
      error: { status: "status", stack: error },
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const tarId = req.params.id;
    await services.removeUserById(tarId);
    res.redirect("users");
  } catch (error) {
    res.render("error", {
      message: "error message",
      error: { status: "status", stack: error },
    });
  }
};
