import { Component,OnInit } from '@angular/core';
import { VendedorService } from '../services/vendedor.service';
import {Router} from '@angular/router'
import { SignUp } from '../data-type';

@Component({
  selector: 'app-vendedor-auth',
  templateUrl: './vendedor-auth.component.html',
  styleUrls: ['./vendedor-auth.component.css']
})

//controlar si se debe mostrar el formulario de inicio de sesión (showLogin )
//(authError) mensaje de error

export class VendedorAuthComponent implements OnInit {
  constructor(private vendedor:VendedorService,private router:Router){}
  showLogin=false;
  authError: string="";


  ngOnInit(): void{
    this.vendedor.reloadVendedor();
  }

  signUp(data:SignUp):void{
   this.vendedor.userSignUp(data);
  }


//(authError) error al inico de session 

  login(data:SignUp):void{
   this.authError="";
   this.vendedor.userLogin(data);
   this.vendedor.isLoginError.subscribe((isError)=>{
     if(isError){
      this.authError="Correo o Contraseña incorrectos";
     }
   });
   }

   
  //controla el fomulario de sesion o ingreso  

  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }
}
