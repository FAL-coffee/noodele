import express, { Request, Response } from "express";
// import express from "express";
const router = express.Router({ mergeParams: true });

router.get("/", (_: Request, res: Response) => {
  res.send("ログイン成功！");
});

export default router;
