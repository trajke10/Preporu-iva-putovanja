import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { Lokacija } from '../models/Lokacija';
import { User } from '../models/User';
import { Atrakcija } from '../models/Atrakcija';

@Injectable({
  providedIn: 'root'
})

export class ServisiService {

  constructor(private http:HttpClient) { }

  login(korisnickoIme:String,lozinka:String){
    return this.http.post<User>("http://localhost:4000/users/login",{korisnickoIme:korisnickoIme,lozinka:lozinka})
  }

  register(korisnickoIme:String,lozinka:String,lokacija:Lokacija,godine:number){
    return this.http.post<Message>("http://localhost:4000/users/register",{korisnickoIme:korisnickoIme,lozinka:lozinka,lokacija:lokacija,godine:godine})
  }

  getAllAtractions(){
    return this.http.get<Atrakcija[]>("http://localhost:4000/atractions/getAllAtractions")
  }

  rateLocation(_id:String,ocena:Number,korisnickoIme:String){
   return this.http.post<Atrakcija>("http://localhost:4000/atractions/rateLocation",{_id:_id,ocena:ocena,korisnickoIme:korisnickoIme})
  }

  getAllUsers(){
    return this.http.get<User[]>("http://localhost:4000/users/getAllUsers")
  }

}
