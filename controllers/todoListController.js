const User = require('../models/user')
const bigPromise = require('../utils/bigPromise')

exports.addTask = bigPromise(async(req,res,next) => {
    const {name, expectedCompletionDate , description} = req.body
    const userId = req.user._id

        if(!name || !expectedCompletionDate ){
            return res.status(400).json({
                success : false,
                message : "Name or completion date not given"
            })
        }
    const user = await User.findById(userId)

    user.todoList.push({
        name, expectedCompletionDate , description
    })

    let updatedList = user.todoList

    await user.save({validateBeforeSave : false})
    res.status(200).json({
        success : "true",
        item: {
            name,
            expectedCompletionDate,
            description
        },
        updatedList
    })


})

exports.getTodoList = bigPromise(async(req,res,next) => {
    const user = await User.findById(req.user._id)

    res.status(200).json({
        todoList : user.todoList
    })
})

exports.deleteTask = bigPromise(async(req,res,next) => {
    const taskId = req.params.id
    const user = await User.findById(req.user._id)

    const todoList = user.todoList

    const updatedTodoList = todoList.filter( item => {
        return(item._id.toString() !==  taskId.toString())
    })

    //task 4
    //63f4c1f72ba9c67bc6a7239c

    user.todoList = updatedTodoList

    await user.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
        updatedTodoList
    })


})

exports.updateTask = bigPromise(async(req,res,next) => {
    const taskId = req.params.id
    const {name , description , expectedCompletionDate ,status} = req.body
    // 

    if(status){
        if(!(["pending", "completed" , "overdue"].includes(status))){
            return res.status(400).json({
                success : true,
                message : "Invalid status",
                status
            })
        }
    }
    
    if(expectedCompletionDate){
        if(expectedCompletionDate <= Date.now()){
            throw new Error("Expected Date has already passed")
        }
    }

    const user = await User.findById(req.user._id)

    todoList = user.todoList
    const updatedTodoList = todoList.filter( item => {
        if(item._id.toString() ==  taskId.toString()){
            if(status){
                item.status = status
            }

            if(name){
                item.name = name
            }

            if(expectedCompletionDate){
                item.expectedCompletionDate = expectedCompletionDate
            }

            if(description){
                item.description = description
            }
        }

        return item
    })
    console.log(updatedTodoList)

    user.todoList = updatedTodoList

    await user.save({validateBeforeSave : false})
    res.status(200).json({
        success : true,
        updatedTodoList
    })
    
})

exports.getOneTask = bigPromise(async(req,res,next) => {
    const taskId = req.params.id
    const user = await User.findById(req.user._id)

    const selectedItem = user.todoList.filter(item => {
        return (item._id.toString() ==  taskId.toString())
    })

    res.status(200).json(
        ...selectedItem
    )
})