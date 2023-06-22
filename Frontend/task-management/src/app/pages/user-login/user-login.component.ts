import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loginForm!: FormGroup;
  userData!: User;

  public user: Login = new Login();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  // set the user to the local storage
  public setUser() {
    this.loginService.setUser(this.userData);
  }
  // User login process
  public userLogin() {
    if (this.loginForm.valid) {
      this.loginService.login(this.user).subscribe(
        (data) => {
          console.log(data);

          // Set token into local storage
          this.loginService.setUserLoginToken("success");
          this.getCurrentUser(this.user.email);
          this.showSuccessSweetAlert('Login Success!', 'You have successfully logged in.');
        },
        (error) => {
          this.showErrorSnackbar('Invalid credentials. Please check your email and password.');
          console.log(error);
        }
      );
    } else {
      if (this.loginForm.get('email')?.invalid && this.loginForm.get('password')?.invalid) {
        this.showErrorSnackbar('email and Password are required.');
      } else if (this.loginForm.get('email')?.invalid) {
        this.showErrorSnackbar('email is required.');
      } else if (this.loginForm.get('password')?.invalid) {
        this.showErrorSnackbar('Password is required.');
      }
    }
  }

  public getCurrentUser(email: string) {
    this.loginService.getCurrentUser(email).subscribe((user: any) => {
      this.userData = user;
      this.setUser();
      this.loginService.userLogin();
      console.log(user);
      this.router.navigate(['dashboard']);
    });
  }

  public showSuccessSweetAlert(title: string, message: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
    });
  }

  public showErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000, // Set the duration to 2000 milliseconds (2 seconds)
    });
  }

}
