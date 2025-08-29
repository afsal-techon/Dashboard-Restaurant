import express from 'express';
import { getAPI, syncAccounts, syncAdmin, syncCategory, syncCombo, syncComboGroups, syncCustomer, syncCustomerTypes, syncFloors, syncFood, syncIngredients, syncKitchen, syncMenuType, syncNormalUser, syncOrders, syncPaymentRecord, syncRestaurnat, syncSupplier, syncTables, syncTransaction } from '../controller/syncCntrl/sync.js';
import multer from 'multer';
import path from 'path';


const router = express.Router();




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // store inside /uploads on online server
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // keep same filename as offline
  }
});


const upload = multer({ storage });


router.post("/upload", upload.single("file"), (req, res) => {
  res.json({ success: true, path: `/uploads/${req.file.filename}` });
});

router.post('/admin',syncAdmin);
router.get('/get',getAPI);
router.post('/restaurant',syncRestaurnat);
router.post('/customer-types',syncCustomerTypes);
router.post('/floors',syncFloors);
router.post('/tables',syncTables);
router.post('/kitchen',syncKitchen)
router.post('/normal-user',syncNormalUser)
router.post('/category',syncCategory);
router.post('/menu-type',syncMenuType)
router.post('/food',syncFood);
router.post('/combo',syncCombo);
router.post('/combo-group',syncComboGroups)
router.post('/customer',syncCustomer)
router.post('/orders',syncOrders);
router.post('/payment-record',syncPaymentRecord);
router.post('/transaction',syncTransaction);
router.post('/account',syncAccounts);
router.post('/supplier',syncSupplier)
router.post('/ingredient',syncIngredients)

export default router;