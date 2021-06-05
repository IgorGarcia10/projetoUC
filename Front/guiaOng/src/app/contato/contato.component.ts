import { Component, OnInit } from '@angular/core';

import { Contato } from '../model/contato';


import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriaService } from '../service/categoria.service';
import { AuthService } from '../service/auth.service';
import { ContatoService } from '../service/contato.service';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  form: FormGroup;
  public categoriasSubscription: Subscription;
  private modo: string = "criar";

  constructor(public contatoService: ContatoService,
    private authService: AuthService,
    public categoriaService: CategoriaService,
    public route: ActivatedRoute) { }

    ngOnInit() {
      window.scroll(0, 125)
      this.form = new FormGroup({
  
        nome: new FormControl(null,{
          validators: [Validators.required, Validators.minLength(3)]
        }),
        email: new FormControl(null,{
          validators: [Validators.required, Validators.email, ]
        }),
        assunto: new FormControl(null, {
          validators: [Validators.required]
        }), 
        mensagem: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(30)]
        }),  
      })
    }

  onEnviar() {
    if (this.form.invalid) {
      return;
    }
    if(this.modo === "criar"){
      this.contatoService.adicionarContato(
        this.form.value.nome,
        this.form.value.email,
        this.form.value.assunto,
        this.form.value.contato,
      );
    }  
    this.form.reset();
    //window.location.href = 'http://localhost:4200/Enviado';
  } 

}
