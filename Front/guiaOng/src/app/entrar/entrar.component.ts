import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/userLogin';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {


  userLogin: UserLogin = new UserLogin

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0, 20)  
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) =>{
      this.userLogin = resp

      environment.nome = this.userLogin.nome
      environment.id = this.userLogin.iduser

      this.router.navigate(['/home'])
    }, erro =>{
      if(erro.status == 500){
        alert('Usuario ou senha estão incorretos')
      }
    })
  }

}
