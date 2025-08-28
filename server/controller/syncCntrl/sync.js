import USER from '../../models/userModel.js';
import RESTAURANT from '../../models/restaurant.js';
import CUSTOMER_TYPES from '../../models/customerTypes.js';
import FLOORS from '../../models/floor.js';
import TABLES from '../../models/tables.js'
import KITCHEN from '../../models/kitchen.js'
import CATEGORY from '../../models/category.js';
import FOOD from '../../models/food.js';
import MENU_TYPE from '../../models/menuType.js'
import CHOICE from '../../models/choice.js'
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