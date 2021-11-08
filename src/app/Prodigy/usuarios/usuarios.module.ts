import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './usuarios.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';

//#region  Módulos
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BreadcrumbsModule } from '@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '@vex/directives/container/container.module';
import { SecondaryToolbarModule } from '@vex/components/secondary-toolbar/secondary-toolbar.module';
import { IconModule } from '@visurel/iconify-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatTooltipModule, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule, MAT_SELECT_SCROLL_STRATEGY_PROVIDER} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
//#endregion


@NgModule({
  declarations: [UsuariosComponent, ListaUsuariosComponent, FormularioUsuarioComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SecondaryToolbarModule,
    FlexLayoutModule,
    MatInputModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatIconModule,
    MatButtonModule,
    IconModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    FormsModule,
    NgxDatatableModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSlideToggleModule,
    ContainerModule,
    MatDatepickerModule
  ],
  providers:[]
})
export class UsuariosModule { }
