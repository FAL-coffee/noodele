import { Request, Response } from "express";

export const index = async (_: Request, res: Response) => {
  res.render("index");
};
