import { Component, OnInit, /*EventEmitter,  Output*/ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-inserir',
  templateUrl: './categoria-inserir.component.html',
  styleUrls: ['./categoria-inserir.component.css']
})
export class CategoriaInserirComponent implements OnInit {

  private modo: string = "criar";
  private idCategoria: string | any;
  public categoria: Categoria | any;
  

  constructor(
    public categoriaService: CategoriaService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has("idCategoria")){
        this.modo = "editar";
        this.idCategoria = paramMap.get("idCategoria");
        this.categoriaService.getCategoria(this.idCategoria).subscribe( dadosCat => {
          this.categoria = {
            id: dadosCat._id,
            nome: dadosCat.nome
          };
        });
      }
      else {
        this.modo = "criar";
        this.idCategoria = null;
      }
    });

  }

  onSalvarCategoria(form: NgForm){
    if(form.invalid){
      return;
    }
    if( this.modo === "criar"){
      this.categoriaService.adicionarCategorias(
        form.value.nome
      );
    }
    else{
      this.categoriaService.atualizarCategoria(
        this.idCategoria,
        form.value.nome
      )
    }
    form.resetForm();

    // const categoria: Categoria = {
    //   nome: form.value.nome
    // };
    // this.categoriaAdicionada.emit(categoria);
  }



}
