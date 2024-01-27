import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
      private formBuilder: FormBuilder
    , private dateAdapter: DateAdapter<Date>
    , private userService : UserService
    , private toastr: ToastrService
    , private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthday: ['', Validators.required],
      name: ['', Validators.required]
    });

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  onSubmit() {
    console.log('Formulário enviado:', this.loginForm.value);

    this.userService.login(this.loginForm.value).subscribe({
      next:(res:any) => {
        this.toastr.success("Usuario logado!")
        // localStorage.setItem('token',res.token)
        this.router.navigate(['home'])
      },
      error: (error) =>{
        this.toastr.error("Cadastro falhou.")
      }
    }
    )
  }
  onRegisterSubmit(){
    let birthday = this.registerForm.value.birthday
    const formattedBirthday = `${birthday.getFullYear()}-${(birthday.getMonth() + 1).toString().padStart(2, '0')}-${birthday.getDate().toString().padStart(2, '0')}`;
    this.registerForm.value.birthday = formattedBirthday
    console.log('Formulário enviado:', this.registerForm.value);
    this.userService.register(this.registerForm.value).subscribe({
      next:(res) => {
        this.toastr.success("Usuario cadastro!")
        this.view = 1;
      },
      error: (error) =>{
        this.toastr.error("Cadastro falhou.")
      }
    }

    )
  }

  changeView(value:number){
    this.view = value;
  }
}
