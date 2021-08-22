import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    ProviderComponent,
    ProviderListComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    NzDropDownModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class ProviderModule {}
