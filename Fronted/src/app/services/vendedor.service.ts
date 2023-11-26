import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { login, SignUp } from '../data-type';
import {BehaviorSubject} from 'rxjs'
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  isSellerLoggedIn=new BehaviorSubject<boolean>(false);
  isLoginError=new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(data:SignUp){
   this.http.post('http://localhost:3000/vendedor',data,{observe:'response'}).subscribe((result)=>{
    this.isSellerLoggedIn.next(true);
    localStorage.setItem('vendedor',JSON.stringify(result.body));
    this.router.navigate(['vendedor-home']);
   });
  }
  reloadVendedor(){
    if(localStorage.getItem('vendedor')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['vendedor-home']);
    }
  }
  userLogin(data:login){
   console.warn(data);
   //Llamado de la api
   this.http.get(`http://localhost:3000/vendedor/?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe((result:any)=>{
    console.warn(result);
    if(result && result.body && result.body.length){
      console.warn("Usuario Logueado");
      localStorage.setItem('vendedor',JSON.stringify(result.body));
      this.router.navigate(['vendedor-home']);
    }else{
      console.warn("No se encuentra logueado");
      this.isLoginError.emit(true);
    }
  });
 }
}
