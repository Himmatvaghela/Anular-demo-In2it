import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'my-menu/my-task',
    pathMatch: 'full'
  },
    {
      path:'my-menu',
      loadChildren:()=> import('./pages/my-menu/my-menu.module').then(mod=>mod.MyMenuModule),
    },
    {
      path:'my-organization',
      loadChildren:()=> import('./pages/my-organization/my-organization.module').then(mod=>mod.MyOrganizationModule),
    },
    {
      path:'designer',
      loadChildren:()=> import('./pages/designer/designer.module').then(mod=>mod.DesignerModule),
    },
    {
      path:'tables',
      loadChildren:()=> import('./pages/tables/tables.module').then(mod=>mod.TablesModule),
    },
    {
      path:'settings',
      loadChildren:()=> import('./pages/settings/settings.module').then(mod=>mod.SettingsModule),
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
