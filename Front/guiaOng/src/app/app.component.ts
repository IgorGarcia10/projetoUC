import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './model/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router) {}
  title = 'guiaOng';
}
