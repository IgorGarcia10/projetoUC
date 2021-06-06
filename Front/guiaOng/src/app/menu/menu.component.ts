import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  user: User = new User;
  teste = "Jose"

  private authObserver: Subscription;
  public autenticado: boolean = false;
  public email: string | any;

  private idUsuario: string | any;
  public usuario: Usuario | any;


  constructor(
    private router: Router,
    public auth: AuthService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

    this.authObserver = this.usuarioService.getStatusSubject()
    .subscribe(
      (autenticado) => {
          this.autenticado = autenticado;
        });
    

  }



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

  admin() {
    return environment.admin;
  }

}
