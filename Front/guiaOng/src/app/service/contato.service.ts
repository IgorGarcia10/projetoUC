import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contato } from '../model/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private contato: Contato[] = [];
  private listaContatoAtualizada = new Subject<Contato[]>()

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getContato(idContato: string) {
    return this.httpClient.get<{ _id: string, nome: string, email: string, assunto: string, mensagem: string }>(
      `http://localhost:3000/api/contato/${idContato}`
    );
  }

  getContatos(): void {
    this.httpClient.get<{
      mensagem: string, contato: any
    }>(
      'http://localhost:3000/api/contato'
    )
      .pipe(
        map((dados) => {
          return dados.contato.map((contato: { _id: any; nome: any; email: any; assunto: any; mensagem: any; }) => {
            return {
              id: contato._id,
              nome: contato.nome,
              email: contato.email,
              assunto: contato.assunto,
              mensagem: contato.mensagem,
            }
          })
        })
      )
      .subscribe(
        (contato) => {
          this.contato = contato;
          this.listaContatoAtualizada.next([...this.contato]);
        }
      )
  }

  getListaContatoAtualizaObservable() {
    return this.listaContatoAtualizada.asObservable();
  }

  adicionarContato(nome: string, email: string, assunto: string, mensagem: string) {
    const contato: Contato = {
      id: "",
      nome: nome,
      email: email,
      assunto: assunto,
      mensagem: mensagem
    }
    this.httpClient.post<{
      mensagem: string,
      id: string
    }>(
      'http://localhost:3000/api/contato', contato
    ).subscribe(
      (dados) => {
        contato.id = dados.id;
        this.contato.push(contato);
        this.listaContatoAtualizada.next([...this.contato]);
        this.router.navigate(['/contato']);
      }
    )
  }

  removerContato(id: string): void {
    this.httpClient.delete(`http://localhost:3000/api/contato/${id}`)
      .subscribe(() => {
        this.contato = this.contato.filter((contato) => {
          return contato.id !== id
        });
        this.listaContatoAtualizada.next([...this.contato]);
        console.log(`Contato de id: ${id} removid0`);
      });
  }

  atualizarOng(id: string, nome: string, email: string, assunto: string, mensagem: string) {
    const contato: Contato = { id, nome, email, assunto, mensagem};
    this.httpClient.put(`http://localhost:3000/api/contato/${id}`, contato)
      .subscribe((res => {
        const copia = [...this.contato];
        const indice = copia.findIndex(contato => contato.id === contato.id);
        copia[indice] = contato;
        this.contato = copia;
        this.listaContatoAtualizada.next([...this.contato]);
        this.router.navigate(['/contato']);
      }));

  }
  /* 
    adicionarContato(nome: string, email: string, assunto: string, mensagem: string) {
      const contato: Contato = {
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem,
      }
      /* sendMessage(body) {
          return this._http.post('http://localhost:3000/sendmail', body);
        } 
    } */


  /* adicionarContato(nome: string, email: string, assunto: string, mensagem: string) {
    const contato: Contato = {
      nome: nome,
      email: email,
      assunto: assunto,
      mensagem: mensagem,
    }
    this.httpClient.post<{
      mensagem: string,
      id: string
    }>(
      'http://localhost:3000/api/envia', contato
    ).subscribe(
      (dados) => {

        this.router.navigate(['/envia']);
      }
    )
  } */

  /* register() {
    
    let user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
      }
    );
  } */
}