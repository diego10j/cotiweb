import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpcionMenu } from '../interfaces/interfaces';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMenu(){
    return localStorage.getItem("MENU");
  }

}
