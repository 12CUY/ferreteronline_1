import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  private baseUrl = 'http://localhost:3000';
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SignUp) {
    this.http.post(`${this.baseUrl}/vendedor`, data, { observe: 'response' }).subscribe(
      (response: any) => {
        // Manejar la respuesta del servidor
        console.log('Registro exitoso:', response);
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('vendedor', JSON.stringify(response.body));
        this.router.navigate(['vendedor-home']);
      },
      (error) => {
        // Manejar el error
        console.error('Error al registrar vendedor:', error);
      }
    );
  }

  reloadVendedor() {
    if (localStorage.getItem('vendedor')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['vendedor-home']);
    }
  }

  userLogin(data: login) {
    this.http.post(`${this.baseUrl}/vendedor/login`, data, { observe: 'response' }).subscribe(
      (response: any) => {
        // Manejar la respuesta del servidor
        console.log('Usuario Logueado:', response);
        localStorage.setItem('vendedor', JSON.stringify(response.body));
        this.router.navigate(['vendedor-home']);
      },
      (error) => {
        // Manejar el error
        console.error('No se encuentra logueado:', error);
        this.isLoginError.emit(true);
      }
    );
  }
}
