import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product, } from '../models/Product';
import { CartItem, } from '../models/CartItem';

import { map, tap } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private products: Product[];
  private BASE_URL = environment.API_URL;
  private DEFAULT_ID = environment.DEFAULT_ID;

  constructor(private http: HttpClient) { }

  getProducts(searchTerm: any = "", pagination: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/shop`, {
      params: {
        q: searchTerm,
        p: pagination
      }
    });
  }

  addItem(ProductID: string, Quantity: number, CartID: number = this.DEFAULT_ID): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/cart`, { ProductID, Quantity, CartID })
  }

  deleteCartItem(OrderID: any): Observable<any> {
    return this.http.request<any>('delete', `${this.BASE_URL}/cart`, { body: { "Id": OrderID } })
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.BASE_URL}/cart`);
  }

  changeQuantity(Id: number, Quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(`${this.BASE_URL}/cart`, { Id, Quantity });
  }
}
