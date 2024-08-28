import { Component } from '@angular/core';
import { ServisiService } from '../servisi/servisi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private servis:ServisiService,private router:Router){}

  korisnickoIme:String
  lozinka:String

  login() {
    this.servis.login(this.korisnickoIme,this.lozinka).subscribe(data=>{
      if(data==null){
        alert("Pogrešno korisničko ime ili lozinka")
      }else{
        localStorage.setItem('logged',JSON.stringify(data))
        this.router.navigate(['pocetna'])
      }
    })
  }

}
