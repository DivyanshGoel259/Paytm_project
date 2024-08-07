const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mahekb099:mahekb099@hacklockfirstdatabase.7p10krz.mongodb.net/paytm')

const userSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    password:String,
    username:String
})


const accountSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const User = mongoose.model("User",userSchema)
const Account = mongoose.model("Account",accountSchema)
module.exports = {
    User,
    Account
}