// Importa las clases necesarias desde Angular core y tus tipos de datos personalizados
import { Component, OnInit } from '@angular/core';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';

// Define el componente Angular
@Component({
  selector: 'app-mis-ordenes',
  templateUrl: './mis-ordenes.component.html',
  styleUrls: ['./mis-ordenes.component.css'],
})
export class MisOrdenesComponent implements OnInit {
  // Declara variables para almacenar datos de carrito y orden
  cartData: cart[] | undefined;
  orderData: order[] | undefined;

  // Inyecta el servicio ProductService en el componente
  constructor(private product: ProductService) {}

  // Método que se llama automáticamente cuando el componente se inicializa
  ngOnInit(): void {
    // Llama al método para obtener la lista de órdenes cuando el componente se inicia
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    // Verifica si orderId tiene un valor y luego muestra una alerta para confirmar la cancelación
    if (orderId) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción cancelará la orden seleccionada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No, conservar',
      }).then((result) => {
        // Si el usuario confirma, llama al servicio para cancelar la orden y actualiza la lista
        if (result.isConfirmed) {
          this.product.cancelOrder(orderId).subscribe(() => {
            this.getOrderList();
          });
        }
      });
    }
  }

  // Método para obtener la lista de órdenes
  getOrderList() {
    // Llama al servicio para obtener la lista de órdenes y actualiza orderData con el resultado
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
