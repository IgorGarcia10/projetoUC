import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthData } from '../auth/auth-data.model';
import { Ong } from '../model/ong.model';
import { OngService } from '../service/ong.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ongs: Ong[] = []; 
  private ongsSubscription: Subscription;

  public admin: string | any;
  public email: string | any;
  public idUsuario: string | any
  public usuario: AuthData | any



  constructor(
    private ongService: OngService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);

    this.ongService.getOngs();
    this.ongsSubscription = this.ongService
    .getListaOngsAtualizaObservable()
    .subscribe(
      (ongs: Ong[]) => {
        this.ongs = ongs.slice(0, 4)
      }
    )
      ;

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
  //     console.log(this.usuario)
  //     console.log(environment.email)
  //   });
  // }
  

}
