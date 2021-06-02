import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Ong } from 'src/app/model/ong.model';
import { OngService } from 'src/app/service/ong.service';

@Component({
  selector: 'app-ong-lista',
  templateUrl: './ong-lista.component.html',
  styleUrls: ['./ong-lista.component.css']
})
export class OngListaComponent implements OnInit, OnDestroy {

  ongs: Ong[] = []
  private ongsSubscription: Subscription;
  var: boolean = false

  // ongs = [
  //   {
  //     nome: "Ong Contra a Fome",
  //     cnpj: "154.526.568/0001-25",
  //     email: "ongcontrafome@gmail.com",
  //     telefone:"999999999",
  //     endereco:"Rua sem fome nº 25",
  //     categoria: "Fome",
  //     descricao: "Essa é uma ong que destina seus esforços para lutar contra a fome"
  //   },
  //   {
  //     nome: "Ong Contra o Frio",
  //     cnpj: "154.526.568/0001-25",
  //     email: "ongcontrafrio@gmail.com",
  //     telefone:"999999999",
  //     endereco:"Rua sem frio nº 30",
  //     categoria: "Frio",
  //     descricao: "Essa é uma ong que destina seus esforços para lutar contra o frio"
  //   }
  // ]

  constructor(
    public ongService: OngService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0)

    this.ongService.getOngs();

    this.ongsSubscription = this.ongService
    .getListaOngsAtualizaObservable()
    .subscribe(
      (ongs: Ong[]) => {
        this.ongs = ongs;
      }
    )
  }

  ngOnDestroy(): void{
    this.ongsSubscription.unsubscribe();
  }


  onDelete(id: string): void{
    this.ongService.removerOng(id);
  }

}
