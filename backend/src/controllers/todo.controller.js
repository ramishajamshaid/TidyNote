import { log } from "console";
import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTodo = asyncHandler(async (req, res) => {
    const { title, description, color } = req.body;

    if ([title, description].some(field => field.trim() === "")) {
        throw new ApiError(400, "Title and Description is required")
    }

    const todo = await Todo.create({
        title: title.trim(),
        description: description || "",
        color,
        user: req.user?._id
    })

    const createdTodo = await Todo.findById(todo._id).select("-user")
    if (!createdTodo) {
        throw new ApiError(401, "Something went wrong while saving todo")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdTodo, "Todo saved successfully")
        )
})

const updateTodo = asyncHandler(async (req, res) => {
    const { id, title, description, color } = req.body;
    console.log("Req body", req.body);


    if ([title, description].some(field => field.trim() === "")) {
        throw new ApiError(400, "Title and Description is required")
    }

    const todo = await Todo.findByIdAndUpdate(id, {
        title: title.trim(),
        description: description || "",
        color: color,
    })

    console.log("Todo: ", todo);
    if (!todo) {
        throw new ApiError(401, "Something went wrong while updating todo")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, todo, "Todo updated successfully")
        )
})

const deleteTodo = asyncHandler(async (req, res) => {
    const {id} = req.body;

    if (!id) {
        throw new ApiError(400, "Todo not found")
    }

    const todo = await Todo.findByIdAndUpdate(id, {
        isTrashed: true,
        trashedAt: new Date(),
        isFavourite: false
    },
        {
            returnDocument: 'after'
        }
    )

    if (!todo) {
        throw new ApiError(401, "Something went wrong while deleting todo")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, todo, "Todo is moved to trashed successfully")
        )
})

const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user: req.user?._id })
    if (!todos) {
        throw new ApiError(401, "No todos available")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, todos, "Todos fetched successfully")
        )
})

const getFavouriteTodos = asyncHandler(async (req, res) => {
    const favouriteTodos = await Todo.find({ user: req.user?._id, isFavourite: true })
    if (!favouriteTodos) {
        throw new ApiError(401, "No todos available")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, favouriteTodos, "Favourite Todos fetched successfully")
        )
})

const setFavourite = asyncHandler(async (req, res) => {
    const { id, isFavourite } = req.body
    const updatedTodo = await Todo.findByIdAndUpdate(id,
        {
            isFavourite
        },
        {
            returnDocument: 'after'
        }
    )
    if (!updatedTodo) {
        throw new ApiError(401, "Todo not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedTodo, "Todo added to Favourites Successfully")
        )
})

export { addTodo, getTodos, setFavourite, getFavouriteTodos, updateTodo, deleteTodo };