import { Component,OnInit } from '@angular/core';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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

    // Inyecta el servicio ProductService en el componente

  constructor(private product:ProductService, private router:Router){}

  ngOnInit(): void {

    //cargar los detalles del carrito al iniciar el componente
    this.loadDetails();
  }
  // Método para eliminar un producto del carrito
  removeToCart(cartId: number | undefined, productName: string | undefined): void {
    if (cartId && productName) {
      Swal.fire({
        title: `¿Estás seguro de eliminar ${productName}?`,
        text: 'No podrás revertir esto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          // Si el usuario hace clic en "Sí, eliminar"
          this.product.removeToCart(cartId).subscribe(() => {

            // Puedes agregar cualquier lógica adicional aquí
            // (por ejemplo, actualizar el total del carrito, etc.)
            Swal.fire(
              'Eliminado',
              `El producto ${productName} ha sido eliminado del carrito.`,
              'success'
            ).then(() => {
              
              // Recargar los detalles después de la eliminación
              this.loadDetails();
            });
          });
        }
      });
    }
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
      this.priceSummary.delivery = 3;
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
