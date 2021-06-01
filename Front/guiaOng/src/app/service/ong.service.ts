import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ong } from '../model/ong.model';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  private ongs: Ong[] = [];
  private listaOngsAtualizada = new Subject<Ong[]>()

  constructor() { }

  getOngs(): Ong[]{
    return [...this.ongs];
  }

  getListaOngsAtualizaObservable(){
    return this.listaOngsAtualizada.asObservable();
  }

  adicionarOng( nome:string, cnpj:string, email:string, telefone:string, endereco:string, categoria:string, descricao:string){
    const ong: Ong = {
      nome: nome,
      cnpj: cnpj,
      email: email,
      telefone: telefone,
      endereco: endereco,
      categoria: categoria,
      descricao: descricao 
    }
    this.ongs.push(ong);

    this.listaOngsAtualizada.next([...this.ongs]);
  }

}
