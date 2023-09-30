import { NgModule } from '@angular/core';
import 'tslib';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesScreenComponent } from './products/categories-screen/categories-screen.component';
import { ProductsScreenComponent } from './products/products-screen/products-screen.component';
import { CategoryCardComponent } from './products/categories-screen/category-card/category-card.component';
import { ProductCardComponent } from './products/products-screen/product-card/product-card.component';
import { EditProductComponent } from './products/products-screen/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    ProductsComponent,
    CategoriesScreenComponent,
    ProductsScreenComponent,
    CategoryCardComponent,
    ProductCardComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateHttpLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
