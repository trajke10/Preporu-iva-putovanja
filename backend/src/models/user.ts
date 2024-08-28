import mongoose, { mongo } from "mongoose";
import { ObjectId } from 'mongodb';

const UserSchema= new mongoose.Schema(
    {
        korisnickoIme:String,
        lozinka:String,
        godine:Number,
        lokacija:{
            lat:Number,
            lon:Number
        },
        listaPosecenihLokacija:Array<{
            _id:ObjectId 
        }>
    },{
        versionKey:false  
    }  
)

export default mongoose.model("UserM",UserSchema,"korisnici")