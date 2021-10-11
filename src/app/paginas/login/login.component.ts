import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    localStorage.clear();

  }

  onSubmit(){
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        this.authService.login(username, password).subscribe(
          data=>{
            console.log(data);
            localStorage.clear();
            localStorage.setItem("Logueado","1");
            localStorage.setItem("Token",data['token']);
            this.router.navigate(["/tablero"]);
          },
          error=>{
            this.loginInvalid = true;
            console.log(error);
          }
        );
    } else {
      this.formSubmitAttempt = true;
    }
  }
}