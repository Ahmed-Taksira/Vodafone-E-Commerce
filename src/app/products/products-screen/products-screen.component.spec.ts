import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsScreenComponent } from './products-screen.component';

describe('ProductsScreenComponent', () => {
  let component: ProductsScreenComponent;
  let fixture: ComponentFixture<ProductsScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsScreenComponent]
    });
    fixture = TestBed.createComponent(ProductsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
