import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthData } from './auth/auth-data.model';
import { Usuario } from './model/usuario.model';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  constructor(
    public router: Router,
    private usuarioService: UsuarioService
  ) { }



  ngOnInit() {
    this.usuarioService.autenticarAutomaticamente();
    this.onUsuario();
    this.usuarioService.getUsuario(this.idUsuario)
    .subscribe( dadosU => {
      this.usuario = {
        id: dadosU._id,
        nome: dadosU.email,
        admin: dadosU.admin
      };
      environment.admin = dadosU.admin
      // console.log(this.usuario)
      // console.log(environment.admin)
    });
    
  }


  usuarios: any
  public admin: string | any;
  public idUsuario: string | any
  public usuario: AuthData | any

  public onUsuario(){
    const usuarios = this.usuarioService.obterDadosDeAutenticacao()
    this.admin = usuarios?.admin;
    this.idUsuario = usuarios?.idUsuario

    this.usuarioService.getUsuario(this.idUsuario)
    .subscribe( dadosU => {
      this.usuario = {
        id: dadosU._id,
        nome: dadosU.email,
        admin: dadosU.admin
      };
      environment.admin = dadosU.admin
    });
    

  }


}
