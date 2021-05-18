import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-doacoes',
  templateUrl: './doacoes.component.html',
  styleUrls: ['./doacoes.component.css']
})
export class DoacoesComponent implements OnInit {

  doacao = [
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
  constructor(
    public auth: AuthService
   ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

}
