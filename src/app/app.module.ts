import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerViewComponent } from './customer/customer-view/customer-view.component';
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'
import { HttpClientModule } from '@angular/common/http';
import { CustomerEditDetailsComponent } from './customer/customer-edit-details/customer-edit-details.component';
import { CustomerViewDetailsComponent } from './customer/customer-view-details/customer-view-details.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { AdminSignUpComponent } from './admin-sign-up/admin-sign-up.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailsComponent,
    CustomerViewComponent,
    CustomerEditDetailsComponent,
    CustomerViewDetailsComponent,
    UserSignUpComponent,
    AdminSignUpComponent,
    LoginComponent,
    AdminDashboardComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
