import express, { Response } from 'express'
var router = express.Router();

/* GET users listing. */
export default router.get('/', (res:Response) => {
  res.send('respond with a resource');
});

