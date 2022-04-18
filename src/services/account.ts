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
  secure: true, // SSL
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
  // .custom((_, { req }) => {
  //   if (req.body.password !== req.body.passwordConfirmation) {
  //     throw new Error("パスワード（確認）と一致しません。");
  //   }
  //   return true;
  // }),
];

export const sendRegistorationMail = async (req: Request) => {
  try {
    const { name, email, password } = req.body;
    const targetColumns = await prisma.user.findUnique({
      where: { email: email },
    });
    if (targetColumns?.emailVarifiedAt) {
      throw new Error("すでに登録されているメールアドレスです。");
    }

    await prisma.user.create({
      data: {
        ...{ name, email },
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
      },
    });
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) throw new Error("500");
    const hash = crypto.createHash("sha1").update(email).digest("hex");
    const now = new Date();
    const expiration = now.setHours(now.getHours() + 1); // 1時間だけ有効
    let verificationUrl =
      req.get("origin") +
      "/verify/" +
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
      to: "neighbor.fal@gmail.com",
      text:
        "以下のURLをクリックして本登録を完了させてください。\n\n" +
        verificationUrl,
      subject: "本登録メール",
    });
  } catch (error) {
    throw error;
  }
};
