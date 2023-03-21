import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {



  private URL = "http://localhost:8082/api/v1/customers";

  constructor(private httpClient:HttpClient) { }
  getEmployeesList(): Observable <Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.URL}`);


  }
  createEmployee(data:any):Observable <Object>{
    console.log(data);
    return this.httpClient.post(this.URL,data);
  }
}
