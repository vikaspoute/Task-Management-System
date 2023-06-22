import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/guard/auth-guard.guard';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { UserAuthGuard } from './services/guard/user-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: UserRegisterComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserAuthGuard] },
  { path: "add-task", component: AddTaskComponent, canActivate: [UserAuthGuard] },
  { path: "update-task/:id", component: AddTaskComponent, canActivate: [UserAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
