import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ong } from '../model/ong.model';
import { OngService } from '../service/ong.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ongs: Ong[] = []; 
  private ongsSubscription: Subscription;


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
        this.ongs = ongs.slice(0, 4)
      }
    )
      ;

  }

}
