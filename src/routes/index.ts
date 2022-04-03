// import express, { Request, Response, NextFunction } from 'express'
import express, { Response } from 'express'
const router = express.Router();

/* GET home page. */
export default router.get('/', (res:Response) => {
// router.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.render('index', { title: 'Express' });
});

