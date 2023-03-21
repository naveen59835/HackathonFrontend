import { DetailsService } from './../service/details.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;



  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient,private emp:DetailsService) {

    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required,]],
      password: ['', Validators.required]
    });

  }
get emailId(){
  return this.loginForm.get('emailId');
}
get password(){
  return this.loginForm.get('password');
}


  onSubmit() {
    this.emp.verifyLogin(this.loginForm.value).subscribe(data => {
      this.emp.isLoggedIn=true;
      this.router.navigate(['/details']);

    },error => {
      alert ("Wrong email or password");
    })
}



}
