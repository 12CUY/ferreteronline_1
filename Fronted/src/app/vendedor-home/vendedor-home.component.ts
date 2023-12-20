import { Component, OnInit, AfterViewInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-vendedor-home',
  templateUrl: './vendedor-home.component.html',
  styleUrls: ['./vendedor-home.component.css']
})

export class VendedorHomeComponent implements OnInit, AfterViewInit {
  productList: product[] = [];
  productMessage: string | undefined;
  icon = faTrash;
  editIcon = faEdit;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  ngAfterViewInit(): void {
    $(document).ready(() => {
      $('#dataTable').DataTable();
    });
  }

  // eliminar un producto con un identificador específico
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
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'El producto ha sido borrado';
        // Reinitialize DataTables after the list is updated
        $('#dataTable').DataTable().destroy();
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
      // Reinitialize DataTables after the list is updated
      $('#dataTable').DataTable().destroy();
      $(document).ready(() => {
        $('#dataTable').DataTable();
      });
    });
  }
}