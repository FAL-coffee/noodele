import { Request } from "express";
import { check } from "express-validator";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
require("dotenv").config();

const env = process.env;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "Gmail",
  secure: true,
  auth: {
    user: env.FROM_EMAIL_ADDRESS,
    pass: env.FROM_EMAIL_PASSWORD,
  },
});

export const validations = [
  check("name").not().isEmpty().withMessage("この項目は必須入力です。"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("この項目は必須入力です。")
    .isEmail()
    .withMessage("有効なメールアドレス形式で指定してください。"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("この項目は必須入力です。")
    .isLength({ min: 8, max: 25 })
    .withMessage("8文字から25文字にしてください。"),
];

export const sendRegistorationMail = async (req: Request) => {
  try {
    const { name, email, password } = req.body;
    const targetColumns = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!!targetColumns)
      throw Error("すでに登録されているメールアドレスです。");

    const user = await prisma.user.create({
      data: {
        ...{ name, email },
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
      },
    });
    if (!user)
      throw Error(
        "ユーザー情報の作成に失敗しました。入力を再度よく確認してください。"
      );
    const hash = crypto.createHash("sha1").update(user.email).digest("hex");
    const now = new Date();
    const expiration = now.setHours(now.getHours() + 1);
    let verificationUrl =
      req.get("origin") +
      "/account/verify/" +
      user.id +
      "/" +
      hash +
      "?expires=" +
      expiration;
    const signature = crypto
      .createHmac("sha256", env.CRYPT_KEY ? env.CRYPT_KEY : "")
      .update(verificationUrl)
      .digest("hex");
    verificationUrl += "&signature=" + signature;

    // 本登録メールを送信
    transporter.sendMail({
      from: env.FROM_EMAIL_ADDRESS,
      to: user.email,
      text:
        "以下のURLをクリックして本登録を完了させてください。\n\n" +
        verificationUrl,
      subject: "本登録メール",
    });
  } catch (error) {
    throw error;
  }
};

export interface IVerifyRequest extends Request {
  query: { expires: string; signature: string };
}

export const accountEmailVerify = async (req: IVerifyRequest) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw Error("このURLは正しくありません。");
    else if (!!user.emailVarifiedAt) return;
    else {
      const now = new Date();
      const hash = crypto.createHash("sha1").update(user.email).digest("hex");
      const isCorrectHash = hash === req.params.hash;
      const isExpired = now.getTime() > parseInt(req.query.expires);
      const verificationUrl =
        env.APP_URL + req.originalUrl.split("&signature=")[0];
      const signature = crypto
        .createHmac("sha256", env.CRYPT_KEY ? env.CRYPT_KEY : "")
        .update(verificationUrl)
        .digest("hex");
      const isCorrectSignature = signature === req.query.signature;
      if (!isCorrectHash || !isCorrectSignature || isExpired)
        throw new Error("このURLは期限切れか、正しくありません。");
      else {
        await prisma.user.update({
          where: { id: userId },
          data: { emailVarifiedAt: new Date() },
        });
      }
    }
  } catch (error) {
    throw error;
  }
};
