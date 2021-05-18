import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { UsuarioInserirComponent } from './usuario-inserir/usuario-inserir.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'}, 
  
  {path: 'home', component: HomeComponent},
  {path: 'entrar', component: EntrarComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'sobre', component: SobreComponent}
  {path: 'usuario-inserir', component: UsuarioInserirComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
