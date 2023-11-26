import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { VendedorAddProductComponent } from './vendedor-add-product/vendedor-add-product.component';
import { VendedorAuthComponent } from './vendedor-auth/vendedor-auth.component';
import { VendedorHomeComponent } from './vendedor-home/vendedor-home.component';
import { VendedorUpdateProductComponent } from './vendedor-update-product/vendedor-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MisOrdenesComponent } from './mis-ordenes/mis-ordenes.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'vendedor-auth',component:VendedorAuthComponent},
  {path:'vendedor-home',component:VendedorHomeComponent,canActivate:[AuthGuard]},
  {path:'vendedor-add-product',component:VendedorAddProductComponent,canActivate:[AuthGuard]},
  {path:'vendedor-update-product/:id',component:VendedorUpdateProductComponent,canActivate:[AuthGuard]},
  {path:'search/:query',component:SearchComponent},
  {path:'details/:productId',component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'mis-ordenes',component:MisOrdenesComponent},
  {path:'estadistica',component:EstadisticaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
