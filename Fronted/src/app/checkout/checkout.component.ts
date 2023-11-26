import { cart, order } from '../data-type';
import { Component} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice:number | undefined;
  cartData:cart[]|undefined;
  orderMsg:string|undefined;
  constructor(private product:ProductService,private router: Router){}
  ngOnInit():void{
    this.product.currentCart().subscribe((result)=>{
      let price=0;
      this.cartData=result;
      result.forEach((item)=>{
        if(item.quantity){
         price=price+ (+item.price* + item.quantity);
        }
      });
      this.totalPrice=price+(price*0.12)+7-(price/50);;
      console.warn(this.totalPrice);
     });

  }
  orderNow(data:{email:string,address:string,contact:string}){
   let user = localStorage.getItem('user');
   let userId= user && JSON.parse(user).id;

   if(this.totalPrice){
    let orderData:order={
      ...data,
      totalPrice:this.totalPrice,
      userId,
      id:undefined
    }
    this.cartData?.forEach((item)=>{
     setTimeout(()=>{
      item.id && this.product.deleteCartItems(item.id);
     },700);
    });

    this.product.orderNow(orderData).subscribe((result)=>{
      if(result){
        this.orderMsg="Orden realizada con exito";
         setTimeout(() => {
          this.router.navigate(['/mis-ordenes']);
          this.orderMsg=undefined;
         }, 4000);
      }
    })
   }
  }
}

