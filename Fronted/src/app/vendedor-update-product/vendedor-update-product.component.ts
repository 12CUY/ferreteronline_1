import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-vendedor-update-product',
  templateUrl: './vendedor-update-product.component.html',
  styleUrls: ['./vendedor-update-product.component.css'],
})
export class VendedorUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage: undefined | string;

  constructor(
    private route: ActivatedRoute,    // obtener información sobre la ruta activa
    private product: ProductService,  // encapsular la lógica  obtención y manipulación de datos
    private router: Router            //  navegación entre diferentes componentes o rutas
  ) {}


  // obtener los parámetros de la ruta id 
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;
      });
  }


  // seguimiento de los datos que se están procesando data
  submit(data: product) {
    console.warn(data);

  // editando un producto existente 

    if (this.productData) {
      data.id = this.productData.id;
    }

    // Actualizar la información del producto (updateProduct)
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'El producto ha sido actualizado';

        // Muestra SweetAlert con mensaje
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El producto ha sido actualizado',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirige a vendedor-home después de hacer clic en OK
          this.router.navigate(['/vendedor-home']);
        });
      }
    });

    // Establece un temporizador para limpiar el mensaje
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
