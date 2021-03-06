import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BcscContainerComponent } from './components/bcsc-container/bcsc-container.component';
import { bcscPages } from './bcsc-registration-page-routing.module';
import { BcscConfirmationComponent } from './pages/bcsc-confirmation/bcsc-confirmation.component';
import { PrimeConstants } from '../../models/prime-constants';

const routes: Routes = [
  {
    path: '',
    component: BcscContainerComponent,
    children: bcscPages
  },
  {
    path: PrimeConstants.CONFIRMATION_PG,
    component: BcscConfirmationComponent,
    data: { title: 'BCSC Registration Confirmation'}
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcscRegistrationRoutingModule { }
