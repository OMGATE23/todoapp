const bigPromise = require('../utils/bigPromise')
const User = require('../models/user')
const cookieToken = require('../utils/cookieToken')
exports.testUser = bigPromise((req,res) => {
    res.json({
        success : true,
        message : "this is the test route"
    })
})

exports.signup = bigPromise(async (req,res,next) => {
    const {name , email , password} = req.body;

    if(!(name || email || password)){
        return res.status(400).json({
            success : false,
            message : "name, email or password is missing"
        })
    }

    const user = await User.create({
        name,email,password
    })

    cookieToken(res,user)


})

exports.login = bigPromise(async (req,res,next) => {
    const {email, password} = req.body;

    if(!(email || password)){
        res.status(400).json({
            success : false,
            message : "email or password not given"
        })
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        res.status(400).json({
            success : false,
            message : "user not found"
        })
    }

    const isCorrectPassword = await user.isValidPassword(req.body.password)

    if(!isCorrectPassword){
        res.status(400).json({
            success : false,
            message : "Incorrect Email or Password"
        })
    }

    cookieToken(res,user)
});

exports.logout = bigPromise(async(req,res,next) => {
    res.cookie('token' , null , {
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "Logged out"
    })
})