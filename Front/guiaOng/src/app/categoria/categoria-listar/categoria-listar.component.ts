import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit, OnDestroy {

  categorias: Categoria[] = [];
  public categoriasSubscription: Subscription;

  constructor(
    public categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.categoriaService.getCategorias();

    //inscrevendo o componente cliente lista como observador do listaclienteatualizada observavel
    this.categoriasSubscription = this.categoriaService
    .getListaCategoriaAtualizadaObservable()
      .subscribe(
        (categorias: Categoria[]) => {
          this.categorias = categorias
        });
  }

  ngOnDestroy(): void{
    this.categoriasSubscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.categoriaService.removerCategoria(id);
  }


}
