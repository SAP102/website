const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: [100, "Name can not be more than 100 characters"],
        },
        description: {
            type: String,
           
        },
        Company:{
            type: String,
            
        },
        price:{
            type:String ,
            
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        category:{
            type:String,
        },
        image:{
            type:String,
        }
    },
    { timestamps: true }
)
    

module.exports = mongoose.model('Products',ProductSchema) 