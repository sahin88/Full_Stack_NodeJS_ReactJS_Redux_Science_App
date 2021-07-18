import AuthMessage from "../model/authMessage.js";
import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';


export const loginPost = async (req, response) => {
    var email= req.body.email;
    var password=req.body.password;
        AuthMessage.findOne({email:email}, (err,myUser)=>{
            if(err){
                return response.status(409).json({error:err.message})
            }
            if (myUser){
                bcrypt.compare(password, myUser.password,(err, res)=>{
                    if(err){
                        return response.status(409).json({error:err})
                    }
                    else{
                        let token=jwt.sign({email:myUser.email, id:myUser.id}, 'sahin',{expiresIn:'24h'})
                        response.status(200).json({result:myUser,token})
                        
                    }
                })
            }
        })
}

const schema={
    firstname:Joi.string().min(2).required(),
    lastname:Joi.string().min(2).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required(),
    re_password:Joi.string().min(6).required(),
}

export const registerPost = async (req, res) => {

    let existEmail=await AuthMessage.find({email:req.body.email})
    if(existEmail.length>0){

        return  res.status(409).json({error:"Email exists!"})
    }

    message={}
    message.error='The passwords dont match'
    if(req.body.password!=req.body.re_password){
        return res.status(405).json({eror:message})}
    const { error } =Joi.validate(req.body, schema)
   
    if(error){
        var message=error.details[0].message.replace(/['"]+/g, '')
        return res.status(409).json({error:error.message})}
        bcrypt.hash(req.body.password,10,(err, hashedPassword)=>{
        let registerData = new AuthMessage({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:hashedPassword
        })
        try {
            let registerDataResponse= registerData.save()
            res.status(200).json(registerDataResponse);
        } catch (error_save) {
            res.status(404).json({ error: error_save.message })
        }
})

}