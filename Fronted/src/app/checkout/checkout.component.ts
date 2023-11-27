import { cart, order} from '../data-type';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice: number | undefined; // Variable para almacenar el precio total de la orden
  cartData: cart[] | undefined; // Datos del carrito
  orderMsg: string | undefined; // Mensaje de estado de la orden

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Al inicializar el componente, obtenemos los detalles del carrito y calculamos el precio total
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;

      // Calcula el precio total sumando los productos en el carrito
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
      });

      // Calcula el precio total con impuestos, envío y descuento
      this.totalPrice = +(price + (price * 0.12) + 7).toFixed(2);
      console.warn(this.totalPrice); // Muestra el precio total en la consola
    });
  }

  orderNow(data: { email: string; address: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      // Crea un objeto de orden con la información del usuario y el precio total
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      };

      // Elimina los elementos del carrito uno por uno después de un breve retraso
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700);
      });

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          // Utiliza SweetAlert para mostrar un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Orden realizada con éxito!',
            text: 'Serás redirigido a tus órdenes en unos segundos...',
            timer: 4000, // 4 segundos
            timerProgressBar: true,
            showConfirmButton: false
          }).then(() => {
            // Redirige a la página de órdenes después de 4 segundos
            this.router.navigate(['/mis-ordenes']);
          });
        }
      });
    }
  }
}