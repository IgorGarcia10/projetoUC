import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthData } from '../auth/auth-data.model';
import { User } from '../model/user';
import { UserLogin } from '../model/userLogin';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public admin: string | any;
  public email: string | any;
  public idUsuario: string | any
  public usuario: AuthData | any

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  // public onUsuario(){
  //   const usuarios = this.usuarioService.obterDadosDeAutenticacao()
  //   this.admin = usuarios?.admin;
  //   this.idUsuario = usuarios?.idUsuario

  //   this.usuarioService.getUsuario(this.idUsuario)
  //   .subscribe( dadosU => {
  //     this.usuario = {
  //       id: dadosU._id,
  //       email: dadosU.email,
  //       admin: dadosU.admin
  //     };
  //     environment.admin = dadosU.admin
  //     environment.email = dadosU.email
  //     this.admin = environment.admin
  //     this.email = environment.email
  //     // console.log(this.usuario)
  //     // console.log(environment.email)
  //   });
  // }

   

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

  userAdmin(){
    let ok = false
    let admin = environment.admin
    if (admin == 'true'){
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
