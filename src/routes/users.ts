import { Request, Response } from "express";
// var router = express.Router();

// export default router.get('/', (res:Response) => {
//   res.send('respond with a resource');
// });

/* GET users listing. */
export const index = (_: Request, res: Response) => {
  res.status(200).send("respond with a resource");
};
