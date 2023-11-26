import { Component,OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-mis-ordenes',
  templateUrl: './mis-ordenes.component.html',
  styleUrls: ['./mis-ordenes.component.css']
})

export class MisOrdenesComponent implements OnInit {
 orderData:order[]|undefined;
 constructor(private product:ProductService){}
 ngOnInit(): void {
   this.getOrderList();
 }
 cancelOrder(orderId:number|undefined){
  orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
   this.getOrderList();
  });
 }
 getOrderList(){
  this.product.orderList().subscribe((result)=>{
    this.orderData=result;
   });
 }
}

