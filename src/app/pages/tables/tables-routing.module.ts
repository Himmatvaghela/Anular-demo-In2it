import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LocalListComponent } from './local-list/local-list.component';

const routes: Routes = [
    {
      path:'',
      redirectTo:'products',
      pathMatch:"full"
    },
    {
      path:'products',
      component:ProductsComponent
    },{
      path:'products/local-list',
      component:LocalListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }