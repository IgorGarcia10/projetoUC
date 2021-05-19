import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categorias: Categoria[] = [];
  private listaCategoriaAtualizada = new Subject<Categoria[]>()
  
  constructor() { }

  getCategorias(): Categoria[]{
    return [...this.categorias];
  }

  adicionarCategorias(nome:string){
    const categoria: Categoria ={
      nome: nome
    };

    this.categorias.push(categoria)
    // console.log(this.categorias)

    this.listaCategoriaAtualizada.next([...this.categorias])
  }

  //criação de metodo para que outros componentes possam observar o listaCategoriaAtualizada
  getListaCategoriaAtualizadaObservable(){
    return this.listaCategoriaAtualizada.asObservable()
  }
}
