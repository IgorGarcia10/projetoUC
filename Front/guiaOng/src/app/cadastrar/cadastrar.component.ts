import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {


  user: User = new User
  confirmarSenha: string
  // categoriaOng: boolean

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 125)
  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  // tipoOng(event: any) {
  //   this.categoriaOng = event.target.value
  // }

  cadastrar() {
    // this.user.useradmin = this.categoriaOng

    if (this.user.senha != this.confirmarSenha) {
      alert('As senhas não conferem')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

}
