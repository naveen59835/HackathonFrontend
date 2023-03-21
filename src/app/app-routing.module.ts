import { ActivateGuard } from './guards/activate.guard';
import { ProductsComponent } from './products/products.component';
import { DetailsComponent } from './details/details.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DeactivateGuard } from './guards/deactivate.guard';


const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"login", component:LoginComponent,canDeactivate:[DeactivateGuard]},//candeactivate
  {path:"registration",component:RegisterComponent},
  {path:"details",component:DetailsComponent,canActivate:[ActivateGuard]},//activate
  {path:"products",component:ProductsComponent,canActivate:[ActivateGuard]},
  {path:"", redirectTo:"/home",pathMatch:'full'},
  {path:"**", component: NotfoundComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
