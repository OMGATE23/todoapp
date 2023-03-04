const express = require('express')
const router = express.Router()
const {addTask , getTodoList , deleteTask , updateTask, getOneTask} = require('../controllers/todoListController')
const {isLoggedIn} = require('../middlewares/user')

router.route('/user/todolist/addtask').post(isLoggedIn , addTask)
router.route('/user/todolist').get(isLoggedIn , getTodoList)
router.route('/user/todolist/deletetask/:id').delete(isLoggedIn , deleteTask)
router.route('/user/todolist/updatetask/:id').put(isLoggedIn , updateTask)
router.route('/user/todolist/:id').get(isLoggedIn , getOneTask)

module.exports = router