// import express, { Request, Response } from "express";
import express from "express";
const router = express.Router({ mergeParams: true });

router.get("/", () => {
  console.log("catch");
});

export default router;
