import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserOng } from '../model/userOng';
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
  entrar(user: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('http//:localhost:8080/usuarios/logar', user)
  }



  cadastrar(user: User): Observable<User>{
    return this.http.post<User>('http//:localhost:8080/usuarios/cadastrar', user)
  }

  cadastrarOng(userOng: UserOng): Observable<UserOng>{
    return this.http.post<UserOng>('http//:localhost:8080/usuarios/cadastrar', userOng)
  }

}
