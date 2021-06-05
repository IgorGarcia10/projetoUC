import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';

import { NgForm } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/model/categoria';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

interface Uf {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})


export class CadastrarComponent implements OnInit {
  form: FormGroup;
  minDate: Date;
  maxDate: Date;
  hide = true;
  user: User = new User

  categorias: Categoria[] = [];
  public categoriasSubscription: Subscription;
  private modo: string = "criar";
  private idUsuario: string | any;
  public usuario: Usuario | any;
  
  data = {
    senha: '',
    repetirSenha: '',
  };

  constructor(public usuarioService: UsuarioService,
    private authService: AuthService,
    public categoriaService: CategoriaService,
    public route: ActivatedRoute
    ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear - 18, 1, 1)
  }
 
  ufs: Uf[] = [
    { value: 'AC', viewValue: 'Acre' },
    { value: 'AL', viewValue: 'Alagoas' },
    { value: 'AP', viewValue: 'Amapá' },
    { value: 'AM', viewValue: 'Amazonas' },
    { value: 'BA', viewValue: 'Bahia' },
    { value: 'CE', viewValue: 'Ceará' },
    { value: 'DF', viewValue: 'Distrito Federal' },
    { value: 'ES', viewValue: 'Espírito Santo' },
    { value: 'GO', viewValue: 'Goiás' },
    { value: 'MA', viewValue: 'Maranhão' },
    { value: 'MT', viewValue: 'Mato Grosso' },
    { value: 'MS', viewValue: 'Mato Grosso do Sul' },
    { value: 'MG', viewValue: 'Minas Gerais' },
    { value: 'PA', viewValue: 'Pará' },
    { value: 'PB', viewValue: 'Paraíba' },
    { value: 'PR', viewValue: 'Paraná' },
    { value: 'PE', viewValue: 'Pernambuco' },
    { value: 'PI', viewValue: 'Piauí' },
    { value: 'RJ', viewValue: 'Rio de Janeiro' },
    { value: 'RN', viewValue: 'Rio Grande do Norte' },
    { value: 'RS', viewValue: 'Rio Grande do Sul' },
    { value: 'RO', viewValue: 'Rondônia' },
    { value: 'RR', viewValue: 'Roraima' },
    { value: 'SC', viewValue: 'Santa Catarina' },
    { value: 'SP', viewValue: 'São Paulo' },
    { value: 'SE', viewValue: 'Sergipe' },
    { value: 'TO', viewValue: 'Tocantins' },
  ];
  

  ngOnInit() {
    window.scroll(0, 125)
    this.form = new FormGroup({

      nome: new FormControl(null,{
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl(null,{
        validators: [Validators.required, Validators.email, ]
      }),
      confirmeEmail: new FormControl(null, {
        validators: [Validators.required, Validators.email,]
      }),
      senha: new FormControl(null,{
        validators: [Validators.required]}, 
        
      ),
      repetirSenha: new FormControl(null,{
        validators: [Validators.required]
      }),
      
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idUsuario")) {
        this.modo = "editar";
        this.idUsuario = paramMap.get("idUsuario");
        this.usuarioService.getUsuario(this.idUsuario).subscribe(dadosUsuario => {
          this.usuario ={
            id: dadosUsuario._id,
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
          };
        });
      }
      else {
        this.modo = "criar";
        this.idUsuario = null;
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

  onAdicionarUsuario() {
    if (this.form.invalid) {
      return;
    }
    if(this.modo === "criar"){
      this.usuarioService.adicionarUsuario(
        this.form.value.nome,
        this.form.value.email,
        this.form.value.senha,
      );
    }
    else {
      this.usuarioService.atualizarUsuario(
        this.idUsuario,
        this.form.value.nome,
        this.form.value.email,
        this.form.value.senha,
      )
    }    
    this.form.reset();
    //window.location.href = 'http://localhost:4200/entrar';
  }




  /*  onAdicionarUsuario() {
    if (this.form.invalid) {
      return;
    }
    if (this.modo === "criar") {
      this.usuarioService.adicionarUsuario(
      //this.form.value.tipo,
      this.form.value.nome,
      //this.form.value.fone,
      this.form.value.email,
      //this.form.value.cpf,
      this.form.value.senha,
      //this.form.value.cep,
      //this.form.value.lagradouro,
      //this.form.value.numero,
      //this.form.value.complemento,
      //this.form.value.bairro,
      //this.form.value.uf,
      //this.form.value.cidade,
      //this.form.value.dataNascimento,
      );
    }
    this.form.reset();
  }  */

}
