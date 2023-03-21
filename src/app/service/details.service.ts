import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Login = {
  emailId: string;
  password: string;

}

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  isLoggedIn: boolean = false;

  private URL = "http://localhost:8082/api/v1/login";

  constructor(private http: HttpClient) { }

  verifyLogin(data:any) {
    return this.http.post(this.URL,data);
  }
}
