const mongoose = require("mongoose");



const ProductSchema = new mongoose.Schema({

    id: {
        type : Number,
        required : true,
        unique : true
    },
    title : {
        type : String,
        required : true,
        trim : true,
    },
    price : {
        type : Number,
        required : true,
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    category : {
        type : String,
        enum : ["electronics", "jewelery", "women's clothing", "men's clothing"],
        required : true,
        trim : true
    },
    image : {
        type : String,
        required : true,
    },
    inStock : {
        type : Number,
        required : true,
        validate: {
            validator: v => v > 0,
            message: props => `${props.value} must be above 0`
        }
    },
    isActive : {
        type : Boolean,
        default : true,
    }

})

const ProductData = mongoose.model("product", ProductSchema);


module.exports = ProductData;
