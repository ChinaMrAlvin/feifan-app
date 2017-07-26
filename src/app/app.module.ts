import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DetailInfoComponent } from './detailInfo.component';
import { SummaryComponent } from './summary.component';
import {LoginComponent } from './login.component';
import {AppRoutingModule } from './app-routing.component';
import { MetaDataComponent } from './metadata.component';
import { ViewControlComponent } from './view.component';
import { OneTipsComponent } from './lookonetips.component';

import { EditOneTipsComponent } from './editonetips.component';
import { AddNewComponent } from './addnew.component';

//service
import {LoginService} from './login.service';
import { MetaDataService} from './metadata.service';

//animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import {ToastModule} from 'ng2-toastr/ng2-toastr';
//bootstrap
import { DemoAnimateComponent } from './ex-demo-component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    DetailInfoComponent,
    LoginComponent,
    MetaDataComponent,
    ViewControlComponent,
    OneTipsComponent,
    EditOneTipsComponent,
    DemoAnimateComponent,
    AddNewComponent
    // SimpleFormComp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ToastModule.forRoot(),
    AppRoutingModule
  ],
  providers: [LoginService,MetaDataService],//service
  bootstrap: [AppComponent]
})
export class AppModule { }
