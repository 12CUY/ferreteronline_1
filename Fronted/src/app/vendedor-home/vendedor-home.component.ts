import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vendedor-home',
  templateUrl: './vendedor-home.component.html',
  styleUrls: ['./vendedor-home.component.css']
})

export class VendedorHomeComponent implements OnInit {
  productList: product[] = [];
  productMessage: string | undefined;
  icon = faTrash;
  editIcon = faEdit;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number, productName: string) {
    Swal.fire({
      title: `¿Estás seguro de eliminar ${productName}?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.performDelete(id);
      }
    });
  }

  private performDelete(id: number) {
    // Puedes obtener el nombre del producto aquí si es necesario
    // const productName = this.productList.find(item => item.id === id)?.name;

    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'El producto ha sido borrado';
        this.list();
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    });
  }
}
