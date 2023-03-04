const bigPromise = require('../utils/bigPromise')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.isLoggedIn = bigPromise(async(req,res,next) => {
    let token
    if(!req.cookies && !req.header('Authorization')){
        throw new Error("Cookie not found")
    }

    if(req.cookies){
        token = req.cookies.token
    } 
    if (req.header('Authorization')){
        token = req.header('Authorization').replace('Bearer ' , '');
    }
    console.log(token)
    if(!token){
        throw new Error("Token missing")
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decode.id)
    
    next()
})