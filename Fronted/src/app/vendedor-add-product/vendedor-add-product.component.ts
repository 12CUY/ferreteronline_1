import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-vendedor-add-product',
  templateUrl: './vendedor-add-product.component.html',
  styleUrls: ['./vendedor-add-product.component.css']
})

export class VendedorAddProductComponent implements OnInit {
  addProductMessage:string|undefined;
   constructor(private product:ProductService) { }
   ngOnInit(): void {
   }

   submit(data:product){

    if (!data.valid) {
      this.addProductMessage = "Por favor, complete todos los campos obligatorios.";
      return;
    }
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addProductMessage="Producto creado exitosamente";
      }

      //temporizador (setTimeout) para el producto

       setTimeout(() => (this.addProductMessage = undefined),3000);
    });
  }
}

//confirmado