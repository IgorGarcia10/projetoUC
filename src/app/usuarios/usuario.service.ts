import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class UsuarioService {
    private usuarios: Usuario[] = [];
    private listaUsuariosAtualizada = new Subject<Usuario[]>();

    constructor (private httpClient: HttpClient){
    }
    
    getUsuarios(): Usuario[] {
        return [...this.usuarios];
    }
    adicionarUsuario(tipo: string, nome: string, fone: string, email: string, cpf: string, senha: string,cep: string, lagradouro: string, numero: string, complemento: string, bairro: string, uf: string, cidade: string, dataNascimento: Date,) {
        const usuario: Usuario = {
            tipo: tipo,
            nome: nome,
            fone: fone,
            email: email,
            cpf: cpf, 
            senha: senha,
            cep: cep, 
            lagradouro: lagradouro,
            numero: numero, 
            complemento: complemento, 
            bairro: bairro, 
            uf: uf, 
            cidade: cidade,
            dataNascimento: dataNascimento,
        };
        this.usuarios.push(usuario);
        this.listaUsuariosAtualizada.next([...this.usuarios]);
        console.log(this.usuarios);
        console.log(usuario);
    }
    getListaDeUsuariosAtualizadaObservable() {
        return this.listaUsuariosAtualizada.asObservable();
    }
}