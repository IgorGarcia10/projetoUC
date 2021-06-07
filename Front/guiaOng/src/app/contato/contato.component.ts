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
import { Categoria } from '../model/categoria';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  form: FormGroup;
  public categoriasSubscription: Subscription;
  private modo: string = "criar";
  categorias: Categoria[] = [];
  private idContato: string | any;
  public contato: Contato | any;
  public mensagemCarregando = false;
  public enviado = false;

  constructor(public contatoService: ContatoService,
    private authService: AuthService,
    public categoriaService: CategoriaService,
    public route: ActivatedRoute) { }


    ngOnInit() {
      window.scroll(0,0)
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
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("idUsuario")) {
          this.modo = "editar";
          this.idContato = paramMap.get("idContato");
          this.contatoService.getContato(this.idContato).subscribe(dadosContato => {
            this.contato ={
              id: dadosContato._id,
              nome: dadosContato.nome,
              email: dadosContato.email,
              assunto: dadosContato.assunto,
              mensagem: dadosContato.mensagem,
            };
          });
        }
        else {
          this.modo = "criar";
          this.idContato = null;
        }
      });
      this.categoriaService.getCategorias();
      this.categoriasSubscription = this.categoriaService
        .getListaCategoriaAtualizadaObservable()
        .subscribe(
          (categorias: Categoria[]) => {
            this.categorias = categorias
          });

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
        this.form.value.mensagem,
      );
    }  
    this.form.reset();
    
    this.mensagemCarregando = true;
    this.enviado = true;
    //window.location.href = 'http://localhost:4200/Enviado';
  } 

}
