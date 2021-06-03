import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../model/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<Usuario[]>()

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  
  getUsuario(idUsuario: string){
    return this.httpClient.get<{_id: string, nome: string, email: string, senha: string}>(
      `http://localhost:3000/api/usuarios/${idUsuario}`
    );
  }

  getUsuarios(): void {
    this.httpClient.get<{
      mensagem: string,usuarios: any
    }>(
      'http://localhost:3000/api/usuarios'
    )
      .pipe(
        map((dados) => {
          return dados.usuarios.map((usuario: { _id: any; nome: any; email: any; senha: any; }) => {
            return {
              id: usuario._id,
              nome: usuario.nome,
              email: usuario.email,
              senha: usuario.senha,
            }
          })
        })
      )
      .subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
          this.listaUsuariosAtualizada.next([...this.usuarios]);
        }
      )
  }

  getListaOngsAtualizaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
  }

  adicionarUsuario(nome: string, email: string, senha: string) {
    const usuario: Usuario = {
      id: "",
      nome: nome,
      email: email,
      senha: senha,
    }
    this.httpClient.post<{
      mensagem: string,
      id: string
    }>(
      'http://localhost:3000/api/usuarios', usuario
    ).subscribe(
      (dados) => {
        usuario.id = dados.id;
        this.usuarios.push(usuario);
        this.listaUsuariosAtualizada.next([...this.usuarios]);
        this.router.navigate(['/cadastrar']);
      }
    )
  }


  removerUsuario(id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/usuarios/${id}`)
    .subscribe(() =>{
      this.usuarios = this.usuarios.filter((usuario) =>{
        return usuario.id !== id
      });
      this.listaUsuariosAtualizada.next([...this.usuarios]);
      console.log(`Usuario de id: ${id} removida`);
    });
  }

  atualizarUsuario(id: string, nome: string, email: string, senha: string){
    const usuario: Usuario = {id, nome, email, senha};
    this.httpClient.put(`http://localhost:3000/api/usuarios/${id}`, usuario)
    .subscribe((res => {
      const copia = [...this.usuarios];
      const indice = copia.findIndex(usuario => usuario.id === usuario.id);
      copia[indice] = usuario;
      this.usuarios = copia;
      this.listaUsuariosAtualizada.next([...this.usuarios]);
      this.router.navigate(['/cadastrar']);
    }));

  }

}
