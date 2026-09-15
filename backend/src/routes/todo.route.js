import {Router} from 'express'
import { addTodo, deleteTodo, getFavouriteTodos, getTodos, setFavourite, updateTodo } from '../controllers/todo.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/save-todo").post(verifyJWT,addTodo)
router.route("/get-todos").get(verifyJWT,getTodos)
router.route("/set-favourite").patch(verifyJWT,setFavourite)
router.route("/get-favourite-todos").post(verifyJWT,getFavouriteTodos)
router.route("/update-todo").patch(verifyJWT,updateTodo)
router.route("/delete-todo").patch(verifyJWT,deleteTodo)
export default router;