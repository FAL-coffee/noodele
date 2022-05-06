import { check } from "express-validator";

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
