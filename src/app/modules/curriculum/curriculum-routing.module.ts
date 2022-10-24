import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumListComponent } from './components/curriculum-list/curriculum-list.component';
import { CurriculumRegisterComponent } from './components/curriculum-register/curriculum-register.component';

const routes: Routes = [
  { path:'', component: CurriculumListComponent},
  { path:'register', component: CurriculumRegisterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }
