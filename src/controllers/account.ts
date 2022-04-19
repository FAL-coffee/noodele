import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  sendRegistorationMail,
  accountEmailVerify,
  IVerifyRequest,
} from "../services/account";

export const index = async (_: Request, res: Response) => {
  res.render("account");
};

export const create = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }
    await sendRegistorationMail(req);
    res.status(200).json({ message: "send complate" });
  } catch (error) {
    throw error;
  }
};

export const verify = async (req: IVerifyRequest, res: Response) => {
  try {
    await accountEmailVerify(req);
    res.send("完了！");
  } catch (error) {
    throw error;
  }
};
