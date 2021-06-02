import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';

interface Uf {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-usuario-inserir',
  templateUrl: './usuario-inserir.component.html',
  styleUrls: ['./usuario-inserir.component.css'],
})
export class UsuarioInserirComponent {
  
  minDate: Date;
  maxDate: Date;

  constructor(public usuarioService: UsuarioService) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear - 18, 1, 1)
   }

  hide = true;
  
  ufs: Uf[] = [
    {value:  'AC', viewValue: 'Acre'},
{value:  'AL', viewValue: 'Alagoas'},
{value:  'AP', viewValue: 'Amapá'},
{value:  'AM', viewValue: 'Amazonas'},
{value:  'BA', viewValue: 'Bahia'},
{value:  'CE', viewValue: 'Ceará'},
{value:  'DF', viewValue: 'Distrito Federal'},
{value:  'ES', viewValue: 'Espírito Santo'},
{value:  'GO', viewValue: 'Goiás'},
{value:  'MA', viewValue: 'Maranhão'},
{value:  'MT', viewValue: 'Mato Grosso'},
{value:  'MS', viewValue: 'Mato Grosso do Sul'},
{value:  'MG', viewValue: 'Minas Gerais'},
{value:  'PA', viewValue: 'Pará'},
{value:  'PB', viewValue: 'Paraíba'},
{value:  'PR', viewValue: 'Paraná'},
{value:  'PE', viewValue: 'Pernambuco'},
{value:  'PI', viewValue: 'Piauí'},
{value:  'RJ', viewValue: 'Rio de Janeiro'},
{value:  'RN', viewValue: 'Rio Grande do Norte'},
{value:  'RS', viewValue: 'Rio Grande do Sul'},
{value:  'RO', viewValue: 'Rondônia'},
{value:  'RR', viewValue: 'Roraima'},
{value:  'SC', viewValue: 'Santa Catarina'},
{value:  'SP', viewValue: 'São Paulo'},
{value:  'SE', viewValue: 'Sergipe'},
{value:  'TO', viewValue: 'Tocantins'},    
  ];

  /* comparacao(form: NgForm) { // here we have the 'passwords' group
    let senha = form.value.senha;
    let confirmaSenha = form.value.repetirSenha;

    return senha === confirmaSenha ? null : { notSame: true }    
  }  */

  data = {
    senha: '',
    repetirSenha: '',
  };

  onAdicionarUsuario(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.usuarioService.adicionarUsuario(
      //form.value.tipo,
      form.value.nome,
      //form.value.fone,
      form.value.email,
      form.value.cpf,
      //form.value.senha,
      //form.value.cep,
      //form.value.lagradouro,
      //form.value.numero,
      //form.value.complemento,
      //form.value.bairro,
      //form.value.uf,
      //form.value.cidade,
      //form.value.dataNascimento, 
    );
    form.resetForm();


  }
  
}


