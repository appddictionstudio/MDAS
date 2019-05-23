import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CpMainComponent } from './cp-main/cp-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'cp-main', pathMatch: 'full'},
  { path: 'cp-main', component: CpMainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
