const express = require('express')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')
const {User,Account} = require('../db')
const authMiddleware = require("../middleware")


const router = express.Router()

const userDetailsValidationSchema = zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
})
const BodyDetailsValidationSchema = zod.object({
    
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
    password:zod.string().optional()
})

router.post("/Signup",async (req,res)=>{

    const requestBody = req.body
    console.log(requestBody)
    const {success} = userDetailsValidationSchema.safeParse(requestBody)
    console.log(success)
    if(!success){
        return res.json({
            message:"Incorrect Inputs"
        })
    }
    const user = await User.findOne({
        username:requestBody.username
    })
    
    if(user){
        
        return res.json({
            message:'Email Already Exist'
        })
    }

    

    const dbuser = await User.create({
        username:requestBody.username,
        firstname:requestBody.firstname,
        lastname:requestBody.lastname,
        password:requestBody.password
    })
    
    

    const userID= dbuser._id
    await Account.create({
        userID: userID,
        balance:10000
    })
    const token = jwt.sign({userID},JWT_SECRET)
    res.json({
        message:'User created Succesfully',
        token:token
    })
    
})

router.post("/Signin",authMiddleware,(req,res)=>{
    res.send("login sUccesfully")
})

router.put("/",authMiddleware,async (req,res)=>{
    const informationToUpdate = req.body
    const {success} = BodyDetailsValidationSchema.safeParse(informationToUpdate)
    if(!success){
        res.json({
            message:"Wrong Inputs"
        })
    }
    await User.updateOne(informationToUpdate,{
        _id : req.id
    })
    res.json({
        message:"Updated Succesfully"
    })
    
})

router.get('/bulk',async (req,res)=>{
    const filter = req.query.filter || ''
    const users = await User.find({
        $or:[{
            firstname:{
                '$regex' : filter
            }
        },{
            lastname:{
                '$regex' : filter
            }
        }]
    })

    res.json({
        Users : users.map(user =>({
            username:user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router