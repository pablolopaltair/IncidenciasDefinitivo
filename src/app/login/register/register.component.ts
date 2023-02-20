import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: any;
formReg: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService
  ) { 

  this.formReg= new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  })
}

  ngOnInit(): void {
    this.formReg.setValidators(this.checkPasswords);
  }

  onSubmit(){
    
    if (this.formReg.valid) {
      this.userService.register(this.formReg.value)
        .then(response =>{
          this.router.navigate(['/']);
          console.log(response);
        })
        .catch(error => {
          this.error = error.message;
          return of(false);
        });
    } else {
      this.formReg.markAllAsTouched();
    }
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
  
    return password === confirmPassword ? null : { notSame: true };
  }

}
