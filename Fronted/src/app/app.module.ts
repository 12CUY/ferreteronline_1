import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { VendedorAuthComponent } from './vendedor-auth/vendedor-auth.component';
import { VendedorHomeComponent } from './vendedor-home/vendedor-home.component';
import { VendedorAddProductComponent } from './vendedor-add-product/vendedor-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VendedorUpdateProductComponent } from './vendedor-update-product/vendedor-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { FooterComponent } from './footer/footer.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MisOrdenesComponent } from './mis-ordenes/mis-ordenes.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VendedorAuthComponent,
    VendedorHomeComponent,
    VendedorAddProductComponent,
    VendedorUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    FooterComponent,
    CartPageComponent,
    CheckoutComponent,
    MisOrdenesComponent,
    EstadisticaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
