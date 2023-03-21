import { Employee } from './../model/Employee';
import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../service/employee.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  profileForm:FormGroup;
  empl:Employee|undefined;
  employee = {} as Employee;



  constructor (private fb: FormBuilder,private _snackBar: MatSnackBar,private employees: EmployeeService,private router: Router){
    this.profileForm = this.fb.group({

      name:new FormControl('',[Validators.required]),
      emailId:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/)]),
      phoneNo:new FormControl('',[Validators.required,Validators.pattern(/^[7-9]\d{9}$/)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      confirmPassword:new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),



    },{Validators:[this.checkIfEmailsAreValid,this.checkPassword]});
   }



  openSnack() {

    this._snackBar.open('Feedback submitted successfully', 'success', {​
      duration: 5000,​
      panelClass: ['mat-toolbar', 'mat-primary']​
      })

  }
  get name(){
    return this.profileForm.get("name");
  }

  get emailId(){
    return this.profileForm.get("emailId");
  }
  get password(){
    return this.profileForm.get("password");
  }
  get confirmPassword(){
    return this.profileForm.get("confirmPassword");
  }


  get phoneNo(){
    return this.profileForm.get("phoneNo");
  }


  @Output()
  addEmployee:EventEmitter<Employee>=new EventEmitter<Employee>();

  user={

  }







  checkIfEmailsAreValid(c: AbstractControl) {
    if (c.value !== '') {
      const emailString = c.value;
      const emails = emailString.split(',').map((e: string) => e.trim());
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
      if (!anyInvalidEmail) {
        return { checkIfGuestEmailsAreValid: false }
      }
    }
    return null;
  }
  checkPassword(c:AbstractControl){
    const password1=c.get('password')?.value;
    const password2=c.get('confirm_password')?.value;
    if(!password1 || !password2) {
      return null;
    }
  if(password1 != password2){
    return {passwordMatch:false};

  }
  return null;
  }

  saveEmployee(){
    this.employee!.name=this.profileForm.controls['name'].value;
    this.employee!.emailId=this.profileForm.controls['emailId'].value;
    this.employee!.phoneNo=this.profileForm.controls['phoneNo'].value;
    this.employee!.password=this.profileForm.controls['password'].value;
    this.employee!.confirmPassword=this.profileForm.controls['confirmPassword'].value;
    this.employees.createEmployee(this.employee!).subscribe(
      data => {
        console.log(data);
        this.goToEmployee();
      },

      error => console.log(error)
    );

  }

  goToEmployee(){

    this.router.navigate(['/login']);
  }

  onSubmit(){

    alert("Registration completed successfully");

    this.saveEmployee();
    this.profileForm.reset();
    this._snackBar.open('Feedback submitted successfully', 'success', {​
      duration: 5000,​
      panelClass: ['mat-toolbar', 'mat-primary']​
      })

  }
  register(){
    console.log(this.profileForm.value);
    if (this.employee.name=='' && this.employee.emailId && this.employee.phoneNo==''&& this.employee.password==''&&this.employee.confirmPassword) {

      alert('one or more fields are required');


    }else{
      // this.employees.isLoggedIn=true;
      alert('successfully signed up');

      this.router.navigate(['/login']);

    }

    this._snackBar.open('Feedback submitted successfully', 'success', {​
      duration: 5000,​
      panelClass: ['mat-toolbar', 'mat-primary']​
      })



  }

  }

























