

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  userEmail: string;
  userIsAuthenticated = false;
  

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {
    //RECIBE  EL EMAIL Y SI EL USUARIO ESTÁ AUTENTICADO
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
      }
      
      this.afAuth.authState.subscribe(user => {
        this.userIsAuthenticated = !!user;
      });
      
    });
  
   }

  ngOnInit(): void {

  }


//BOTÓN DE LOGOUT
  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  //REFRESCA LA PÁGINA PARA ACTUALIZAR LOS CAMBIOS
  refresh(): void {
    this.location.go(this.location.path());
    window.location.reload();
  }

}