import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumListComponent } from './components/curriculum-list/curriculum-list.component';
import { CurriculumRegisterComponent } from './components/curriculum-register/curriculum-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CurriculumListComponent,
    CurriculumRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    CurriculumRoutingModule
  ]
})
export class CurriculumModule { }
