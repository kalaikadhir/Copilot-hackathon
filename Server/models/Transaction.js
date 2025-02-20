const mongoose = require('mongoose');
const User = require('./User');


const TransactionSchema = mongoose.Schema({
    amount : {
        type:'number',
        required:true

    },
    type: {
        type:'string',
        enum:['credit','debit'],
        required:true

    },
    category: {
        type:'string',
        enum:['Groceries','Medicines','Travel','Food','Shopping','Bills','Others'],
        required:true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: `User`
    }
})

const TransactionModel = mongoose.model("Transactiom",TransactionSchema)

module.exports= TransactionModel;