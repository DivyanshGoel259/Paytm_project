const express = require('express');
const  authMiddleware  = require('../middleware');
const { User,Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router()

router.post("/transaction" , authMiddleware , async (req,res)=>{
    const session = await mongoose.startSession()
    session.startTransaction()
    const {amount , to} = req.body
    const sendersAccount = await Account.findOne({
        userID:req.userID

    }).session(session)
    if(!sendersAccount || sendersAccount.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Insufficient Balance"
        })
    }
    const receiverAccount = await Account.findOne({
        userID:to

    }).session(session)
    if(!receiverAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Invalid Account"
        })
    }
    await Account.updateOne({
        userID:req.userID
    },{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({
        userID:to
    },{$inc:{balance:amount}}).session(session)

    await session.commitTransaction();
    res.json({
        message:"Transfer Succesfull"
    })
    
})

router.get("/balance" ,authMiddleware, async (req,res)=>{
    userPassword = req.body.password
    userEmail = req.body.username
    const user = await User.findOne({
        username:userEmail,
        password:userPassword
    })
    console.log(user)
    const userBalance = await Account.findOne({
        userID:user._id
    })
    res.json({
        Balance:userBalance.balance
    })
})

module.exports = router


