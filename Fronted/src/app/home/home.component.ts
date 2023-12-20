import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
detalle() {
throw new Error('Method not implemented.');
}

  // Arreglo 
  // que almacena productos
  popularProducts:undefined | product[];  
  trendyProducts:undefined | product[];


  constructor(private product:ProductService){}


    // obtener datos sobre productos populares
    ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      console.warn(data);
      this.popularProducts=data;
    });

    //obtener y asignar los datos de productos de tendencia
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    });
    }

  
  


 
}
