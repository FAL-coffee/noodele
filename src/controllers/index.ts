import { Request, Response } from "express";
import * as services from "../services/index";

export const index = async (req: Request, res: Response) => {
  console.log(req);
  console.log(res);
  const users = await services.getUserList();
  res.render("users", { title: "users", items: users });
};
