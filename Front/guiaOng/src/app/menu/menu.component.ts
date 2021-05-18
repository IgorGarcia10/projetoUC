import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User = new User;
  nome = environment.nome;
  teste = "Jose"


  constructor(
    private router: Router,
    public auth: AuthService
    ) { }

  ngOnInit(){
  }

  sair(){
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.id = 0

    this.router.navigate(['/home']);
  }

  admin(){
      return environment.admin;
  }

}
