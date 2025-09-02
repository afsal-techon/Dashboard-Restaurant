import mongoose from "mongoose";
import USER from '../../models/userModel.js';
import TRANSACTION from '../../models/transaction.js'
import RESTAURANT from '../../models/restaurant.js'
import {  generatePDF } from '../../config/pdfGeneration.js'
import ExcelJS from 'exceljs';
import ACCOUNT from '../../models/account.js';
import PAYMENT_RECORD from '../../models/paymentRecord.js'
import EXPENSE from '../../models/expense.js'
import PURCHASE from '../../models/purchase.js'





//profit loss report

export const getProfitAndLossReport = async (req, res, next) => {
  try {
    const user = await USER.findById(req.user).lean();
    if (!user) return res.status(400).json({ message: "User not found!" });

    const { fromDate, toDate } = req.query;
    const start = fromDate ? new Date(fromDate) : new Date("2000-01-01");
    const end = toDate ? new Date(toDate) : new Date();
    end.setHours(23, 59, 59, 999);

    // === Fetch Sales (Revenue) ===
    const payments = await PAYMENT_RECORD.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: null,
          totalBeforeVAT: { $sum: "$beforeVat" },
          // totalVAT: { $sum: "$vatAmount" },
          // totalGrand: { $sum: "$grandTotal" }
        }
      }
    ]);

    const revenue = payments[0]?.totalBeforeVAT || 0;
    // const totalOutputVAT = payments[0]?.totalVAT || 0;
    // const totalSalesWithVAT = revenue + totalOutputVAT;

    // === Fetch Purchases (COGS) ===
    const purchases = await PURCHASE.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: null,
          // totalCOGS: { $sum: "$totalAmount" }
           totalCOGS: { $sum: "$totalBeforeVAT" }
        }
      }
    ]);

    const cogs = purchases[0]?.totalCOGS || 0;

    // === Fetch Expenses ===
    const expenses = await EXPENSE.find({
      createdAt: { $gte: start, $lte: end }
    }).lean();

    let operatingExpenses = {};
    let TotalOperatingExpenses = 0;

    for (const exp of expenses) {
      for (const item of exp.expenseItems) {
        const account = await ACCOUNT.findById(item.accountId).lean();
        if (!account) continue;
        const name = account.accountName;

         const amount = Number(item.baseTotal) || 0;

        if (!operatingExpenses[name]) {
          operatingExpenses[name] = 0;
        }
        operatingExpenses[name] += amount;
        TotalOperatingExpenses += amount;
      }``
    }







    // === Calculations ===
    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - TotalOperatingExpenses;

    // === Final Response ===
    return res.status(200).json({
      Income: {
        "Sale": revenue,
        // "VAT on Sale": totalOutputVAT,
      },
      "Cost of Goods Sold": {
        Purchase: cogs
      },
      "Gross Profit": grossProfit,
      "Operating Expense": {
          TotalOperatingExpenses,
         operatingExpenses
      },
      "Net Profit": netProfit,
      "From Date": fromDate,
      "To Date": toDate
    });

  } catch (error) {
    next(error);
  }
};



export const profitandLossPdf = async (req, res, next) => {
try {
    const user = await USER.findById(req.user).lean();
    if (!user) return res.status(400).json({ message: "User not found!" });

    const { fromDate, toDate } = req.query;
    const start = fromDate ? new Date(fromDate) : new Date("2000-01-01");
    const end = toDate ? new Date(toDate) : new Date();
    end.setHours(23, 59, 59, 999);

    const payments = await PAYMENT_RECORD.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: null,
          totalBeforeVAT: { $sum: "$beforeVat" }
        }
      }
    ]);
    const revenue = payments[0]?.totalBeforeVAT || 0;

    const purchases = await PURCHASE.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: null,
          totalCOGS: { $sum: "$totalBeforeVAT" }
        }
      }
    ]);
    const cogs = purchases[0]?.totalCOGS || 0;

    const expenses = await EXPENSE.find({
      createdAt: { $gte: start, $lte: end }
    }).lean();

    let operatingExpenses = {};
    let TotalOperatingExpenses = 0;

    for (const exp of expenses) {
      for (const item of exp.expenseItems) {
        const account = await ACCOUNT.findById(item.accountId).lean();
        if (!account) continue;
        const name = account.accountName;
        const amount = Number(item.baseTotal) || 0;

        if (!operatingExpenses[name]) {
          operatingExpenses[name] = 0;
        }
        operatingExpenses[name] += amount;
        TotalOperatingExpenses += amount;
      }
    }

    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - TotalOperatingExpenses;

    const restaurant = await RESTAURANT.findOne().lean();
    const currency = restaurant?.currency || 'AED';

    const pdfBuffer = await generatePDF('profitAndLossReport', {
      revenue,
      cogs,
      grossProfit,
      operatingExpenses,
      TotalOperatingExpenses,
      netProfit,
      fromDate,
      toDate,
      currency
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="profit-loss-report-${Date.now()}.pdf"`
    });

    return res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};


export const profitAndLossExcel = async (req, res, next) => {
  try {
    const user = await USER.findById(req.user).lean();
    if (!user) return res.status(400).json({ message: "User not found!" });

    const { fromDate, toDate } = req.query;
    const start = fromDate ? new Date(fromDate) : new Date("2000-01-01");
    const end = toDate ? new Date(toDate) : new Date();
    end.setHours(23, 59, 59, 999);

    // === Sales (Revenue) ===
    const payments = await PAYMENT_RECORD.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalBeforeVAT: { $sum: "$beforeVat" } } }
    ]);
    const revenue = payments[0]?.totalBeforeVAT || 0;

    // === Purchases (COGS) ===
    const purchases = await PURCHASE.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalCOGS: { $sum: "$totalBeforeVAT" } } }
    ]);
    const cogs = purchases[0]?.totalCOGS || 0;

    // === Expenses ===
    const expenses = await EXPENSE.find({ createdAt: { $gte: start, $lte: end } }).lean();
    let operatingExpenses = {};
    let TotalOperatingExpenses = 0;

    for (const exp of expenses) {
      for (const item of exp.expenseItems) {
        const account = await ACCOUNT.findById(item.accountId).lean();
        if (!account) continue;
        const name = account.accountName;
        const amount = Number(item.baseTotal) || 0;

        if (!operatingExpenses[name]) {
          operatingExpenses[name] = 0;
        }
        operatingExpenses[name] += amount;
        TotalOperatingExpenses += amount;
      }
    }

    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - TotalOperatingExpenses;

    // === Excel Generation ===
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Profit & Loss");

    // Title
    worksheet.mergeCells("A1:B1");
    worksheet.getCell("A1").value = "Profit and Loss Report";
    worksheet.getCell("A1").font = { size: 16, bold: true };
    worksheet.getCell("A1").alignment = { horizontal: "center" };

    worksheet.addRow([]);

    // Filters Row
    const filters = [
      fromDate ? `From: ${fromDate}` : null,
      toDate ? `To: ${toDate}` : null
    ].filter(Boolean);
    if (filters.length) {
      const filterRow = worksheet.addRow(filters);
      filterRow.eachCell(cell => (cell.font = { bold: true }));
      worksheet.addRow([]);
    }

    // === Income Section ===
    worksheet.addRow(["Income"]).font = { bold: true };
    worksheet.addRow(["Sale", revenue]);

    worksheet.addRow([]);

    // === COGS Section ===
    worksheet.addRow(["Cost of Goods Sold"]).font = { bold: true };
    worksheet.addRow(["Purchase", cogs]);

    worksheet.addRow([]);

    // === Gross Profit ===
    worksheet.addRow(["Gross Profit", grossProfit]).font = { bold: true };

    worksheet.addRow([]);

    // === Operating Expenses ===
    worksheet.addRow(["Operating Expenses"]).font = { bold: true };
    for (const [name, value] of Object.entries(operatingExpenses)) {
      worksheet.addRow([name, value]);
    }
    worksheet.addRow(["Total Operating Expenses", TotalOperatingExpenses]).font = { bold: true };

    worksheet.addRow([]);

    // === Net Profit ===
    worksheet.addRow(["Net Profit", netProfit]).font = { bold: true };

    // Format column width
    worksheet.columns = [
      { width: 35 },
      { width: 20 }
    ];

    // Send Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=profit_and_loss_report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};