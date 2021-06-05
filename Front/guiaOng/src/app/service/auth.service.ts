import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserLogin } from '../model/userLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

   

  //caminhos devem estar iguais aos mensionados no beck
  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('http//:localhost:8080/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>('http//:localhost:8080/usuarios/cadastrar', user)
  }

  btnLogin() {
    let ok = false
    let token = localStorage.getItem('token')
    if (token == null) {
      ok = true
    }
    return ok
  }

  btnSair() {
    let ok = false
    let token = localStorage.getItem('token')
    if (token != null) {
      ok = true
    }
    return ok
  }

  userLogado() {
    let ok = false
    let token = localStorage.getItem('token')
    if (token != null) {
      ok = true
    }
    return ok
  }

  userNLogado() {
    let ok = false
    let token = localStorage.getItem('token')
    if (token == null) {
      ok = true
    }
    return ok
  }



}
