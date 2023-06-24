const mongooose = require('mongoose');
const transactions = require('./Transaction');

const UserSchema = mongooose.Schema({
    name : {
        type:'string',
        required:true

    },
    password: {
        type:'string',
        required:true

    },
    current_balance: {
        type:'number',
        required:true,
        default:0
    },
    transactions: [{
        type:mongoose.Schema.Types.ObjectId, ref: `transactions`
    }]
})

const User = mongooose.model("User",UserSchema)

module.exports= User;