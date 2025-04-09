import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { GuestComponent } from './components/guests/guests.component';
import { RoomComponent } from './components/room/room.component';
import { RateComponent } from './components/room/rate/rate.component';
import { PaymentComponent } from './components/payment/payment.component';
// import { StaffComponent } from './components/staff/staff.component';
import { InventoryComponent } from './components/inventory/inventory.component';
// import { DepartmentComponent } from './components/department/department.component';
// import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'homepage', component: HomepageComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  {path: 'user', component: UserComponent },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard] },
  { path: 'reservation', component: ReservationComponent,  canActivate: [AuthGuard] },
  { path: 'guest', component: GuestComponent,  canActivate: [AuthGuard] },
  { path: 'rooms', component: RoomComponent,  canActivate: [AuthGuard] },
  {path: 'rate', component: RateComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentComponent,  canActivate: [AuthGuard] },
  // { path: 'view-staff', component: StaffComponent,  canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent,  canActivate: [AuthGuard] },
  // { path: 'staff', component: StaffComponent,  canActivate: [AuthGuard] },
  // { path: 'department', component: DepartmentComponent,  canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/homepage' } // Handle invalid routes
];

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { RoomListComponent } from '../../../HotelManagementSystemUI/src/app/components/room/room-list/room-list.component';
// import { RoomFormComponent } from '../../../HotelManagementSystemUI/src/app/components/room/room-form/room-form.component';


// const routes: Routes = [
//   { path: '', redirectTo: 'rooms', pathMatch: 'full' },
//   { path: 'rooms', component: RoomListComponent },
//   { path: 'add-room', component: RoomFormComponent },
//   { path: 'edit-room/:id', component: RoomFormComponent }
// ];


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
