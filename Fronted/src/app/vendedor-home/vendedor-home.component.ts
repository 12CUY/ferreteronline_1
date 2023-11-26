import { Component, OnInit} from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vendedor-home',
  templateUrl: './vendedor-home.component.html',
  styleUrls: ['./vendedor-home.component.css']
})

export class VendedorHomeComponent implements OnInit{
  productList:undefined | product[];
  productMessage:undefined | string;
  icon=faTrash;
  editIcon=faEdit;
  constructor(private product:ProductService){}

  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id:number){
    console.warn("test id",id);

    this.product.deleteProduct(id).subscribe((result)=>{
     if(result){
      this.productMessage="El producto a sido borrado";
      this.list();
     }
    });
    setTimeout(() =>{
      this.productMessage=undefined;
    },3000);
  }
  list(){
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList=result;
    });
  }
}
