import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-vendedor-update-product',
  templateUrl: './vendedor-update-product.component.html',
  styleUrls: ['./vendedor-update-product.component.css']
})


export class VendedorUpdateProductComponent implements OnInit {
  productData:undefined | product;
  productMessage:undefined | string;
  constructor (private route: ActivatedRoute, private product:ProductService) {}


//obtener información sincrónica(snapshot)
//mapa de los parámetros (paramMap)

ngOnInit(): void {
  let productId= this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data);
      this.productData=data;
    });
  }

//aqui se asigna un id al data (prodcuto)

  submit(data:product){
    console.warn(data);
    if(this.productData){
     data.id=this.productData.id;
    }

  //actualizar la información del producto (updateProduct)  

    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="El producto a sido actualizado";
      }
    });

  //se establece un temporizador 
   
    setTimeout(()=>{
      this.productMessage=undefined;
    },3000);
  }
}
