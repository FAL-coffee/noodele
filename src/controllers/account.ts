import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  sendRegistorationMail,
  accountEmailVerify,
  IVerifyRequest,
} from "../services/account";
require("dotenv").config();

const env = process.env;
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
    res.render("error", {
      message: "error message",
      error: { status: "status", stack: error },
      retryURL: `${env.APP_URL}/account/new`,
    });
  }
};

export const verify = async (req: IVerifyRequest, res: Response) => {
  try {
    await accountEmailVerify(req);
    res.send(
      `<div>ユーザー本登録を完了しましたぁ！👍<br/>早速ログインしましょう <br/><a href="${env.APP_URL}/auth/topics">${env.APP_URL}/auth/topics</a></div>`
    );
  } catch (error) {
    res.render("error", {
      message: "error message",
      error: { status: "status", stack: error },
    });
  }
};
