import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorUpdateProductComponent } from './vendedor-update-product.component';

describe('VendedorUpdateProductComponent', () => {
  let component: VendedorUpdateProductComponent;
  let fixture: ComponentFixture<VendedorUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendedorUpdateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
