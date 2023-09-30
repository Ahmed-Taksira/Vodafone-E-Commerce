import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Product } from '../../product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  form: FormGroup;
  productId: number;
  product: Product;

  imageUrl: string = '';
  imageSub: Subscription;

  isLoading: boolean = false;
  isDone: boolean = false;

  categoryOptions: string[] = [];

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.imageSub = this.form.get('image').valueChanges.subscribe((value) => {
      this.imageUrl = value;
    });

    this.productsService
      .getCategories()
      .subscribe((res: string[]) => (this.categoryOptions = res));

    let tempId = this.route.snapshot.paramMap.get('id');
    if (tempId) {
      this.productId = +tempId;
      this.product = this.productsService.getProductById(this.productId);
      this.imageUrl = this.product.image;
      this.setControls();
    } else this.productId = null;
  }

  setControls() {
    this.form.get('image').setValue(this.product.image);
    this.form.get('title').setValue(this.product.title);
    this.form.get('category').setValue(this.product.category);
    this.form.get('price').setValue(this.product.price);
    this.form.get('description').setValue(this.product.description);
  }

  onSubmit() {
    if (this.productId) {
      this.isLoading = true;
      let data = {
        id: this.productId,
        ...this.form.value,
      };
      this.productsService.editProduct(data).subscribe(
        (_) => {
          this.isLoading = false;
          this.isDone = true;
        },
        (e) => console.log(e)
      );
    } else {
      this.isLoading = true;
      this.productsService.addProduct(this.form.value).subscribe(
        (_) => {
          this.isLoading = false;
          this.isDone = true;
        },
        (e) => console.log(e)
      );
    }
  }

  ngOnDestroy(): void {
    this.imageSub.unsubscribe();
  }
}
