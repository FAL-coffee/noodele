import { Request, Response } from "express";
// var router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// export default router.get('/', (res:Response) => {
//   res.send('respond with a resource');
// });

/* GET users listing. */
export const index = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.render("users", { title: "users", items: users });
};

export const create = async (req: Request, res: Response) => {
  // console.log(req.body);
  const { name, password } = req.body;
  await prisma.user.create({ data: { name, password } });
  // const users = await prisma.user.findMany();
  // res.render("index", { title: "home", items: users });
  res.redirect("/users");
};

export const deletion = async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: req.params?.id } });
  res.redirect("/users");
};

export const update = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, password } = req.body;
  await prisma.user.update({
    where: { id: req.params?.id },
    data: { name, password },
  });
  res.redirect("/users");
};
