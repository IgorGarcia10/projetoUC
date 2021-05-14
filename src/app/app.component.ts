import { Component } from '@angular/core';
import { Usuario } from './usuarios/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clientes: Usuario[] = [];
  onClienteAdicionado(cliente) {
    this.clientes = [...this.clientes, cliente];
  }
}
