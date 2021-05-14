import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsuarioInserirComponent } from './usuarios/usuario-inserir/usuario-inserir.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsuarioListaComponent } from './usuarios/usuario-lista/usuario-lista.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';



import { UsuarioService } from './usuarios/usuario.service';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent, UsuarioInserirComponent, CabecalhoComponent, UsuarioListaComponent
  ],
  imports: [
    BrowserModule, FormsModule, NoopAnimationsModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatFormFieldModule, MatSelectModule,MatButtonModule,MatIconModule,MatDatepickerModule, MatNativeDateModule, HttpClientModule,
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
