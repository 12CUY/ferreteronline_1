import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  searchResult:undefined | product[];  // variable y objeto
  
  // Inyecta el servicio ActivatedRoute en el componente

  constructor(private activeRoute:ActivatedRoute,private product:ProductService){}
  
  ngOnInit(): void {
     // acceder al valor del parámetro llamado 'query' en la URL actual
     // snapshot instantánea estática de la ruta actual
     // proporciona un mapa de todos los parámetros de la URL
    let query= this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProducts(query).subscribe((result)=>{
      this.searchResult=result;
    });
  }
}
