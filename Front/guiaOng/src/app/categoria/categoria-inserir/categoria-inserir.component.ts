import { Component, OnInit, /*EventEmitter,  Output*/ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-inserir',
  templateUrl: './categoria-inserir.component.html',
  styleUrls: ['./categoria-inserir.component.css']
})
export class CategoriaInserirComponent implements OnInit {
  // @Output() categoriaAdicionada = new EventEmitter<Categoria>();

  

  constructor(
    public categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
  }

  onAdicionarCategoria(form: NgForm){
    if(form.invalid){
      return;
    }

    this.categoriaService.adicionarCategorias(
      form.value.nome
    )

    // const categoria: Categoria = {
    //   nome: form.value.nome
    // };
    // this.categoriaAdicionada.emit(categoria);
  }



}
