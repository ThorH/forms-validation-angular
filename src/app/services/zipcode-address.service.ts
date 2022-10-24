import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../interfaces/address';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ZipcodeAddressService {

  constructor(private http: HttpClient) { }

  getAddress(cep: string): Observable<Address> {
    return this.http.get<Address>(`https://viacep.com.br/ws/${cep}/json`)
  }

}
