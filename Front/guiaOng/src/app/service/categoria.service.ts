import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categorias: Categoria[] = [];
  private listaCategoriaAtualizada = new Subject<Categoria[]>()

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategoria(idCategoria: string){
    // return { ...this.categorias.find((cli) => cli.id === idCategoria)};
    return this.httpClient.get<{_id: string, nome: string}>(
      `http://localhost:3000/api/categorias/${idCategoria}`
    )
  }

  getCategorias(): void {
    this.httpClient.get<{ mensagem: string, categorias: any }>(
      'http://localhost:3000/api/categorias'
    )
      .pipe(
        map((dados) => {
          return dados.categorias.map((categoria: { _id: any; nome: any; }) => {
            return {
              id: categoria._id,
              nome: categoria.nome
            }
          })
        })
      )
      .subscribe(
        (categorias) => {
          this.categorias = categorias;
          this.listaCategoriaAtualizada.next([...this.categorias]);
        }
      )
  }

  adicionarCategorias(nome: string) {
    const categoria: Categoria = {
      id: "",
      nome: nome
    };
    this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/categorias', categoria)
      .subscribe(
        (dados) => {
          console.log(dados.mensagem);
          categoria.id = dados.id;
          this.categorias.push(categoria);
          this.listaCategoriaAtualizada.next([...this.categorias])
        }
      )
  }

  removerCategoria(id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/categorias/${id}`)
    .subscribe(() => {
      this.categorias = this.categorias.filter((cli) => {
        return cli.id !== id
      });
      this.listaCategoriaAtualizada.next([...this.categorias]);
      console.log(`Cliente de id: ${id} removido`);
    })
  }

  atualizarCategoria(id: string, nome: string){
    const categoria: Categoria = { id, nome};
    this.httpClient.put(`http://localhost:3000/api/categorias/${id}`, categoria)
    .subscribe((res =>{
      const copia = [ ...this.categorias];
      const indice = copia.findIndex(cli => cli.id === categoria.id);
      copia[indice] = categoria;
      this.categorias = copia;
      this.listaCategoriaAtualizada.next([...this.categorias]);
    }));
  }

  //criação de metodo para que outros componentes possam observar o listaCategoriaAtualizada
  getListaCategoriaAtualizadaObservable() {
    return this.listaCategoriaAtualizada.asObservable()
  }
}


