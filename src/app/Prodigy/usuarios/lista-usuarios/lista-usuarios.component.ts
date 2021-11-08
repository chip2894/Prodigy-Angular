import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import Notiflix from "notiflix";
import { finalize } from 'rxjs/operators';

/** Animacipnes */
import { stagger60ms, stagger40ms } from '@vex/animations/stagger.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '@vex/animations/scale-fade-in.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';

/** Iconos */
import icSearch from '@iconify/icons-ic/twotone-search';

/** Servicios */
import { UsuariosService } from '../../servicios/usuarios.service';

/** Modelos */
import { RequestBodyModel } from 'app/Prodigy/models/request/request.body.model';
import { ResponseUsuarioModel } from 'app/Prodigy/models/response/response.usuario.model';
import { RequestDltUsuarioModel } from 'app/Prodigy/models/request/request.dltususrio.model';


@Component({
  selector: 'vex-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms,
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class ListaUsuariosComponent implements OnInit {

  //#region Variables
  searchCtrl = new FormControl();
  dataSource: MatTableDataSource<any> | null | undefined;
  lstaUsuarios: ResponseUsuarioModel[]  | undefined = [];
  //#endregion

  //#region Iconos
  icSearch = icSearch;
  //#endregion

  //#region Filtro
  public columnasFiltro: any[] = [
    { label: '#', property: 'id', visible: true },
    { label: 'UserName', property: 'userName', visible: true },
    { label: 'First Name', property: 'firstName', visible: true },
    { label: 'Last Name', property: 'lastName', visible: true },
    { label: 'Email', property: 'email', visible: true },
    { label: 'Birthday', property: 'dateOfBirth', visible: true },
    { label: 'OPCIONES', property: 'acciones', visible: true },
  ]

  get visibleColumns() {
    return this.columnasFiltro.filter(column => column.visible).map(column => column.property);
  }

  applyFilter(filter) {
    this.dataSource.filter = filter.trim();

  }
  //#endregion

  //#region Paginador
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 25, 50, 100];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //#endregion

  constructor(private _usuaiosService: UsuariosService, private _router: Router) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerListaUsuaios();
    this.dataSource = new MatTableDataSource();
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  obtenerListaUsuaios(){

    Notiflix.Block.Pulse('#listadoUsuarios');

    let reqest:RequestBodyModel = {
      usuario: localStorage.getItem('userName')
    }
    
    this._usuaiosService.ListaUsuarios(reqest)
    .pipe(
      finalize( () => {
        this.dataSource.data = this.lstaUsuarios;
        setTimeout(() => {
          Notiflix.Block.Remove('#listadoUsuarios');          
        }, 800)
      })
    )
    .subscribe((response:ResponseUsuarioModel[]) => {
      
      this.lstaUsuarios = response.map( usro => {
        let usuario = new ResponseUsuarioModel();
        usuario.dateOfBirth = usro.dateOfBirth;
        usuario.email = usro.email;
        usuario.firstName = usro.firstName;
        usuario.id = usro.id;
        usuario.isEnabled = usro.isEnabled;
        usuario.lastName = usro.lastName;
        usuario.password = usro.password;
        usuario.userName = usro.userName;
        return usuario;
      });
      
    },error => {

    });
  }

  agregarUsuario(){
    this._router.navigate(['/Usuario/nuevo'])
  }

  eliminarUsuario(index: number){
    
    let request:RequestDltUsuarioModel = {
      usuario: localStorage.getItem('userName'),
      idUsuarioDel: index
    }
    
    this._usuaiosService.deleteUsuario(request)
    .pipe(
      finalize( () => {
        Notiflix.Notify.Success('Se elimino el usuario con exito');
        setTimeout(() => {
          this.obtenerListaUsuaios();        
        }, 600)
      })
    )
    .subscribe()
    
  }

  modificarUsuario(index: number){
    this._router.navigate(['/Usuario/' + index]);
  }

}
