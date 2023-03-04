const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())


const user = require('./routes/user')
const todolist = require('./routes/todolist')

app.use('/api/v1/' , user)
app.use('/api/v1/' , todolist)

module.exports = app