import express from 'express'
import AtractionModel from '../models/atrakcija'
import UserModel from '../models/user'
import { ObjectId } from 'mongodb'

export class AtractionController{
    
    getAllAtractions=(req:express.Request,res:express.Response)=>{

        AtractionModel.find({}).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })

    }

    rateLocation=(req:express.Request,res:express.Response)=>{
        
        AtractionModel.findOne({_id:new ObjectId(req.body._id)}).then(data=>{
            if(data!=null && data.recenzije!=null && data.ocena!=null){
                AtractionModel.findOneAndUpdate({_id:new ObjectId(req.body._id)},{$set:{recenzije:data.recenzije+1,ocena:(data.ocena*data.recenzije+req.body.ocena)/(data.recenzije+1)}},{new:true}).then(data2=>{
                    if(req.body.ocena>5){
                        UserModel.updateOne({korisnickoIme:req.body.korisnickoIme},{$push:{listaPosecenihLokacija:new ObjectId(req.body._id)}}).then(data=>{
                            res.json(data2)
                        }).catch(err=>{
                            console.log(err)
                        })   
                    }else{
                        res.json(data2)
                    }                 
                }).catch(err=>{
                    console.log(err)
                })
            }
        }).catch(err=>{
            console.log(err)
        })

    }

}
