import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(user: SignUp) {
    this.http.post("http://localhost:3000/api/user/signup", user, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }

  userLogin(data: login) {
    this.http.post<SignUp[]>('http://localhost:3000/api/user/login', data, {
      observe: 'response'
    })
    .subscribe((result) => {
      if (result && result.body?.length) {
        this.invalidUserAuth.emit(false);
        // Cambiado de 'signup' a 'user' y almacenando el nombre del usuario
        localStorage.setItem('user', JSON.stringify({
          name: result.body[0].name,
          email: result.body[0].email
        }));
        this.router.navigate(['/']);
      } else {
        this.invalidUserAuth.emit(true);
      }
    });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
