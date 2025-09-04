import mongoose from "mongoose";



const foodItemSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
  portionId: { type: mongoose.Schema.Types.ObjectId } ,
  additionalPrice: Number ,
  price:Number,
  qty:Number,
  pieceCount: Number, 
  singlePieceRate: Number, 
  mainItem: { type: Boolean, default:false}
});

const comboGroupSchema = new mongoose.Schema({
  groupName: { type: String },
  maxValue: { type:Number },
  foodItems: [foodItemSchema],
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
   createdById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // CompanyAdmin or BranchAdmin who created it
    },
      createdBy: {
          type:String,
      },
            isSynced: { type: Boolean, default: false },
      syncedAt: { type: Date },
      createdAt: { type: Date }
 
  
},{ timestamps: { createdAt: false, updatedAt: true } });

const comboGroupModel = mongoose.model("ComboGroup", comboGroupSchema);
export default comboGroupModel
