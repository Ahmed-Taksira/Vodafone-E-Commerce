import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private products: Product[] = [];
  productsChanged = new Subject<Product[]>();

  chosenCategory: string = '';

  getCategories() {
    return this.http.get('https://fakestoreapi.com/products/categories/');
  }

  getProductsOfCategory(category: string) {
    if (this.chosenCategory == category) {
      return of(this.products.slice());
    } else {
      this.http
        .get(`https://fakestoreapi.com/products/category/${category}`)
        .subscribe((res: Product[]) => {
          this.products = res;
          this.chosenCategory = category;
          this.productsChanged.next(this.products.slice());
        });

      return this.productsChanged.asObservable();
    }
  }

  addProduct(product) {
    return new Observable<void>((observer) => {
      this.http.post('https://fakestoreapi.com/products', product).subscribe(
        (res: any) => {
          let newProduct: Product = new Product(
            res.id,
            res.title,
            res.price,
            res.description,
            res.category,
            res.image,
            { rate: 0, count: 0 }
          );
          this.products.push(newProduct);
          this.productsChanged.next(this.products.slice());
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  deleteProduct(id: number) {
    return new Observable<void>((observer) => {
      this.http.delete(`https://fakestoreapi.com/products/${id}`).subscribe(
        (_) => {
          this.products = this.products.filter((p) => p.id != id);
          this.productsChanged.next(this.products.slice());
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  editProduct(product) {
    const { id, ...data } = product;
    return new Observable<void>((observer) => {
      this.http.put(`https://fakestoreapi.com/products/${id}`, data).subscribe(
        (res: any) => {
          const index: number = this.products.findIndex((p) => p.id === id);
          const prevProduct: Product = this.products[index];
          this.products[index] = new Product(
            res.id,
            res.title,
            res.price,
            res.description,
            res.category,
            res.image,
            prevProduct.rating
          );
          this.productsChanged.next(this.products.slice());
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getProductById(id: number) {
    return this.products.find((p) => p.id === id);
  }
}
