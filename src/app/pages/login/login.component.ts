import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  view = 1;

  constructor(private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>
    , private userService : UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthday: ['', Validators.required],
    });

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  onSubmit() {
    console.log('Formulário enviado:', this.loginForm.value);
  }
  onRegisterSubmit(){
    let birthday = this.registerForm.value.birthday
    const formattedBirthday = `${birthday.getFullYear()}-${(birthday.getMonth() + 1).toString().padStart(2, '0')}-${birthday.getDate().toString().padStart(2, '0')}`; 
    this.registerForm.value.birthday = formattedBirthday
    console.log('Formulário enviado:', this.registerForm.value);
    this.userService.register(this.registerForm.value).
  }

  changeView(value:number){
    this.view = value;
  }
}
