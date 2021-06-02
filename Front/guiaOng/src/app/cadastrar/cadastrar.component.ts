import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
//import { FormGroup,NgForm } from '@angular/forms';
import { Form, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  form: FormGroup;
  minDate: Date;
  maxDate: Date;
  hide = true;
  private modo: string = "criar";
  user: User = new User
  
  data = {
    senha: '',
    repetirSenha: '',
  };

  
  constructor(public usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear - 18, 1, 1)

  }

  ufs: Uf[] = [
    { value: 'AC', viewValue: 'Acre' },
    { value: 'AL', viewValue: 'Alagoas' },
    { value: 'AP', viewValue: 'Amapá' },
    { value: 'AM', viewValue: 'Amazonas' },
    { value: 'BA', viewValue: 'Bahia' },
    { value: 'CE', viewValue: 'Ceará' },
    { value: 'DF', viewValue: 'Distrito Federal' },
    { value: 'ES', viewValue: 'Espírito Santo' },
    { value: 'GO', viewValue: 'Goiás' },
    { value: 'MA', viewValue: 'Maranhão' },
    { value: 'MT', viewValue: 'Mato Grosso' },
    { value: 'MS', viewValue: 'Mato Grosso do Sul' },
    { value: 'MG', viewValue: 'Minas Gerais' },
    { value: 'PA', viewValue: 'Pará' },
    { value: 'PB', viewValue: 'Paraíba' },
    { value: 'PR', viewValue: 'Paraná' },
    { value: 'PE', viewValue: 'Pernambuco' },
    { value: 'PI', viewValue: 'Piauí' },
    { value: 'RJ', viewValue: 'Rio de Janeiro' },
    { value: 'RN', viewValue: 'Rio Grande do Norte' },
    { value: 'RS', viewValue: 'Rio Grande do Sul' },
    { value: 'RO', viewValue: 'Rondônia' },
    { value: 'RR', viewValue: 'Roraima' },
    { value: 'SC', viewValue: 'Santa Catarina' },
    { value: 'SP', viewValue: 'São Paulo' },
    { value: 'SE', viewValue: 'Sergipe' },
    { value: 'TO', viewValue: 'Tocantins' },
  ];
  

  ngOnInit() {
    window.scroll(0, 125)
    this.form = new FormGroup({

      nome: new FormControl(null,{
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl(null,{
        validators: [Validators.required, Validators.email, ]
      }),
      confirmeEmail: new FormControl(null, {
        validators: [Validators.required, Validators.email,]
      }),
      senha: new FormControl(null,{
        validators: [Validators.required]}
      ),
      repetirSenha: new FormControl(null, {
        validators: [Validators.required ]
      }),
      
    })
  }
   comparar(){
      return(this.data.senha === this.data.repetirSenha ? null: {comparacao: true}); 
  }

/*
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  } */

  

  /*  onAdicionarUsuario(form: NgForm) {
     
     if (this.form.invalid){
       return;
     }
     if (this.modo === "criar"){
     this.usuarioService.adicionarUsuario(
       this.form.value.tipo,
       this.form.value.nome,
       this.form.value.fone,
       this.form.value.email,
       this.form.value.cpf,
       this.form.value.senha,
       this.form.value.cep,
       this.form.value.lagradouro,
       this.form.value.numero,
       this.form.value.complemento,
       this.form.value.bairro,
       this.form.value.uf,
       this.form.value.cidade,
       this.form.value.dataNascimento,
     );
     form.resetForm();
   }
 
   }
  */

   

   onAdicionarUsuario() {
    if (this.form.invalid) {
      return;
    }
    if (this.modo === "criar") {
      this.usuarioService.adicionarUsuario(
      //this.form.value.tipo,
      this.form.value.nome,
      //this.form.value.fone,
      this.form.value.email,
      //this.form.value.cpf,
      this.form.value.senha,
      //this.form.value.cep,
      //this.form.value.lagradouro,
      //this.form.value.numero,
      //this.form.value.complemento,
      //this.form.value.bairro,
      //this.form.value.uf,
      //this.form.value.cidade,
      //this.form.value.dataNascimento,
      );
    }
    this.form.reset();
  } 

}
