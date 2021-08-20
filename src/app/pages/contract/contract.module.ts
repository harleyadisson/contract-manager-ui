import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


@NgModule({
  declarations: [
    ContractComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule
  ]
})
export class ContractModule { }
