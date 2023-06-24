const mongooose = require('mongoose');
const User = require('./User');


const UserSchema = mongooose.Schema({
    amount : {
        type:'number',
        required:true

    },
    type: {
        type:'string',
        enum:['credit','debit'],
        required:true

    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: `User`
    }
})

const User = mongooose.model("User",UserSchema)

module.exports= User;