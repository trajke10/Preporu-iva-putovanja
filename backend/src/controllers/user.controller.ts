import express from 'express'
import UserModel from '../models/user'

export class UserController{

    login=(req:express.Request,res:express.Response)=>{

        UserModel.findOne({korisnickoIme:req.body.korisnickoIme,lozinka:req.body.lozinka}).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })

    }

    register=(req:express.Request,res:express.Response)=>{

        UserModel.findOne({korisnickoIme:req.body.korisnickoIme}).then(data=>{
            if(data!=null){
                res.json({message:"Korisnik sa datim korisnickim imenom već postoji"})
            }else{
                new UserModel({
                    korisnickoIme:req.body.korisnickoIme,
                    lozinka:req.body.lozinka,
                    godine:req.body.godine,
                    lokacija:{lat:req.body.lokacija.lat,lon:req.body.lokacija.lon},
                    listaPosecenihLokacija:[]
                }).save().then(data=>{
                    res.json({message:"OK"})
                }).catch(err=>{
                    console.log(err)
                })
            }
        }).catch(err=>{
            console.log(err)
        })

    }

    getAllUsers=(req:express.Request,res:express.Response)=>{
        
        UserModel.find({}).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })

    }

}