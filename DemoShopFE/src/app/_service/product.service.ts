import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../class/product';

const PRODUCT_API = "http://localhost:4000/api/products/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post('http://localhost:4000/api/products/', data);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(
      `http://localhost:4000/api/products/${product.id}`,
      product
    );
  }

  getListProduct(): Observable<any> {
    return this.http.get('http://localhost:4000/api/products', httpOptions);
  }
  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:4000/api/products/${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>('http://localhost:4000/api/products' + id, httpOptions);
  }
  createProduct(product: Product, file: File): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(product).forEach(key => {
      let value = product[key as keyof Product];
      if (typeof value === 'number') {
        value = value.toString();
      }
      formData.append(key, value);
    });
    formData.append('file', file);
    return this.http.post('http://localhost:4000/api/products/', formData);
  }

  // updateProduct(id: number, product: Product, file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   Object.keys(product).forEach(key => {
  //     let value = product[key as keyof Product];
  //     if (typeof value === 'number') {
  //       value = value.toString();
  //     }
  //     formData.append(key, value);
  //   });
  //   formData.append('file', file);
  //   return this.http.put('http://localhost:4000/api/products/' +id,formData);
  // }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete('http://localhost:4000/api/products/' + id, );
  }


}
