import express from 'express';
import { getAPI, syncAdmin } from '../controller/syncCntrl/sync.js';



const router = express.Router();

router.post('/admin',syncAdmin);
router.get('/get',getAPI)





export default router;