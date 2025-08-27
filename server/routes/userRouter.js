import express from 'express';
import { getAPI, syncAdmin, syncCategory, syncCustomerTypes, syncFloors, syncKitchen, syncNormalUser, syncRestaurnat, syncTables } from '../controller/syncCntrl/sync.js';



const router = express.Router();

router.post('/admin',syncAdmin);
router.get('/get',getAPI);
router.post('/restaurant',syncRestaurnat);
router.post('/customer-types',syncCustomerTypes);
router.post('/floors',syncFloors);
router.post('/tables',syncTables);
router.post('/kitchen',syncKitchen)
router.post('/normal-user',syncNormalUser)
router.post('/category',syncCategory)



export default router;