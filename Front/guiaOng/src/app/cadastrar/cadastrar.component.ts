import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserOng } from '../model/userOng';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  userOng: UserOng = new UserOng
  confirmaSenha: string
  categoriaOng: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }


  confirmSenha(event: any) {
    this.confirmaSenha = event.target.value
  }

  tipoOng(event: any) {
    this.categoriaOng = event.target.value
  }

  cadastrarOng() {
    this.userOng.FK_CategoriaID = this.categoriaOng

    if (this.userOng.senha != this.confirmaSenha) {
      alert('As senhas não conferem')
    } else {
      this.authService.cadastrarOng(this.userOng).subscribe((resp: UserOng) => {
        this.userOng = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

}
