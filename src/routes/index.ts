import { Router } from "express";
import peopleRouter from './people';
const router = Router();
router.get('/', (req, res) => res.send('Ok'));
router.use('/people', peopleRouter);
export default router;