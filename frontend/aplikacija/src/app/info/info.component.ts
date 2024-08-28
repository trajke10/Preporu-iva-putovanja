import { Component, OnInit } from '@angular/core';
import { ServisiService } from '../servisi/servisi.service';
import { Route, Router } from '@angular/router';
import { Atrakcija } from '../models/Atrakcija';
import { User } from '../models/User';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit{
  
  ocena: number;

  constructor(private servis:ServisiService,private router:Router){}

  uRadijane(degrees:number):number {
    return degrees * (Math.PI / 180);
  } 

  haversineDistance(lat1:number, lon1:number, lat2:number, lon2:number) :number{
      const R = 6371; // Poluprečnik Zemlje u km
      const fi1 = this.uRadijane(lat1);
      const fi2 = this.uRadijane(lat2);
      const deltaFi = this.uRadijane(lat2 - lat1);
      const deltaLambda = this.uRadijane(lon2 - lon1);

      const a = Math.sin(deltaFi / 2) * Math.sin(deltaFi / 2) +
                Math.cos(fi1) * Math.cos(fi2) *
                Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c; // Razdaljina u km
      console.log(distance)
      return distance;
  }

  ngOnInit(): void {
    let a=localStorage.getItem("atrakcija")
    if(a!=null){
      this.atrakcija=JSON.parse(a)
    }
    let k=localStorage.getItem("logged")
    if(k!=null){
      this.korisnik=JSON.parse(k)
    }
  }

  atrakcija:Atrakcija
  korisnik:User

  nazad(){
    localStorage.removeItem("atrakcija")
    this.router.navigate(['pocetna'])
  }

  oceni(){
    if(this.ocena==null || this.ocena<1 || this.ocena>10){
      alert("Ocena nije korektno uneta")
    }else{
      this.servis.rateLocation(this.atrakcija._id,this.ocena,this.korisnik.korisnickoIme).subscribe(data=>{
        this.atrakcija=data
      })
      if(this.ocena > 5){
        this.korisnik.listaPosecenihLokacija.push(this.atrakcija._id);
        localStorage.setItem("logged", JSON.stringify(this.korisnik));
      }
      alert("Hvala na oceni")
    }
  }


}
