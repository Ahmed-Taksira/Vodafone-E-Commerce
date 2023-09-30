import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth/auth.guard';
import { CategoriesScreenComponent } from './products/categories-screen/categories-screen.component';
import { ProductsScreenComponent } from './products/products-screen/products-screen.component';
import { EditProductComponent } from './products/products-screen/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CategoriesScreenComponent },
      { path: ':category', component: ProductsScreenComponent },
      { path: 'product/new', component: EditProductComponent },
      { path: 'product/edit/:id', component: EditProductComponent },
    ],
  },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
