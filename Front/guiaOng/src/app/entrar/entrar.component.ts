import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/userLogin';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {


  userLogin: UserLogin = new UserLogin

  constructor(
    public usuarioService: UsuarioService, 
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 125)
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.nome = this.userLogin.nome
      environment.id = this.userLogin.iduser

      this.router.navigate(['/home'])
    }, erro => {
      if (erro.status == 500) {
        alert('Usuario ou senha estão incorretos')
      }
    })
  }

  /* onLogin(form: NgForm) {
    if (form.invalid) return;
    this.usuarioService.login(
      '','',
      form.value.email, 
      form.value.password
      );
  } */

}
