import USER from '../../models/userModel.js';
import RESTAURANT from '../../models/restaurant.js';
import CUSTOMER_TYPES from '../../models/customerTypes.js';
import FLOORS from '../../models/floor.js';
import TABLES from '../../models/tables.js'
import KITCHEN from '../../models/kitchen.js'
import CATEGORY from '../../models/category.js';
import FOOD from '../../models/food.js';
import MENU_TYPE from '../../models/menuType.js';
import CUSTOMER from '../../models/customer.js';
import ORDER from '../../models/oreder.js'
import CHOICE from '../../models/choice.js';
import PAYMENT from '../../models/paymentRecord.js';
import TRANSACTION from '../../models/transaction.js'
import COMBO from '../../models/combo.js';
import COMBO_GROUP from '../../models/comboGroup.js';
import ACCOUNTS from '../../models/account.js';
import SUPPLIER from '../../models/supplier.js';
import INGREDIENTS from '../../models/ingredients.js'
import mongoose from 'mongoose';





export const syncAdmin =async (req,res,next)=>{
    try {
        await USER.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.body._id) },  // keep same _id in offline + online
      req.body,
      { upsert: true, new: true }
    )

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}

export const getAPI =async (req,res,next)=>{
    try {
   
  return  res.status(200).json({ success: true ,message:'ok done' });
        
    } catch (err) {
        next(err)
    }
}


export const syncRestaurnat =async (req,res,next)=>{
    try {
      await RESTAURANT.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.body._id) },  // keep same _id in offline + online
      req.body,
      { upsert: true, new: true }
    )

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}


export const syncCustomerTypes =async (req,res,next)=>{
    try {

    const customerTypes = req.body;

       const bulkOps = customerTypes.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }
    }));

    // Execute bulkWrite
    await CUSTOMER_TYPES.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}

export const syncFloors =async (req,res,next)=>{
    try {

    const floors = req.body;

       const bulkOps = floors.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }
    }));

    // Execute bulkWrite
    await FLOORS.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}


export const syncTables =async (req,res,next)=>{
    try {

    const tables = req.body;

       const bulkOps = tables.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await TABLES.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}


export const syncKitchen =async (req,res,next)=>{
    try {

    const kitchens = req.body;

       const bulkOps = kitchens.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await KITCHEN.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}




export const syncNormalUser =async (req,res,next)=>{
    try {

    const users = req.body;

       const bulkOps = users.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await USER.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}


export const syncCategory =async (req,res,next)=>{
    try {

    const cateogry = req.body;

       const bulkOps = cateogry.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await CATEGORY.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}

export const syncMenuType =async (req,res,next)=>{
    try {

    const menuType = req.body;

       const bulkOps = menuType.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await MENU_TYPE.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}

export const syncFood =async (req,res,next)=>{
    try {

    const food = req.body;

       const bulkOps = food.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await FOOD.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}


export const syncComboGroups =async (req,res,next)=>{
    try {

    const comboGRoups = req.body;

       const bulkOps = comboGRoups.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await COMBO_GROUP.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}

export const syncCombo =async (req,res,next)=>{
    try {

    const combo = req.body;

       const bulkOps = combo.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await COMBO.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}

export const syncCustomer =async (req,res,next)=>{
    try {

    const customers = req.body;

       const bulkOps = customers.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await CUSTOMER.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}

export const syncOrders =async (req,res,next)=>{
    try {

    const orders = req.body;

       const bulkOps = orders.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await ORDER.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}


export const syncPaymentRecord =async (req,res,next)=>{
    try {

    const payment = req.body;

       const bulkOps = payment.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await PAYMENT.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}



export const syncTransaction =async (req,res,next)=>{
    try {

    const transaction = req.body;

       const bulkOps = transaction.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await TRANSACTION.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}

export const syncAccounts =async (req,res,next)=>{
    try {

    const accounts = req.body;

       const bulkOps = accounts.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await ACCOUNTS.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}



export const syncIngredients =async (req,res,next)=>{
    try {

    const ingredients = req.body;

       const bulkOps = ingredients.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await INGREDIENTS.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}

export const syncSupplier =async (req,res,next)=>{
    try {

    const supplier = req.body;

       const bulkOps = supplier.map(ct => ({
       updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(ct._id) }, // use same _id offline + online
        update: { $set: ct },
        upsert: true
      }

    }));

    // Execute bulkWrite
    await SUPPLIER.bulkWrite(bulkOps);

    res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}