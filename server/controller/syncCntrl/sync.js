import USER from '../../models/userModel.js';
import RESTAURANT from '../../models/restaurant.js'





export const syncAdmin =async (req,res,next)=>{
    try {

       await USER.findOneAndUpdate(
      { _id: req.body._id },   // keep same _id in offline + online
      req.body,
      { upsert: true, new: true }
    );

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












