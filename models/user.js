const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 25,
        required  : [true , "Name is required"]
    } ,

    email : {
        type : String,
        required : [true , "Email required for Sign in"],
        unique : [true , "Email already in use"]
    } ,

    password : {
        type : String,
        requried : [true , "Password required"],
        minlength : 6,
        select : false
    } , 
    todoList : [
        {
            name : {
                type : String,
                required  :[true, "Nam of task required"],
            } , 

            description : {
                type : String,
                maxLength : 50
            },
            status : {
                type : String,
                enum : ["pending", "completed" , "overdue"],
                required : [true, "status required"],
                default : "pending"
            },

            createdAt : {
                type : Date,
                default : Date.now()
            } ,

            expectedCompletionDate : {
                type : Date,
                required : [true , "Date of Completion is required field"]
            }

        }
    ]
    ,
    createdAt :{
        type : Date,
        default : Date.now()
    }
})

userSchema.pre('save' , async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password , 12)
})

userSchema.methods.isValidPassword = async function(userSentPassword){
    const strPassword = userSentPassword
    return await bcrypt.compareSync(strPassword , this.password)
}

userSchema.methods.getJwtToken = function(){
    return jwt.sign({
        id : this._id,
    } , process.env.JWT_SECRET,
    {
        expiresIn : '2h'
    }) 

}

module.exports = mongoose.model( 'User' , userSchema)