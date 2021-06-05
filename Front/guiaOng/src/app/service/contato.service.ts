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
  [x: string]: any;

  private contato: Contato[] = [];


  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

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


  adicionarContato(nome: string, email: string, assunto: string, mensagem: string) {
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
  }

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