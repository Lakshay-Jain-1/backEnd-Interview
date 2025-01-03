import mongoose from "mongoose";

// available (true) → can send/receive offers
// receiving_offer (true) → locked for other callers
// onCall (true) → in active call

const UserSchema =new mongoose.Schema({
    id:Number,
    name:{
        type:String,
        unique:false // but I will make it true in future 
    },
    password:{
        type:String,
        default:"123"
    },
    emailId:{
        type:String,
        default:"lak@gmail.com"
    },acceptor:{
        type:String,
        default:""
    },
    online:{
        type:Boolean,
        default:false

    },
    available:{
        type:Boolean,
        default:false,
    },
    recievingOffer:{
        type:Boolean,
        default:false,
    },
    onCall:{
        type:Boolean,
        default:false
    },
    offer:{
        type:Object,
        default:""
    },
    answer:{
        type:Object,
        default:""
    }
    
    

})

UserSchema.statics.findUsersOnline = async function (cb) {
    return await this.find({ online: true });
};



export const usermodel:any = mongoose.model("usermodel",UserSchema)