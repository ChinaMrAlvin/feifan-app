import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DetailInfoComponent} from './detailInfo.component';
import { SummaryComponent } from './summary.component';
import { LoginComponent } from './login.component';
import { ViewControlComponent } from './view.component';
import { OneTipsComponent } from './lookonetips.component';
import { EditOneTipsComponent } from './editonetips.component';
import { AddNewComponent } from "./addnew.component";

import { DemoAnimateComponent } from './ex-demo-component';
const routes:Routes=[
 
  // { path: 'detailInfo/page/1',  component: DetailInfoComponent },
  {
		path:'detailInfo/page/:page',
		component:DetailInfoComponent
  },
  {
    path:'echarts',
    loadChildren:'./echarts/echarts.module#EchartsModule'
  },
  { path: 'detailOne/:id',component:OneTipsComponent},
  { path:'editOne/:id',component:EditOneTipsComponent},
  { path: 'summary',     component: SummaryComponent },
  { path:'addNew', component:AddNewComponent},
  { path:'login',component:LoginComponent },
  { path:'viewCtrl',component:ViewControlComponent},
  { path:'demoAnimate',component:DemoAnimateComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}