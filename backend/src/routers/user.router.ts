import express from 'express'
import { UserController } from '../controllers/user.controller'


const userRouter=express.Router()


userRouter.route("/login").post(
    (req,res)=> new UserController().login(req,res)
)

userRouter.route("/register").post(
    (req,res)=> new UserController().register(req,res)
)

userRouter.route("/getAllUsers").get(
    (req,res)=> new UserController().getAllUsers(req,res)
)

export default userRouter