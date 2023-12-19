import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product,cart, order } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api';
  removeProductFromCart(productId: number) {
    throw new Error('Method not implemented.');
  }
  cartData= new EventEmitter<product[] | []>();

  constructor(private http:HttpClient) { }
  addProduct(data: product) {
    return this.http.post(`${this.baseUrl}/products`, data);
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/api/products');
    }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.baseUrl}/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(`${this.baseUrl}/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<product[]>(`${this.baseUrl}/products?_limit=3`);
  }

  trendyProducts() {
    return this.http.get<product[]>(`${this.baseUrl}/products?_limit=5`);
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`${this.baseUrl}/products?q=${query}`);
  }

  localaddToCart(data:product){
   let cartData=[];
   let localCart = localStorage.getItem('localCart');
   if(!localCart){
    localStorage.setItem('localCart',JSON.stringify([data]));
    this.cartData.emit([data]);
   }else{
    cartData=JSON.parse(localCart);
    cartData.push(data);
    localStorage.setItem('localCart',JSON.stringify(cartData));
   }
   this.cartData.emit(cartData);
  }
  removeItemFromCart(productId:number){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
     let items:product[]=JSON.parse(cartData);
     items = items.filter((item:product)=>productId!==item.id);
     localStorage.setItem('localCart',JSON.stringify(items));
     this.cartData.emit(items);
  }
 }
 addToCart(cartData:cart){
  return this.http.post('http://localhost:3000/cart',cartData);
 }
 getCartList(userId:number){
  return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,
  {observe:'response'}).subscribe((result)=>{
    console.warn(result);
    if(result && result.body){
      this.cartData.emit(result.body);
    }
  });
 }
 removeToCart(cartId:number){
  return this.http.delete('http://localhost:3000/api/cart/'+cartId);
 }
 currentCart(){
  let userStore = localStorage.getItem('user');
  let userData = userStore && JSON.parse(userStore);
  return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
 }
 orderNow(data:order){
  return this.http.post('http://localhost:3000/api/orders',data);
 }
 orderList(){
  let userStore=localStorage.getItem('user');
  let userData=userStore && JSON.parse(userStore);
  return this.http.get<order[]>('http://localhost:3000/api/orders?userId='+userData.id);
 }
 deleteCartItems(cartId:number){
  return this.http.delete('http://localhost:3000/api/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
    if(result){
      this.cartData.emit([]);
    }
  });
 }
 cancelOrder(orderId:number){
  return this.http.delete('http://localhost:3000/api/orders/'+orderId);
 }
}
