const mongoose = require('mongoose')

const connectToDatabase = () => {
    mongoose.set('strictQuery' , false)
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
    }).then(
        console.log('DB CONNECTED SUCCESSFULLY')
    ).catch(err => {
        console.log("UNABLE TO CONNECT TO DATABASE")
        console.log(err)
    })
}

module.exports = connectToDatabase