import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ong = [
    {
    nome:"Fome",
    descricao: "Breve descrição sobre a Ong"
  },
  {
    nome:"Frio",
    descricao: "Breve descrição sobre a Ong"
  },
  {
    nome: "Crianças",
    descricao: "Breve descrição sobre a Ong"
  },
  {
    nome: "Brinquedos",
    descricao: "Breve descrição sobre a Ong"
  }
]
  constructor() { }

  ngOnInit() {
    window.scroll(0, 0) 
  }

}
