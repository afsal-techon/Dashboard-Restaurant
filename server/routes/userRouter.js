import express from 'express';
import { syncAdmin } from '../controller/syncCntrl/sync.js';



const router = express.Router();

router.post('/admin',syncAdmin)





export default router;