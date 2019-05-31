import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  private formGroup: FormGroup;
  private returnUrl: string;
  constructor(private authService: AuthService, private router: Router,
              private activated: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activated.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl;
    });

    this.formGroup = this.formBuilder.group({
      username: [undefined, []],
      password: [undefined, []]
    });
  }

  login(): void {
    const username = this.formGroup.get('username').value;
    const password = this.formGroup.get('password').value;
    this.authService.authenticate(username, password).subscribe(() => {
      // const url = this.returnUrl || '/';
      this.router.navigate(['home']);
    }, (error) => {
      this.formGroup.setErrors({
        notAuthorized: true
      });
    });
  }

}
