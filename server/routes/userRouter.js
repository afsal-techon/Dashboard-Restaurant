import express from 'express';
import { deletePartnerSync, getAPI, syncAccounts, syncAdmin, syncCategory, syncCombo, syncComboGroups, syncCustomer, syncCustomerTypes, syncDividend, syncExpnese, syncFloors, syncFood, syncIngredients, syncKitchen, syncMenuType, syncNormalUser, syncOrders, syncPartner, syncPaymentRecord, syncPurchase, syncRestaurnat, syncRider, syncSupplier, syncTables, syncTransaction } from '../controller/syncCntrl/sync.js';
import multer from 'multer';
import path from 'path';
import { LoginUser } from '../controller/User/userAuth.js';
import { VerifyToken} from '../middleware/jwt.js'
import { getAccounts, getAllCustomerTypes, getAllRestaurant, getDividendSharingReport, getLatestCompletedOrders, getOrderSummary, getPaymentOverview, getQuickViewDashboard, getSalesOverview, getSuppliers, getTopSellingItems } from '../controller/DashbaordCntrl/dashboard.js';
import { categorySalesExcel, customerTypeWiseSalesExcel, DailySalesExcel, generateCategorySalesPDF, generateCustomerTypeWisePDF, generateDailySalesPDF, generateItemWiseSalesPDF, getCategoryWiseSalesReport, getCustomerTypeWiseSalesReport, getDailySalesReport, getItemWiseSalesReport, itemWiseSalesExcel } from '../controller/ReportContrls/Sales.js';
import { generateCancelledOrdersPDF, generateOrderSummaryPDF, getALLOrderSummary, getCancelledOrders, getCancelledOrdersExcel, getSingleOrder, orderSummaryExcel } from '../controller/ReportContrls/Order.js';
import { dailyCollectionExcel, dailyTransactionExcel, generateDailyCollectionPDF, generatePaymentSummaryPDF, getDailyCollectionReport, getDailyTransactionPDF, getDailyTransactionReport, getPaymentSummary, paymentSummaryExcel } from '../controller/ReportContrls/Payment.js';
import { expenseReportExcel, generateExpenseReportPDF, generatePurchaseReportPDF, getExpenseReport, getPurchaseReport, purchaseReportExcel } from '../controller/ReportContrls/Purchase.js';
import { getProfitAndLossReport, profitAndLossExcel, profitandLossPdf } from '../controller/ReportContrls/ProfitLoss.js';


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

//syncing routes
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
router.post('/ingredient',syncIngredients);
router.post('/purchase',syncPurchase);
router.post('/expense',syncExpnese);
router.post('/rider',syncRider);
router.post('/partner',syncPartner);
router.post('/dividend',syncDividend);



//Login
router.post('/login',LoginUser);


//dashboard
router.get('/dashboard/quick-view/:fromDate/:toDate',VerifyToken,getQuickViewDashboard);
router.get('/dashboard/sales-overview/:fromDate/:toDate',VerifyToken,getSalesOverview );
router.get('/dashboard/payment-overview/:fromDate/:toDate',VerifyToken,getPaymentOverview );
router.get('/dashboard/order-summary',VerifyToken,getOrderSummary );
router.get('/dashboard/top-selling',VerifyToken,getTopSellingItems );
router.get('/dashboard/latest-orders',VerifyToken,getLatestCompletedOrders );
router.get('/dividend',VerifyToken,getDividendSharingReport);

router.get('/get-restaurants',VerifyToken, getAllRestaurant);


//sales Report routes 

router.get('/reports/daily-sale',VerifyToken,getDailySalesReport);
router.get('/reports/category-sale',VerifyToken,getCategoryWiseSalesReport);
router.get('/reports/item-sale',VerifyToken,getItemWiseSalesReport);
router.get('/reports/customerType-sale',VerifyToken,getCustomerTypeWiseSalesReport);
router.get('/daily-sale/pdf',VerifyToken,generateDailySalesPDF);
router.get('/category-sale/pdf',VerifyToken,generateCategorySalesPDF);
router.get('/item-sale/pdf',VerifyToken,generateItemWiseSalesPDF);
router.get('/expense/pdf',VerifyToken,generateExpenseReportPDF)
router.get('/customertype-sale/pdf',VerifyToken,generateCustomerTypeWisePDF)
//excel
router.get('/category-sales/excel',VerifyToken,categorySalesExcel)
router.get('/Daily-sales/excel',VerifyToken,DailySalesExcel)
router.get('/item-sales/excel',VerifyToken,itemWiseSalesExcel)
router.get('/customertypes/excel',VerifyToken,customerTypeWiseSalesExcel )


//order report 
router.get('/reports/order-summary',VerifyToken,getALLOrderSummary);
router.get('/reports/one-order/:orderId',VerifyToken,getSingleOrder);
router.get('/reports/cancelled-order',VerifyToken,getCancelledOrders)
router.get('/order-summary/pdf',VerifyToken,generateOrderSummaryPDF)
router.get('/cancel-order/pdf',VerifyToken,generateCancelledOrdersPDF)
//excel
router.get('/order-summary/excel',VerifyToken,orderSummaryExcel)
router.get('/cancel-order/excel',VerifyToken,getCancelledOrdersExcel)



//Payment  Report 
router.get('/reports/payment-summary',VerifyToken,getPaymentSummary);
router.get('/reports/daily-payment',VerifyToken,getDailyCollectionReport);
router.get('/payment-summary/pdf',VerifyToken,generatePaymentSummaryPDF);
router.get('/payment-collection/pdf',VerifyToken,generateDailyCollectionPDF)
//excel 
router.get('/payment-summary/excel',VerifyToken,paymentSummaryExcel);
router.get('/daily-collection/excel',VerifyToken,dailyCollectionExcel);
router.get('/daily-transaction/excel',VerifyToken,dailyTransactionExcel)


//daily transaction type 
router.get('/reports/daily-transaction',VerifyToken,getDailyTransactionReport)
router.get('/daily-transaction/pdf',VerifyToken,getDailyTransactionPDF)

//purchse Expence Report
router.get('/reports/purchase',VerifyToken,getPurchaseReport);
router.get('/reports/expanse',VerifyToken,getExpenseReport);
router.get('/purchase/pdf',VerifyToken,generatePurchaseReportPDF);
//excel
router.get('/purchase/excel',VerifyToken,purchaseReportExcel)
router.get('/expense/excel',VerifyToken,expenseReportExcel);



router.get('/accounts/:restaurantId',VerifyToken,getAccounts);
router.get('/customer-type/:restaurantId',VerifyToken, getAllCustomerTypes)
router.get('/vendor-id',VerifyToken,getSuppliers);


//profit and loss
router.get('/reports/profit-loss',VerifyToken,getProfitAndLossReport);
router.get('/profit-loss/pdf',VerifyToken,profitandLossPdf);
router.get('/profit-loss/excel',VerifyToken,profitAndLossExcel);


//delte partner 
router.post('/delete-partner', deletePartnerSync);


export default router;