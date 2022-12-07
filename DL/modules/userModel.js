const  mongoose = require("mongoose");



const userSchema = new mongoose.Schema({

    fullName : {
        firstName : {
            type : String,
            trim : true,
            required : true
        },
        lastName : {
            type : String,
            trim : true,
            required : true
        }
    },
    userName : {
        type : String,
        default : function() {
            return `${this.fullName.firstName} ${this.fullName.lastName}`
        },
        immutable : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    dob : {
        type : Date,
    },
    createDate : {
        type : Date,
        default : Date.now,
        immutable : true
    },
    permission : {
        type : String,
        enum : ["admin", "editor", "viewer"],
        default : "viewer"
    },
    gender : {
        type : String,
        enum : ["male", "female"],
        required : true
    },
    orders : [{
        orderId: {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "order",
            required : true
        },
    }],
    isActive : {
        type : Boolean,
        default : true
    }

})


const userData = mongoose.model("user", userSchema);

module.exports = userData;
