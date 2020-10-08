import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  { path: 'ordersuccess', component: OrderSuccessComponent },
  { path: '', component: ProductDetailsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
