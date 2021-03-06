import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptor } from './auth/auth-interceptor'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioInserirComponent } from './usuario-inserir/usuario-inserir.component';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';


import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ContatoComponent } from './contato/contato.component';
import { OngsComponent } from './ongs/ongs.component';
import { OngIndividualComponent } from './ong-individual/ong-individual.component';
import { DoacoesComponent } from './doacoes/doacoes.component';
import { ContaComponent } from './conta/conta.component';

import { ContatoService } from './service/contato.service';
import { UsuarioService } from './service/usuario.service';
import { CategoriaService } from './service/categoria.service';
import { CategoriaInserirComponent } from './categoria/categoria-inserir/categoria-inserir.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { AreaAdmComponent } from './area-adm/area-adm.component';
import { OngInserirComponent } from './ong/ong-inserir/ong-inserir.component';
import { OngListaComponent } from './ong/ong-lista/ong-lista.component';
import { OngService } from './service/ong.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    EntrarComponent,
    CadastrarComponent,
    HomeComponent,
    SobreComponent,
    UsuarioInserirComponent,
    ContatoComponent,
    OngsComponent,
    OngIndividualComponent,
    DoacoesComponent,
    ContaComponent,
    CategoriaInserirComponent,
    CategoriaListarComponent,
    AreaAdmComponent,
    OngInserirComponent,
    OngListaComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    UsuarioService,
    CategoriaService,
    OngService,
    ContatoService,
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
