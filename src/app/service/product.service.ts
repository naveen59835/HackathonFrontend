import { Product } from './../model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private URL = "http://localhost:8082/api/v2/products";
  constructor(private httpClient:HttpClient) { }
  getProductList(): Observable <Product[]>{
    return this.httpClient.get<Product[]>(`${this.URL}`);


  }
  createProduct(product:Product):Observable <Object>{
    console.log(product);
    return this.httpClient.post(`${this.URL}`,product);
  }
}
