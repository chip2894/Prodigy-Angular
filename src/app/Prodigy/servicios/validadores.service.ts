import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RequestValUsuarioModel } from '../models/request/request.valusuario.model';
import { UsuariosService } from './usuarios.service';

interface ErrorValidate{
  [s:string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor(private _usuarioService: UsuariosService) { }

  passwordsSame(pass1: string, pass2:string){
    
    return ( formGroup: FormGroup ) =>{
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }
      else
      {
        pass2Control.setErrors({noEsIgual: true})
      }
    }
  }  
}
