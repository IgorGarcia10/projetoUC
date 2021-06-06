import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment.prod';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public adminData: AuthData;
  public admin: string | any;
  public idUsuario: string | any;
  public usuario: AuthData | any

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if (form.invalid) return;
    this.usuarioService.login(form.value.email, form.value.password, this.admin);

    const usuario = this.usuarioService.obterDadosDeAutenticacao();
    this.admin = usuario?.admin;
    this.idUsuario = usuario?.idUsuario
    this.usuarioService.getUsuario(this.idUsuario)
      .subscribe(dadosU => {
        this.usuario = {
          id: dadosU._id,
          nome: dadosU.email,
          admin: dadosU.admin
        };
        environment.admin = dadosU.admin
        this.admin = environment.admin
        // console.log(this.usuario)
        // console.log(environment.admin)
        }
      );
  }

}
