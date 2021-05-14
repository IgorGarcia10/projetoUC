import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  
  private usuariosSubscription: Subscription;

  constructor(public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getUsuarios();
    this.usuariosSubscription = this.usuarioService
      .getListaDeUsuariosAtualizadaObservable()
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      });
  }
  
  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
  }
  
  
}
