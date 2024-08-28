import mongoose, { mongo } from "mongoose";
import { ObjectId } from 'mongodb';

const AtractionSchema= new mongoose.Schema(
    {
        _id:ObjectId,
        naziv:String,
        koordinate:{
            latitude:Number,
            longitude:Number
        },
        opis:String,
        drzava:String,
        tip:String,
        ocena:Number,
        slika:String,
        recenzije:Number
    },{
        versionKey:false  
    }  
)

export default mongoose.model("AtractionM",AtractionSchema,"atrakcije")