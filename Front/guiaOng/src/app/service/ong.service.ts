import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ong } from '../model/ong.model';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  private ongs: Ong[] = [];
  private listaOngsAtualizada = new Subject<Ong[]>()

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getOng(idOng: string){
    // return { ...this.ongs.find((ong) => ong.id === idOng)};
    return this.httpClient.get<{_id: string, nome: string, cnpj: string, email: string, telefone: string, endereco: string, foto: string, qrcode: string, categoria: string, descricao: string}>(
      `http://localhost:3000/api/ongs/${idOng}`
    );
  }

  getOngs(): void {
    this.httpClient.get<{
      mensagem: string,ongs: any
    }>(
      'http://localhost:3000/api/ongs'
    )
      .pipe(
        map((dados) => {
          return dados.ongs.map((ong: { _id: any; nome: any; cnpj: any; email: any; telefone: any; endereco: any; foto: any; qrcode: any; categoria: any; descricao: any; }) => {
            return {
              id: ong._id,
              nome: ong.nome,
              cnpj: ong.cnpj,
              email: ong.email,
              telefone: ong.telefone,
              endereco: ong.endereco,
              foto: ong.foto,
              qrcode: ong.qrcode,
              categoria: ong.categoria,
              descricao: ong.descricao
            }
          })
        })
      )
      .subscribe(
        (ongs) => {
          this.ongs = ongs;
          this.listaOngsAtualizada.next([...this.ongs]);
        }
      )
  }

  getListaOngsAtualizaObservable() {
    return this.listaOngsAtualizada.asObservable();
  }

  adicionarOng(nome: string, cnpj: string, email: string, telefone: string, endereco: string,foto:string, qrcode: string, categoria: string, descricao: string) {
    const ong: Ong = {
      id: "",
      nome: nome,
      cnpj: cnpj,
      email: email,
      telefone: telefone,
      endereco: endereco,
      foto: foto,
      qrcode: qrcode,
      categoria: categoria,
      descricao: descricao
    }
    this.httpClient.post<{
      mensagem: string,
      id: string
    }>(
      'http://localhost:3000/api/ongs', ong
    ).subscribe(
      (dados) => {
        ong.id = dados.id;
        this.ongs.push(ong);
        this.listaOngsAtualizada.next([...this.ongs]);
        this.router.navigate(['/ong-inserir']);
      }
    )
  }


  removerOng(id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/ongs/${id}`)
    .subscribe(() =>{
      this.ongs = this.ongs.filter((ong) =>{
        return ong.id !== id
      });
      this.listaOngsAtualizada.next([...this.ongs]);
      console.log(`Ong de id: ${id} removida`);
    });
  }

  atualizarOng(id: string, nome: string, cnpj: string, email: string, telefone: string, endereco: string, foto: string, qrcode:string, categoria: string, descricao: string){
    const ong: Ong = {id, nome, cnpj, email, telefone, endereco, foto, qrcode, categoria, descricao};
    this.httpClient.put(`http://localhost:3000/api/ongs/${id}`, ong)
    .subscribe((res => {
      const copia = [...this.ongs];
      const indice = copia.findIndex(ong => ong.id === ong.id);
      copia[indice] = ong;
      this.ongs = copia;
      this.listaOngsAtualizada.next([...this.ongs]);
      this.router.navigate(['/ong-inserir']);
    }));

  }

}
