import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

const allowed = async (authorization: string): Promise<Boolean> => {
  if (!authorization || !authorization.startsWith("Basic")) {
    return false;
  }

  const encodeeData = authorization.substring(6);
  const decodedData = Buffer.from(encodeeData, "base64").toString();
  const colonIndex = decodedData.indexOf(":");
  const username = decodedData.slice(0, colonIndex);
  const password = decodedData.substring(colonIndex + 1);
  const targetUser = await prisma.user.findUnique({
    where: { email: username },
  });
  if (!!targetUser && targetUser.password === password) {
    return true;
  } else {
    return false;
  }
};

router.use("/*", async (req: Request, res: Response, next: NextFunction) => {
  const authorization: string = req.headers["authorization"] || "";
  if (await allowed(authorization)) {
    next();
  } else {
    res.setHeader("WWW-Authenticate", "Basic");
    next(createError(401));
  }
});

router.use("/topics", () => {});
export default router;
