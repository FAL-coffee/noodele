import { Request, Response } from "express";

export const index = async (_: Request, res: Response) => {
  res.render("account");
};

export const create = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.redirect("new");
};
