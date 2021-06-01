import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ong } from 'src/app/model/ong.model';
import { OngService } from 'src/app/service/ong.service';

@Component({
  selector: 'app-ong-inserir',
  templateUrl: './ong-inserir.component.html',
  styleUrls: ['./ong-inserir.component.css']
})
export class OngInserirComponent implements OnInit {


  constructor(
    public ongService: OngService
  ) { }

  ngOnInit(): void {
  }

  onSalvarOng(form: NgForm) {
    if(form.invalid){
      return;
    }

    this.ongService.adicionarOng(
      form.value.nome,
      form.value.cnpj,
      form.value.email,
      form.value.telefone,
      form.value.endereco,
      form.value.categoria,
      form.value.descricao
    );
    form.resetForm();      

  }


}
