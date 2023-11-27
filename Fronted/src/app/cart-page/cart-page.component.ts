import { Component,OnInit } from '@angular/core';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

// Mi carrito
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  // Arreglo 
  // que almacena los detalles de los productos en el carrito
  cartData:cart[] | undefined;

  //objeto
  // contiene el resumen de precios 
  priceSummary:priceSummary={
    price: 0,
    iva: 0,
    delivery: 0,
    total: 0,
    discount: 0
  }

  constructor(private product:ProductService, private router:Router){}

  ngOnInit(): void {
    //cargar los detalles del carrito al iniciar el componente
    this.loadDetails();
  }
  // Método para eliminar un producto del carrito
  removeToCart(cartId: number | undefined): void {
    cartId &&
      this.cartData &&
      this.product.removeToCart(cartId).subscribe(() => {
        // Recargar los detalles después de la eliminación
        this.loadDetails();
      });
  }

  // Método para cargar los detalles del carrito y calcular el resumen de precios
  loadDetails(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;

      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      // metodos de calculo del total de productos
      this.priceSummary.price = +price.toFixed(2);
      this.priceSummary.iva = +(price * 0.12).toFixed(2);
      this.priceSummary.delivery = 7;
      this.priceSummary.total = +(price + this.priceSummary.iva + this.priceSummary.delivery).toFixed(2);

      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    });
  }
  checkout():void{
    // navega a la pagina de pago al finalizar la compra 
    this.router.navigate(['/checkout']);
  }
}
