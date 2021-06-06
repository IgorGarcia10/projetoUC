import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.model';
import { AuthData } from '../auth/auth-data.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  private authObserver: Subscription;
  public autenticado: boolean = false;
  public email: string | any;
  public admin: string | any;
  public idUsuario: string | any
  public usuario: AuthData | any


  constructor(
    private router: Router,
    public auth: AuthService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.autenticado = this.usuarioService.isAutenticado();
    this.authObserver = this.usuarioService.getStatusSubject()
      .subscribe(
        (autenticado) => {
          this.autenticado = autenticado;
        });

    this.admin = this.usuarioService.getUserAdmin();
    this.email = this.usuarioService.getEmailUser();

  }

  



  // public onUsuario(){
  //   const usuarios = this.usuarioService.obterDadosDeAutenticacao()
  //   this.admin = usuarios?.admin;
  //   this.idUsuario = usuarios?.idUsuario

  //   this.usuarioService.getUsuario(this.idUsuario)
  //   .subscribe( dadosU => {
  //     this.usuario = {
  //       id: dadosU._id,
  //       email: dadosU.email,
  //       admin: dadosU.admin
  //     };
  //     environment.admin = dadosU.admin
  //     environment.email = dadosU.email
  //     this.admin = environment.admin
  //     this.email = environment.email
  //     // console.log(this.usuario)
  //     // console.log(environment.email)
  //   });
  // }



  ngOnDestroy() {
    this.authObserver.unsubscribe();
  }

  onLogout() {
    this.usuarioService.logout();
  }

  sair() {
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.id = 0

    this.router.navigate(['/home']);
  }

  userAdmin(){
    return environment.admin
  }

}
