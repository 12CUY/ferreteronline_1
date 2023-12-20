import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs'; // Importa el paquete bcryptjs

@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  private baseUrl = 'http://localhost:3000';
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  async userSignUp(data: SignUp) {
    try {
      // Hashea la contraseña antes de enviarla al servidor
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const requestData = { ...data, password: hashedPassword };

      this.http.post(`${this.baseUrl}/vendedor`, requestData, { observe: 'response' }).subscribe(
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
    } catch (error) {
      console.error('Error al hashear la contraseña:', error);
    }
  }

  reloadVendedor() {
    if (localStorage.getItem('vendedor')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['vendedor-home']);
    }
  }

  async userLogin(data: login) {
    try {
      const response: any = await this.http.post(`${this.baseUrl}/vendedor/login`, data, { observe: 'response' }).toPromise();
      
      const user = response.body;
  
      // Compara la contraseña proporcionada con la contraseña hasheada almacenada en el servidor
      const isPasswordValid = await bcrypt.compare(data.password, user.password);
  
      if (isPasswordValid) {
        // Manejar la respuesta del servidor
        console.log('Usuario Logueado:', user);
        localStorage.setItem('vendedor', JSON.stringify(user));
        this.router.navigate(['vendedor-home']);
      } else {
        console.error('Credenciales inválidas');
        this.isLoginError.emit(true);
      }
    } catch (error) {
      // Manejar el error
      console.error('No se encuentra logueado:', error);
      this.isLoginError.emit(true);
    }
  }
}