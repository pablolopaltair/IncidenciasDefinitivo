import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

   //ROLES Y AUTENTIFICACION
   userEmail: string;
   userIsAuthenticated = false;

  userId: string;
  userRango: number;


  constructor(
    private router: Router,
    //ROLES Y AUTENTIFICACION
    private userService: UserService,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        this.userId= user.uid
      }
      
      this.afAuth.authState.subscribe(user => {
        this.userIsAuthenticated = !!user;
      });
      
    });
   }

  ngOnInit(): void {
    this.getCurrentUser();
  }

public userUid: string = null;
//METODO PARA IDENTIFICAR LOS ROLES QUE POSEE EL USUARIO
public isAdmin: any = null;
public isDirectivo: any = null;
public isMantenimiento: any = null;
public isUsuario: any = null;
getCurrentUser() {
  this.userService.isAuth().subscribe(auth => {
    if (auth) {
      this.userUid = auth.uid;
      this.userService.isUserRole(this.userUid).subscribe(userRole => {

        

        //CHECKEO USUARIO
        if(userRole.rango == 0){
          this.isUsuario = true;
        }else{
          this.isUsuario  = false;
        };

        //CHECKEO MATENIMIENTO
        if(userRole.rango == 1){
          this.isMantenimiento = true;
        }else{
          this.isMantenimiento  = false;
        };

        //CHECKEO DIRECTIVO
        if(userRole.rango == 2){
          this.isDirectivo = true;
        }else{
          this.isDirectivo  = false;
        };

        //CHECKEO ADMIN
        if(userRole.rango == 3){
          this.isAdmin = true;
        }else{
          this.isAdmin  = false;
        };


      })
    }
  })
}


onClick() {
  this.userService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(error => console.log(error));
}


}
