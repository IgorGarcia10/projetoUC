import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ong } from '../model/ong.model';
import { OngService } from '../service/ong.service';

@Component({
  selector: 'app-ong-individual',
  templateUrl: './ong-individual.component.html',
  styleUrls: ['./ong-individual.component.css']
})
export class OngIndividualComponent implements OnInit {

  ongs: Ong[] = []
  private ongsSubscription: Subscription;
  modo: string;
  public idOng: string | any;
  public ong: Ong | any;

  constructor(
    public ongService: OngService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idOng")) {
        this.modo = "editar";
        this.idOng = paramMap.get("idOng");
        this.ongService.getOng(this.idOng).subscribe(dadosOng => {
          this.ong = {
            id: dadosOng._id,
            nome: dadosOng.nome,
            cnpj: dadosOng.cnpj,
            email: dadosOng.email,
            telefone: dadosOng.telefone,
            endereco: dadosOng.endereco,
            foto: dadosOng.foto,
            qrcode: dadosOng.qrcode,
            categoria: dadosOng.categoria,
            descricao: dadosOng.descricao
          };
        });
      }
    })
  }
}
