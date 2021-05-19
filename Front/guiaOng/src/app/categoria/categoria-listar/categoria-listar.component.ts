import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(
    public categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.categorias = this.categoriaService.getCategorias();

    //inscrevendo o componente cliente lista como observador do listaclienteatualizada observavel
    this.categoriaService.getListaCategoriaAtualizadaObservable()
      .subscribe(
        (categorias: Categoria[]) => {
          this.categorias = categorias
        });

  }

}
