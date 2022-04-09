import { Request, Response } from "express";
// var router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// export default router.get('/', (res:Response) => {
//   res.send('respond with a resource');
// });

/* GET users listing. */
export const index = (_: Request, res: Response) => {
  res.status(200).send("respond with a resource");
};

export const create = async (req: Request, res: Response) => {
  // console.log(req.body);
  await prisma.user.create({ data: req.body });
  // const users = await prisma.user.findMany();
  // res.render("index", { title: "home", items: users });
  res.redirect("/");
};
