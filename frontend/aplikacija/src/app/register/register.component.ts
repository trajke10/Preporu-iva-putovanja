import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ServisiService } from '../servisi/servisi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private router:Router,private servis:ServisiService){}

  nazad() {
    this.router.navigate([''])
  }

  map: L.Map  
  korisnickoIme:String
  lozinka:String
  godine:number

  ngOnInit(): void {
  }

  lat:number
  lon:number


  public geocode(location: string): void {
    fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(location)}&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          this.lat = data[0].lat;
          this.lon = data[0].lon;
          this.register()
        } else {
          alert('Ne postoji uneti grad');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error fetching location');
      });
  }

  register(){
    this.servis.register(this.korisnickoIme,this.lozinka,{lat:this.lat,lon:this.lon},this.godine).subscribe(data=>{
      if(data.message=="OK"){
        alert("Registracija uspešna, povratak na stranu za prijavljivanje")
        this.router.navigate([''])
      }else{
        alert(data.message)
      }
    })
  }

}
