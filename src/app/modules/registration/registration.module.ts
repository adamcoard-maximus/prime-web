import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationRoutingModule} from './registration-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { DocumentUploadComponent } from './pages/document-upload/document-upload.component';
import { SecurityComponent } from './pages/security/security.component';
import {NewAccountComponent} from './pages/new-account/new-account.component';
import { LoginComponent } from './pages/login/login.component';
import {CoreModule} from '../core/core.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {RegCompleteComponent} from './pages/complete/reg-complete.component';
import { RegistrationContainerComponent } from './components/registration-container/registration-container.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RegistrationRoutingModule
  ],
  declarations: [
    NewAccountComponent,
    ProfileComponent,
    DocumentUploadComponent,
    SecurityComponent,
    DashboardComponent,
    RegCompleteComponent,
    RegistrationContainerComponent
  ]
})
export class RegistrationModule { }
