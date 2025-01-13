import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  credentials = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService,
              private router: Router,
              private toast: MatSnackBar) { }


  login() {
    this.authService.login(this.credentials)
      .then(() => {
        this.router.navigate(['/dashboard/flights']);
      })
      .catch((error) => {
        this.toast.open(error.message, 'Close', {
          duration: 2000
        });
      });
  }

  register() {
    this.authService.register(this.credentials)
      .then(() => {
        let config: MatSnackBarConfig = {
          panelClass: ['toast-success'],
        };
        this.toast.open('Account create successfully', '', config);
      })
      .catch((error) => {
        let configErr: MatSnackBarConfig = {
          panelClass: ['toast-error'],
        };
        this.toast.open(error.message, '', configErr)
        ;
      });


  }

}
