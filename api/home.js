import ensAuth from "./Auth.js";
import express from "express";
const router = express.Router();

router.get("/", ensAuth, (req,res)=>{
    res.status(200).json({message:"Welcome to HomePage"})
})