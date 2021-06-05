import { Usuario } from '../model/usuario.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../auth/auth-data.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class UsuarioService {
    private usuarios: Usuario[] = [];
    private listaUsuariosAtualizada = new Subject<Usuario[]>();
    private token: string | any;
    private authStatusSubject = new Subject<boolean>();

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {
    }

    criarUsuario(email: string, senha: string) {
        const authData: AuthData = {
            email: email,
            password: senha
        }
        this.httpClient.post("http://localhost:3000/api/usuario/signup", authData)
            .subscribe(
                resposta => {
                    console.log(resposta)
                });
    }

    login(email: string, senha: string) {
        const authData: AuthData = {
            email: email,
            password: senha
        }
        this.httpClient.post<{ token: string }>("http://localhost:3000/api/usuario/login",
            authData).subscribe(resposta => {
                this.token = resposta.token;
                this.authStatusSubject.next(true);
                this.router.navigate(['/'])
            });
    }

    public getToken(): string {
        return this.token;
    }

    public getStatusSubject() {
        return this.authStatusSubject.asObservable();
    }

    logout() {
        this.token = null;
        this.authStatusSubject.next(false);
        this.router.navigate(['/'])
    }


    getUsuario(idUsuario: string) {
        // return { ...this.categorias.find((cli) => cli.id === idCategoria)};
        return this.httpClient.get<{ _id: string, email: string, password: string }>(
            `http://localhost:3000/api/usuario/${idUsuario}`
        )
    }

    getListaDeUsuariosAtualizadaObservable() {
        return this.listaUsuariosAtualizada.asObservable();
    }
}