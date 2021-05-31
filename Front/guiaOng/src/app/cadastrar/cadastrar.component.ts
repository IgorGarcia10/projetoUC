import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';

interface Uf {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  hide = true;


  user: User = new User
  confirmarSenha: string | any;
  // categoriaOng: boolean

  constructor(public usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear - 18, 1, 1)

   }

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

  ngOnInit() {
    window.scroll(0, 125)
  }

  data = {
    senha: '',
    repetirSenha: '',
  };

  onAdicionarUsuario(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.usuarioService.adicionarUsuario(
      form.value.tipo,
      form.value.nome,
      form.value.fone,
      form.value.email,
      form.value.cpf,
      form.value.senha,
      form.value.cep,
      form.value.lagradouro,
      form.value.numero,
      form.value.complemento,
      form.value.bairro,
      form.value.uf,
      form.value.cidade,
      form.value.dataNascimento,
    );
    form.resetForm();


  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  // tipoOng(event: any) {
  //   this.categoriaOng = event.target.value
  // }

  cadastrar() {
    // this.user.useradmin = this.categoriaOng

    if (this.user.senha != this.confirmarSenha) {
      alert('As senhas não conferem')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

}
