import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../class/order';

const ORDER_API = "http://localhost:8080/api/order/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  
  getListOrder():Observable<any>{
    return this.http.get(ORDER_API,httpOptions);
  }

  createOrder(order: Order):Observable<any>{
    return this.http.post(ORDER_API + 'create',order,httpOptions);
  }
  


}
