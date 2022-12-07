const mongoose = require("mongoose");
require("../modules/userModel");



const orderSchema = new mongoose.Schema({

    id : {
        type : Number,
        required: true,
        unique : true
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user",
        required: true
    },
    products : [{
        productId: {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "product",
            required : true
        },
        quantity : {
            type : Number
        }
    }],
    createDate : {
        type : Date,
        default : Date.now(),
        immutable : true
    },
    status : {
        type : String,
        anum : ["active", "shipped", "done"],
        default : "active"
    },
    isActive : {
        type : Boolean,
        default : true
    }

})


const orderData = mongoose.model("order", orderSchema);


module.exports = orderData;
