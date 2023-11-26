import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorAddProductComponent } from './vendedor-add-product.component';

describe('VendedorAddProductComponent', () => {
  let component: VendedorAddProductComponent;
  let fixture: ComponentFixture<VendedorAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendedorAddProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
