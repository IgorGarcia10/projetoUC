import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public admin: AuthData;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if (form.invalid) return;
    this.usuarioService.login(form.value.email, form.value.password, this.admin);
  }

}
