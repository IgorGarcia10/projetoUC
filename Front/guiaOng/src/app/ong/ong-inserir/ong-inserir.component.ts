import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/model/categoria';
import { Ong } from 'src/app/model/ong.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import { OngService } from 'src/app/service/ong.service';

@Component({
  selector: 'app-ong-inserir',
  templateUrl: './ong-inserir.component.html',
  styleUrls: ['./ong-inserir.component.css']
})
export class OngInserirComponent implements OnInit {

  categorias: Categoria[] = [];
  public categoriasSubscription: Subscription;
  private modo: string = "criar";
  private idOng: string | any;
  public ong: Ong | any;

  constructor(
    public ongService: OngService,
    public categoriaService: CategoriaService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0, 0)
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idOng")) {
        this.modo = "editar";
        this.idOng = paramMap.get("idOng");
        this.ongService.getOng(this.idOng).subscribe(dadosOng => {
          this.ong ={
            id: dadosOng._id,
            nome: dadosOng.nome,
            cnpj: dadosOng.cnpj,
            email: dadosOng.email,
            telefone: dadosOng.telefone,
            endereco: dadosOng.endereco,
            categoria: dadosOng.categoria,
            descricao: dadosOng.descricao
          };
        });
      }
      else {
        this.modo = "criar";
        this.idOng = null;
      }
    });
    this.categoriaService.getCategorias();
    this.categoriasSubscription = this.categoriaService
      .getListaCategoriaAtualizadaObservable()
      .subscribe(
        (categorias: Categoria[]) => {
          this.categorias = categorias
        });
  }

  onSalvarOng(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.modo === "criar"){
      this.ongService.adicionarOng(
        form.value.nome,
        form.value.cnpj,
        form.value.email,
        form.value.telefone,
        form.value.endereco,
        form.value.categoria,
        form.value.descricao
      );
    }
    else {
      this.ongService.atualizarOng(
        this.idOng,
        form.value.nome,
        form.value.cnpj,
        form.value.email,
        form.value.telefone,
        form.value.endereco,
        form.value.categoria,
        form.value.descricao
      )
    }    
    form.resetForm();
  }


}
