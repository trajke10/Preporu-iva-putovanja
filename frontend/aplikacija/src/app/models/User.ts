import { Lokacija } from "./Lokacija";

export class User{
    korisnickoIme:String;
    lozinka:String;
    godine:Number;
    lokacija:Lokacija;
    listaPosecenihLokacija:Array<String>
}