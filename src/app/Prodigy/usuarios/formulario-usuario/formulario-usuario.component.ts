import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestAddUsuarioModel } from 'app/Prodigy/models/request/request.addusuario.model';
import { ValidadoresService } from '../../servicios/validadores.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { finalize } from 'rxjs/operators';
import Notiflix from "notiflix";
import { RquestCnslUsuarioModel } from 'app/Prodigy/models/request/request.cnslusuario.model';
import { ResponseUsuarioModel } from '../../models/response/response.usuario.model';
import { RequestModUsuarioModel } from 'app/Prodigy/models/request/request.modusuario.model';
import { RequestValUsuarioModel } from 'app/Prodigy/models/request/request.valusuario.model';


const ANOTHER_FORMATS: MatDateFormats  = {
  parse: {
      dateInput: 'DD/MM/YYYY',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MM YYYY',
      dateA11yLabel: 'DD.MM.YYYY',
      monthYearA11yLabel: 'MM YYYY',
  },
};


@Component({
  selector: 'vex-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: ANOTHER_FORMATS},
  ],
})
export class FormularioUsuarioComponent implements OnInit {

  currentSection: string[] = ['Usuarios', 'Agregar'];
  previousRoute: string = '../../';
  formularioUsuarios: FormGroup;
  idUsuario: number = 0;
  datosUsuario: ResponseUsuarioModel | null;

  //#region Validaciones
  get userNameInvalid(){
    return this.formularioUsuarios.get('userName').invalid  && this.formularioUsuarios.get('userName').touched
  }
  get passwordInvalid(){
    return this.formularioUsuarios.get('password').invalid  && this.formularioUsuarios.get('password').touched
  }
  get firstNameInvalid(){
    return this.formularioUsuarios.get('firstName').invalid  && this.formularioUsuarios.get('firstName').touched
  }
  get lastNameInvalid(){
    return this.formularioUsuarios.get('lastName').invalid  && this.formularioUsuarios.get('lastName').touched
  }
  get emailInvalid(){
    return this.formularioUsuarios.get('email').invalid  && this.formularioUsuarios.get('email').touched
  }
  get confirmPassInvalid(){
    const pass1 = this.formularioUsuarios.get('password').value;
    const pass2 = this.formularioUsuarios.get('confirmPassword').value;
    return (pass1 === pass2) ? false : true;
  }
  //#endregion

  constructor(private fb: FormBuilder, private _activatedRoute: ActivatedRoute,
    private _validadoresService: ValidadoresService, private _usuariosService: UsuariosService,
    private router: Router) {
    this._activatedRoute.params.subscribe( params => {
      
      this.idUsuario = params['id'] == 'nuevo' ? 0 : +params['id'];      
      
    });
  }

  ngOnInit(): void {

    this.cargarFormulario();

    if(this.idUsuario > 0){

      let request: RquestCnslUsuarioModel = {
        usuario: localStorage.getItem('userName'),
        idUsuario: this.idUsuario
      }

      this._usuariosService.consultarUsuarioById(request)
      .pipe(
        finalize( () => {
          this.cargarDatos();
        })
      )
      .subscribe(
        (response: ResponseUsuarioModel) =>{
        
          this.datosUsuario = response;

        },error => {

        }
      );

    }

  }

  cargarFormulario(){
    this.formularioUsuarios = this.fb.group({
      userName:["",[Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/),Validators.maxLength(150)]],
      password:["",[Validators.required, Validators.pattern(/^[a-zA-Z0-9\W]+$/), Validators.minLength(8)]],
      confirmPassword:["",Validators.required],
      email:["",[Validators.email, Validators.maxLength(150)]],
      firstName:["",[Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/), Validators.maxLength(75)]],
      lastName:["",[Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/), Validators.maxLength(75)]],
      dateOfBirth:[""],
    },{
      validators: this._validadoresService.passwordsSame('password','confirmPassword')
    });
  }

  cargarDatos(){

    console.log();
    
    this.formularioUsuarios.get('userName').setValue(this.datosUsuario.userName);
    this.formularioUsuarios.get('email').setValue(this.datosUsuario.email);
    this.formularioUsuarios.get('firstName').setValue(this.datosUsuario.firstName);
    this.formularioUsuarios.get('lastName').setValue(this.datosUsuario.lastName);
    this.formularioUsuarios.get('dateOfBirth').setValue(new Date(this.datosUsuario.dateOfBirth).toISOString().slice(0, 10));
    this.formularioUsuarios.get('password').setValue(this.datosUsuario.password);
  }

  guardarUsuario(){
    
    if(this.formularioUsuarios.invalid){
      return Object.values( this.formularioUsuarios.controls ).forEach( control => {
        control.markAllAsTouched();
      });
    }

    let request: RequestAddUsuarioModel = {
      usuario: localStorage.getItem('userName'),
      userName: this.formularioUsuarios.get('userName').value,
      email: this.formularioUsuarios.get('email').value,
      firstName: this.formularioUsuarios.get('firstName').value,
      lastName: this.formularioUsuarios.get('lastName').value,
      dateOfBirth: this.formularioUsuarios.get('dateOfBirth').value,
      password: this.formularioUsuarios.get('password').value,
      isEnabled: false
    }

    this._usuariosService.addUsuarios(request)
    .pipe(
      finalize( () => {
        Notiflix.Notify.Success('Se agrego el usuario ' + request.userName + ' con exito');
        setTimeout(() => {
          this.router.navigate(['/']);        
        }, 600)
      })
    )
    .subscribe( response => {
    },error => {

    });    

  }

  modificarUsuario(){
    if(this.formularioUsuarios.invalid){
      return Object.values( this.formularioUsuarios.controls ).forEach( control => {
        control.markAllAsTouched();
      });
    }

    let request: RequestModUsuarioModel = {
      usuario: localStorage.getItem('userName'),
      idUsuarioMod: this.idUsuario,
      userNameMod: this.formularioUsuarios.get('userName').value,
      emailMod: this.formularioUsuarios.get('email').value,
      firstNameMod: this.formularioUsuarios.get('firstName').value,
      lastNameMod: this.formularioUsuarios.get('lastName').value,
      dateOfBirthMod: this.formularioUsuarios.get('dateOfBirth').value,
      passwordMod: this.formularioUsuarios.get('password').value,
      isEnabledMod: this.datosUsuario.isEnabled
    }

    this._usuariosService.alterUsuario(request)
    .pipe(
      finalize( () => {
        Notiflix.Notify.Success('Se modificarón los datos de el usuario ' + request.userNameMod + ' con exito');
        setTimeout(() => {
          this.router.navigate(['/']);        
        }, 600)
      })
    )
    .subscribe( response => {
    },error => {

    });

  }

  validarUsuario(){
    let request:RequestValUsuarioModel = {
      usuario: localStorage.getItem('userName'),
      usuarioValid : this.formularioUsuarios.get('userName').value
    }
    this._usuariosService.validarUsuario(request).subscribe(
      response =>{
        if(response)
        {
          this.formularioUsuarios.get('userName').setErrors({'existe':true})
        }        
      }
    )
  }

}


