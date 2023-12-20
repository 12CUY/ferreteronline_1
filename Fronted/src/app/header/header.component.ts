import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  menuType: string='default';  //variable para el menu
  vendedorName:string='';      //variable del vendedor con una cadena vacia
  userName:string='';          //variable del usuario con cadena vacia
  searchResult:undefined | product[];   //variable de resultado
  cartItems=0;                          //item para el carrito con valor inicial 0

  constructor(private route:Router,private product:ProductService){}
ngOnInit(): void {
      // Al inicializar el componente, obtenemos los detalles header como cerrar sesion entre otros 
  this.route.events.subscribe((val:any)=>{
  if(val.url){
    console.warn(val.url);
    if(localStorage.getItem('vendedor') && val.url.includes('vendedor')){
        let vendedorTienda=localStorage.getItem('vendedor');
        let vendedorDatos= vendedorTienda && JSON.parse(vendedorTienda)[0];
        this.vendedorName=vendedorDatos.name;

       //verifica si hay valores almacenados en user
       //inicio de sision e informacion (metodo "get...") 
      }else if(localStorage.getItem('user')){
        let userTienda=localStorage.getItem('user');
        let userDatos= userTienda && JSON.parse(userTienda);
        this.userName=userDatos.name;
        this.menuType='user';
        this.product.getCartList(userDatos.id);
      }else{
      this.menuType='default';
     }
   }
  });
 
  //valor almacenado en local con clave de localcart en una variable
  //cantidad de elementos en el carrito basándose en los datos
  let cartData = localStorage.getItem('localCart');
  if(cartData){
    this.cartItems=JSON.parse(cartData).length;
  }

  //cambios se actualiza en cartitems
  this.product.cartData.subscribe((items)=>{
    this.cartItems=items.length;
  });
}

//para cerra sesion alerta
logOut() {
  Swal.fire({
    title: 'Cerrar sesión',
    text: '¿Estás seguro de que quieres cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'No, cancelar'
  }).then((result) => {

    if (result.isConfirmed) {
      // Eliminar del localStorage
      localStorage.removeItem('vendedor');
      // Redirigir a la pagina de inicio
      this.route.navigate(['/']);
    }
  });
}


userlogOut() {

  Swal.fire({
    title: 'Cerrar sesión',
    text: '¿Estás seguro de que quieres cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'No, cancelar'

  }).then((result) => {
    if (result.isConfirmed) {
      // Eliminar del localStorage
      localStorage.removeItem('user');
      // Redirigir a la página de user-auth
      this.route.navigate(['/user-auth']);
      // Evento para eliminar en carrito
      this.product.cartData.emit([]);
    }
  });
}


  searchProduct(query:KeyboardEvent){
   if(query){
    const element=query.target as HTMLInputElement;
    this.product.searchProducts(element.value).subscribe((result)=>{
      if(result.length>5){
        result.length=5;
      }
      this.searchResult=result;
    });
   }
  }
  hideSearch(){
    this.searchResult=undefined;
  }

  //redirigir la aplicación a la página de detalles con id
  redirectToDetails(id:number){
   this.route.navigate(['/details/'+id])
  }

  // redirigir la aplicación a la página de búsqueda con valor proporcionado
  submitSearch(val:string){
   this.route.navigate([`search/${val}`]);
  }
}
