import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  compras() {
throw new Error('Method not implemented.');
}

comprar: any;

addToComp() {
throw new Error('Method not implemented.');
}
 productData:undefined | product;  //variables y objetos
 productQuantity:number=1;        // variable que almacena la cantidad de productos
 removeCart=false;                // variable booleana que indica si se debe quitar
 cartData:product | undefined;     //variables y objetos
  route: any;                     //variable que se declara pero no se inicializa

    // Inyecta el servicio ActivatedRoute en el componente

 constructor(private activeRoute:ActivatedRoute,private product:ProductService){}

 ngOnInit(): void {
  let productId=this.activeRoute.snapshot.paramMap.get('productId');
  console.warn(productId);
  productId && this.product.getProduct(productId).subscribe((result)=>{
    console.warn(result);
    this.productData=result;
    let cartData= localStorage.getItem('localCart');
    if(productId && cartData){
     let items=JSON.parse(cartData);
     items = items.filter((item:product)=>productId==item.id.toString())
     if(items.length){
      this.removeCart=true;
     }else{
      this.removeCart=false;
     }
    }
     let user=localStorage.getItem('user');
     if(user){
      let userId=user && JSON.parse(user).id;
      this.product.getCartList(userId);
      this.product.cartData.subscribe((result)=>{
      let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
      if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
      }
    });
   }
  });
 }


 //  ajustar dinámicamente la cantidad del producto
 handleQuantity(val:string){
  if(this.productQuantity<20 && val==='max'){
   this.productQuantity+=1;
  }else if(this.productQuantity>1 && val==='min'){
    this.productQuantity-=1;
  }
 }


 // Método de compra de un producto del carrito

 compra(){
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1900,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Se Añadio Correctamente"
  });
  
  };

 addToCart(){
Swal.fire({
  title: 'Se Añadio Correctamente',
    text: '',
    icon: 'success',

});



  if(this.productData){
    this.productData.quantity=this.productQuantity;
    if(!localStorage.getItem('user')){
      this.product.localaddToCart(this.productData);
      this.removeCart=true;
    }else{
      let user=localStorage.getItem('user');
      let userId= user && JSON.parse(user).id;
      let cartData:cart={
        ...this.productData,
        userId,
        productId:this.productData.id,
      }
      delete cartData.id;
      this.product.addToCart(cartData).subscribe((result)=>{
        if(result){
          this.product.getCartList(userId);
          this.removeCart=true;
        }
      });
    }
  }
 }



  // Método para eliminar un producto del carrito

 removeToCart(productId:number){
  Swal.fire({
    title: 'Desea Eliminar',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí, Seguro',
      cancelButtonText: 'No, Estoy Seguro'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar 
        localStorage.getItem('user');
        // Redirigir a la página 
        this.route.navigate(['/']);
      }
  
  });

  if(!localStorage.getItem('user')){
    this.product.removeItemFromCart(productId);
  }else{
    let user= localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
   console.warn(this.cartData);

   this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
      let user=localStorage.getItem('user');
      let userId=user && JSON.parse(user).id;
      this.product.getCartList(userId);
   });
   this.removeCart=false;
  }
 }


}
