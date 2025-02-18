import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../model/User.js";
const router = express.Router();
const userRoute = () =>{
router.post('/register',(req,res)=>{
    let {name,email,password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if(name==""||email==""||password==""){
        res.json({
            status:"FAILED",
            message:"Empty Input Field"
        })
    }else if(!/^[a-zA-Z]*$/.test(name)){
        res.json({
            status:"FAILED",
            message:"Invalid Name Entered"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status:"FAILED",
            message:"Invalid Email Entered"
        })
    }
    else if(password.length<8){
        res.json({
            status:"FAILED",
            message:"Password is Too Short"
        })
    }else{
        User.find(email).then(result=>{
            if(result.length){
                res.json({
                    status:"FAILED",
                    message:"User with the Provided Email Already Exists"
                })
            }else{
                const slatRound = 10;
                bcrypt.hash(password,slatRound).then(hashedPass=>{
                    const newUser = new User({
                        name,
                        email,
                        password:hashedPass
                    })
                    newUser.save().then(result=>{
                        const jwtToke = jwt.sign(
                            {email:email,_id:result._id},
                            process.env.JWT_SEC,
                            {expiresIn:'24h'}
                        )
                        res.json({
                            status:"SUCCESS",
                            message:"Sighup Successful",
                            data:result,
                            jwtToke
                        })
                    }).catch(err=>{
                        res.json({
                            status:"FAILED",
                            message:"An Error Occured While Saving User Account"
                        })
                    })
                }).catch(err=>{
                    console.log(err);
                    res.json({
                        status:"FAILED",
                        message:"An Error Occured while Hashing Password"
                    })
                })
            }
        }).catch(err=>{
            console.log(err);
            res.json({
                status:"FAILED",
                message:"An Error Occured While Checking of Existing User"
            })
        })
    }
})

router.post('/sighin',(req,res)=>{
    let {name,email,password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if(email==""||password==""){
        res.json({
            status:"FAILED",
            message:"Empty Credintials Supplied"
        })
    }else {
        User.find(email).then(data=>{
            if(data){
                const hashedPass = data[0].password;
                bcrypt.compare(password,hashedPass).then(result=>{
                    if(result){
                        const jwtToke = jwt.sign(
                            {email:email,_id:data._id},
                            process.env.JWT_SEC,
                            {expiresIn:'24h'}
                        )
                        res.json({
                            status:"SUCCESS",
                            message:"Sighup Successful",
                            data:result,
                            jwtToke
                        })
                    }else{
                        res.json({
                            status:"FAILED",
                            message:"Invalid Password Entered"
                        })
                    }
                }).catch(err=>{
                    res.json({
                        status:"FAILED",
                        message:"An Error Occured While comparing passwords"
                    })
                })
            }else{
                res.json({
                    status:"FAILED",
                    message:"Invalid Credintials Entered"
                })
            }
        }).catch(err=>{
            res.json({
                status:"FAILED",
                message:"An Error Occured While Checking for Existing User"
            })
        })
    }
})
}
userRoute();
export default userRoute;