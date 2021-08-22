import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderComponent } from './provider.component';

const routes: Routes = [
  { path: '', component: ProviderComponent },
  { path: 'list', component: ProviderListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
