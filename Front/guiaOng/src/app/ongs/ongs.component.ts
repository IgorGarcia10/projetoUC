import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ong } from '../model/ong.model';
import { OngService } from '../service/ong.service';

@Component({
  selector: 'app-ongs',
  templateUrl: './ongs.component.html',
  styleUrls: ['./ongs.component.css']
})
export class OngsComponent implements OnInit {
  

  ongs: Ong[] = []; 
  private ongsSubscription: Subscription;
  tituloOng: string

  constructor(
    private ongService: OngService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);

    this.ongService.getOngs();
    this.ongsSubscription = this.ongService
    .getListaOngsAtualizaObservable()
    .subscribe(
      (ongs: Ong[]) => {
        this.ongs = ongs;
      }
    )
  }

}
