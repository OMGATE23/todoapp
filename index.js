const app = require('./app')
require('dotenv').config()
const PORT = process.env.PORT
const connectToDatabase = require('./config/database')

connectToDatabase()
app.listen(PORT , () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`)
})
