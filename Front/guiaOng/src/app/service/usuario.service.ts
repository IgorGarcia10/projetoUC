import { Usuario } from '../model/usuario.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../auth/auth-data.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })

export class UsuarioService {
    private usuarios: Usuario[] = [];
    private usuario: AuthData;
    private listaUsuariosAtualizada = new Subject<Usuario[]>();
    private token: string | any;
    validade: any;
    private id: string | any;
    private email: string | any;
    private authStatusSubject = new Subject<boolean>();
    private autenticado: boolean = false;
    private tokenTimer: NodeJS.Timer | any;
    private idUsuario: string | any;
    private admin: string | any;
    private usuarioadmin: string | any;

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {
    }

    public onUsuario() {
        const usuarios = this.obterDadosDeAutenticacao();
        this.admin = usuarios?.admin;
        this.idUsuario = usuarios?.idUsuario
        // this.getUsuario(this.idUsuario).subscribe(resp => {
        //     this.admin = resp.admin
        // });
        // console.log(this.admin)
        
        
    
    }

    criarUsuario(email: string, senha: string, admin: string) {
        const authData: AuthData = {
            email: email,
            password: senha,
            admin: admin
        }
        this.httpClient.post("http://localhost:3000/api/usuario/signup", authData)
            .subscribe(
                resposta => {
                    console.log(resposta)
                });
    }

    login(email: string, senha: string, admin: any) {
        const authData: AuthData = {
            email: email,
            password: senha,
            admin: admin
        }
        this.httpClient.post<{
            token: string,
            expiresIn: number,
            idUsuario: string,
            admin: string,
            email: string
        }>("http://localhost:3000/api/usuario/login", authData).subscribe(resposta => {
            this.token = resposta.token;
            if (this.token) {
                const tempoValidadeToken = resposta.expiresIn;
                this.tokenTimer = setTimeout(() => {
                    this.logout()
                }, tempoValidadeToken * 1000);
                this.autenticado = true;
                this.idUsuario = resposta.idUsuario;
                this.email = resposta.email
                // this.getUsuario(this.idUsuario).subscribe(resp => {
                //     this.admin = resp.admin
                // });
                this.admin = resposta.admin;
                this.authStatusSubject.next(true);
                this.salvarDadosDeAutenticacao(this.token, new Date(new Date().getTime() +
                    tempoValidadeToken * 1000), this.idUsuario, this.admin, this.email);
                this.router.navigate(['/'])
            }
        });
    }

    public getIdUsuario() {
        return this.idUsuario;
    }

    public getToken(): string {
        return this.token;
    }

    public getStatusSubject() {
        return this.authStatusSubject.asObservable();
    }

    public isAutenticado(): boolean {
        return this.autenticado;
    }

    public getUserAdmin(){
        const admin = localStorage.getItem('admin');
        this.admin = admin
        return this.admin;
    }

    public getEmailUser(){
        const email = localStorage.getItem('email');
        this.email = email;
        return this.email;
    }

    logout() {
        this.token = null;
        this.authStatusSubject.next(false);
        clearTimeout(this.tokenTimer);
        this.idUsuario = null;
        this.admin = null;
        this.email = null;
        this.removerDadosDeAutenticacao()
        this.router.navigate(['/'])
    }

    public obterDadosDeAutenticacao() {
        const token = localStorage.getItem('token');
        const validade = localStorage.getItem('validade');
        const idUsuario = localStorage.getItem('idUsuario');
        const admin = localStorage.getItem('admin');
        const email = localStorage.getItem('email');

        return (token && validade) ? { token: token, validade: new Date(validade), idUsuario: idUsuario, admin: admin, email: email } : null;
    }

    autenticarAutomaticamente() {
        const dadosAutenticacao = this.obterDadosDeAutenticacao();
        if (dadosAutenticacao) {
            //pegamos a data atual
            const agora = new Date();
            //verificamos a diferenca entre a validade e a data atual
            const diferenca = dadosAutenticacao.validade.getTime() - agora.getTime();
            //se a diferença for positiva, o token ainda vale
            console.log(diferenca);
            if (diferenca > 0) {
                this.token = dadosAutenticacao.token;
                // console.log(dadosAutenticacao);
                this.autenticado = true;
                this.idUsuario = dadosAutenticacao.idUsuario;
                this.admin = dadosAutenticacao.admin;
                this.email = dadosAutenticacao.email;
                //diferença ja esta em milissegundos, não multiplique!
                this.tokenTimer = setTimeout(() => {
                    this.logout()
                }, diferenca);
                this.authStatusSubject.next(true);
            }
        }
    }

    private salvarDadosDeAutenticacao(token: string, validade: Date, idUsuario: string, admin: string, email: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('validade', validade.toISOString());
        localStorage.setItem('idUsuario', idUsuario);
        localStorage.setItem('admin', admin);
        localStorage.setItem('email', email);
    }

    private removerDadosDeAutenticacao() {
        localStorage.removeItem('token');
        localStorage.removeItem('validade');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('admin');
        localStorage.removeItem('email');
    }


    getUsuario(idUsuario: string) {
        // return { ...this.categorias.find((cli) => cli.id === idCategoria)};
        return this.httpClient.get<{ _id: string, email: string, password: string, admin: string }>(
            `http://localhost:3000/api/usuario/${idUsuario}`
        )
    }

    getListaDeUsuariosAtualizadaObservable() {
        return this.listaUsuariosAtualizada.asObservable();
    }
}