import { Injectable } from '@angular/core';
import { Authentication } from './authentication.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  formData :  Authentication = new Authentication();

  constructor() { }
}
