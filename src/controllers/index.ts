import { Request, Response } from "express";
import * as services from "../services/index";

export const index = async (_: Request, res: Response) => {
  const users = await services.getUserList();
  res.render("users", { title: "users", items: users });
};
