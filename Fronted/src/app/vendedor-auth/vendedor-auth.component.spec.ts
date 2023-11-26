import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorAuthComponent } from './vendedor-auth.component';

describe('VendedorAuthComponent', () => {
  let component: VendedorAuthComponent;
  let fixture: ComponentFixture<VendedorAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendedorAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
