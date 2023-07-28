import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './component/client/index/index.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { ProductComponent } from './component/admin/product/product.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { CartComponent } from './component/client/cart/cart.component';
import { OrderComponent } from './component/client/order/order.component';
import { UserOrderComponent } from './component/admin/user-order/user-order.component';
import { LoginComponent } from './component/client/login/login.component';
import { RegisterComponent } from './component/client/register/register.component';
import { PagetionComponent } from './component/client/pagetion/pagetion.component';
import { ProductDetailsComponent } from './component/client/product-details/product-details.component';

const routes: Routes = [
  {path:'',component: IndexComponent},
  {path: 'cart',component:CartComponent},
  {path:'productdetails/:id',component:ProductDetailsComponent},
  {path: 'login',component:LoginComponent},
  {path: 'pagination',component:PagetionComponent},
  {path: 'register',component:RegisterComponent},
  {path:'order',component:OrderComponent},
  {path:'admin',component: DashboardComponent,

    children: [
      {path:'',component:CategoryComponent},
      {path:'product',component:ProductComponent},
      {path:'order',component:UserOrderComponent}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
