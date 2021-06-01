import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaAdmComponent } from './area-adm/area-adm.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CategoriaInserirComponent } from './categoria/categoria-inserir/categoria-inserir.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { ContaComponent } from './conta/conta.component';
import { ContatoComponent } from './contato/contato.component';
import { DoacoesComponent } from './doacoes/doacoes.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { OngIndividualComponent } from './ong-individual/ong-individual.component';
import { OngInserirComponent } from './ong/ong-inserir/ong-inserir.component';
import { OngListaComponent } from './ong/ong-lista/ong-lista.component';
import { OngsComponent } from './ongs/ongs.component';
import { SobreComponent } from './sobre/sobre.component';
import { UsuarioInserirComponent } from './usuario-inserir/usuario-inserir.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'}, 
  
  {path: 'home', component: HomeComponent},
  {path: 'entrar', component: EntrarComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'area-adm', component: AreaAdmComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'usuario-inserir', component: UsuarioInserirComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'ongs', component: OngsComponent},
  {path: 'doar', component: OngIndividualComponent},
  {path: 'doacoes', component: DoacoesComponent},
  {path: 'conta', component: ContaComponent},
  {path: 'categoria-inserir', component: CategoriaInserirComponent},
  {path: 'categoria-editar/:idCategoria', component: CategoriaInserirComponent},
  {path: 'categoria-listar', component: CategoriaListarComponent},
  {path: 'ong-inserir', component: OngInserirComponent},
  {path: 'ong-lista', component: OngListaComponent},
  {path: 'ong-editar/:idOng', component: OngInserirComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
