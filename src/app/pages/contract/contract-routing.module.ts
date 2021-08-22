import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractComponent } from './contract.component';

const routes: Routes = [
  { path: '', component: ContractComponent },
  { path: 'list', component: ContractListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
