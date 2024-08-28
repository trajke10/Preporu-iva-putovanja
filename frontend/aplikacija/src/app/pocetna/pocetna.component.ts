import { Component, OnInit } from '@angular/core';
import { ServisiService } from '../servisi/servisi.service';
import { Router } from '@angular/router';
import { Atrakcija } from '../models/Atrakcija';
import { User } from '../models/User';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit{

  viseInfo(a: Atrakcija) {
    localStorage.setItem("atrakcija",JSON.stringify(a))
    this.router.navigate(['info'])
  }

  sortiraj() {
    this.filtriraneAtrakcije=this.filtriraneAtrakcije.sort((a,b)=>{
      if(this.poredak=="asc"){
        return a.ocena.valueOf()-b.ocena.valueOf()
      }else if(this.poredak="desc"){
        return b.ocena.valueOf()-a.ocena.valueOf()
      }
      return 0
    })
  } 
  
  poredak: String="";
  
  constructor(private servis:ServisiService,private router:Router){}

  sveAtrakcije:Atrakcija[]=[]

  dohvatiSveAtrakcije(){

    this.servis.getAllAtractions().subscribe(data=>{

      this.sveAtrakcije=data
      this.filtriraneAtrakcije=data
      
      this.dohvatiSveKorisnike()

      this.dohvatiBliskeAtrakcije()

      this.preporuciNaOsnovuPrethodnihPoseta()
      
    })
  }

  preporuciNaOsnovuPrethodnihPoseta(){
    
    this.prethodnePoseteKorisnika=this.sveAtrakcije.filter(x=>
      this.korisnik.listaPosecenihLokacija.includes(x._id)
    )
    
    this.korisnickiVektor = this.kreirajKorisnickiVektor(this.prethodnePoseteKorisnika)

    this.preporuceneAtrakcije=this.preporuceneDestinacije(this.sveAtrakcije,this.korisnickiVektor,this.drzave,this.tipovi)

  }

  prethodnePoseteKorisnika:Atrakcija[]=[]

  dohvatiSveKorisnike(){
    this.servis.getAllUsers().subscribe(data=>{
      this.korisnici=data
      this.dohvatiAtrakcijeBliskihKorisnika()
      this.dohvatiAtrakcijeKorisnikaSlicnihGodina()
      this.pronadjiNajslicnijeKorisnike(); 
    })
  } 

  korisnik:User

  naziv:String=""
  drzava:String=""
  tip:String=""
  ocena:Number=0

  ngOnInit(): void {
    let u=localStorage.getItem("logged")
    if(u!=null){
      this.korisnik=JSON.parse(u)
    }
    this.dohvatiSveAtrakcije()
  }

  filtriraneAtrakcije:Atrakcija[]=[]
  bliskeAtrakcije:Atrakcija[]=[]
  atrakcijeBliskihKorisnika:Atrakcija[]=[]
  atrakcijeKorisnikaSlicnihGodina:Atrakcija[]=[]
  preporuceneAtrakcije:Atrakcija[]=[]

  korisnici:User[]=[]
 
  najslicnijiKorisnici:User[] = [];

  napraviVektor(kor : User) : number[]{

    let podaci = [(kor.godine.valueOf() - 18) / (80 - 18), (kor.lokacija.lat + 90) / 180, (kor.lokacija.lon + 180) / 360];

    return [...<number[]>podaci, ...this.kreirajKorisnickiVektor(this.sveAtrakcije.filter((atr)=>kor.listaPosecenihLokacija.includes(atr._id)))]

  }

  pronadjiNajslicnijeKorisnike(){

    let mojVektor = this.napraviVektor(this.korisnik);
   
    let vektoriDrugih = this.korisnici.filter((kor)=>kor.korisnickoIme!=this.korisnik.korisnickoIme).map((kor)=>{return this.napraviVektor(kor)})
    
    let bliski = this.korisnici.filter((kor)=>kor.korisnickoIme != this.korisnik.korisnickoIme).map(
      (kor, index)=>{return [kor, this.kosinusnaSlicnost(<number[]>mojVektor, <number[]>vektoriDrugih[index])]}
    ).sort((a,b)=>{return <number>b[1]-<number>a[1]}).slice(0,10);

    this.najslicnijiKorisnici = bliski.map((elem)=>{return <User>elem[0];})
    
  }


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

  dohvatiBliskeAtrakcije(){
    //koristimo krug od 100km

    this.bliskeAtrakcije=this.sveAtrakcije.filter(element => 
      this.haversineDistance(this.korisnik.lokacija.lat,this.korisnik.lokacija.lon,element.koordinate.latitude.valueOf(),element.koordinate.longitude.valueOf())<=100
    );
    this.bliskeAtrakcije=this.bliskeAtrakcije.sort((a,b)=>{
      return b.ocena.valueOf()-a.ocena.valueOf()
    })
    this.bliskeAtrakcije=this.bliskeAtrakcije.slice(0,10)
  
  }

  bliskiKorisnici:User[]=[]

  dohvatiAtrakcijeBliskihKorisnika(){
    //koristimo krug od 30km

    this.bliskiKorisnici=this.korisnici.filter(x=>
      this.haversineDistance(x.lokacija.lat,x.lokacija.lon,this.korisnik.lokacija.lat,this.korisnik.lokacija.lon)<=30 && x.korisnickoIme!=this.korisnik.korisnickoIme
    )

    const frekvencija={}

    this.bliskiKorisnici.forEach(kor => {
      kor.listaPosecenihLokacija.forEach(dest => {
        if(frekvencija[dest.toString()]){
          frekvencija[dest.toString()]++
        }else{
          frekvencija[dest.toString()]=1
        }
      });
    });

    let niz=Object.entries(frekvencija).sort((a,b)=>{
      return <number>b[1]-<number>a[1]
    })

    let niz2=niz.map(elem=> elem[0])
    niz2=niz2.slice(0,10)

    this.atrakcijeBliskihKorisnika=this.sveAtrakcije.filter(x=>
      niz2.includes(x._id.toString())
    )

  }

  korisniciSlicnihGodina:User[]=[]

  dohvatiAtrakcijeKorisnikaSlicnihGodina(){

    this.korisniciSlicnihGodina=this.korisnici.filter(x=>
      Math.abs(x.godine.valueOf()-this.korisnik.godine.valueOf())<=5 && x.korisnickoIme!=this.korisnik.korisnickoIme
    )

    const frekvencija={}

    this.korisniciSlicnihGodina.forEach(kor => {
      kor.listaPosecenihLokacija.forEach(dest => {
        if(frekvencija[dest.toString()]){
          frekvencija[dest.toString()]++
        }else{
          frekvencija[dest.toString()]=1
        }
      });
    });

    let niz=Object.entries(frekvencija).sort((a,b)=>{
      return <number>b[1]-<number>a[1]
    })

    let niz2=niz.map(elem=> elem[0])
    niz2=niz2.slice(0,10)

    this.atrakcijeKorisnikaSlicnihGodina=this.sveAtrakcije.filter(x=>
      niz2.includes(x._id.toString())
    )
  }


  drzave = ['Srbija', 'Severna Makedonija', 'Albanija', 'Crna Gora', 'Bosna i Hercegovina', 'Hrvatska', 'Slovenija', 'Madjarska', 'Rumunija', 'Bugarska'];

  tipovi = ['plaza', 'reka', 'jezero', 'banja', 'planina', 'spomenik'];

  kreirajVektor(destinacija:Atrakcija, drzave:string[], tipovi:string[]):number[]{
      let vektor = new Array(drzave.length + tipovi.length).fill(0);
      vektor[drzave.indexOf(destinacija.drzava.toString())] = 1;
      vektor[tipovi.indexOf(destinacija.tip.toString()) + drzave.length] = 1;
      return vektor;
  }

  kreirajKorisnickiVektor(destinacije):number[]{

      if(destinacije.length == 0){ // da pokrijemo slucaj kada korisnik nije posetio ni jednu atrakciju
        return new Array(this.drzave.length + this.tipovi.length).fill(0);
      }
      destinacije = destinacije.map((elem) => {return this.kreirajVektor(elem, this.drzave, this.tipovi);});
      let vektor = destinacije.reduce( (acc, val)=>{
          return acc.map((elem, index)=>{return elem + val[index];})
          
      }
          , new Array(this.drzave.length + this.tipovi.length).fill(0));
      
      return vektor.map((elem) => {return elem / destinacije.length});
  }

  kosinusnaSlicnost(vektor1:number[], vektor2:number[]):number{
      
      let proizvod = vektor1.reduce((acc, val, index) => acc + (val*vektor2[index]), 0);
      let moduo1 = Math.sqrt(vektor1.reduce((acc, val)=>{return acc + val*val}, 0));
      let moduo2 = Math.sqrt(vektor2.reduce((acc, val)=>{return acc + val*val}, 0));
      
      return proizvod / (moduo1*moduo2);
      
  }

  korisnickiVektor:number[]

  preporuceneDestinacije(destinacije:Atrakcija[], korisnickiVektor:number[], drzave:string[], tipovi:string[]):Atrakcija[]{

    let preporuka = destinacije.map(dest => {
          const destVektor = this.kreirajVektor(dest, drzave, tipovi);
          const slicnost = this.kosinusnaSlicnost(korisnickiVektor, destVektor)*dest.ocena.valueOf();
          return {dest, slicnost };
      }).sort((a, b) => b.slicnost - a.slicnost).slice(0,10);
    
    return preporuka.map(elem=>{
      return elem.dest
    })
  }


  filtriraj(){

    this.filtriraneAtrakcije=this.sveAtrakcije

    if(this.naziv!=""){
      this.filtriraneAtrakcije=this.filtriraneAtrakcije.filter(x=>{
        this.naziv=this.naziv.toLowerCase()
        return x.naziv.toLowerCase().includes(<string>this.naziv)
      }
      )  
    }

    if(this.drzava!=""){
      this.filtriraneAtrakcije=this.filtriraneAtrakcije.filter(x=>{
        this.drzava=this.drzava.toLowerCase()
        return x.drzava.toLowerCase().includes(<string>this.drzava)
      } 
      )  
    }
    
    if(this.tip!=""){
      this.filtriraneAtrakcije=this.filtriraneAtrakcije.filter(x=>{
        this.tip=this.tip.toLowerCase()
        return x.tip.toLowerCase().includes(<string>this.tip)
      }
      )  
    }

    if(this.ocena!=0){
      this.filtriraneAtrakcije=this.filtriraneAtrakcije.filter(x=>
          x.ocena.valueOf()>=this.ocena.valueOf()
      )    
    } 
  }

}
