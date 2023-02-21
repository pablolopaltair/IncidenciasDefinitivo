

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  userEmail: string;
  userIsAuthenticated = false;
  public editForm: FormGroup;
  usuarioRef: any;
  userIdForm: string;

  //TEST
  public userUid: string = this.userService.getUid();
  

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,

    public usuarioService: UsuarioService,
    public formBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    private router: Router,

  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        this.userIdForm = user.uid;
      }

      this.afAuth.authState.subscribe(user => {
        this.userIsAuthenticated = !!user;
      });
      
    });

     //Añadimos los campos que vayamos a rellenar, y se inicializan en blanco
     this.editForm = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      email:[{value: '', disabled: true}],
      rango:['']
      })
  
   }

  //Recuerda los datos de cada campo y los introduce por defecto en el formulario
  ngOnInit(): void {
    
    const id = this.userService.getUid();
  
     this.usuarioService.getUsuarioBySessionId(this.userService.getUid()).subscribe(res => {
       this.usuarioRef = res;
       this.editForm = this.formBuilder.group({
         id :[this.usuarioRef.id],
         email: [this.usuarioRef.email],
         rango: [this.usuarioRef.rango],
       })
     });

   
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }


  onSubmit() {
    const id = this.userIdForm;
    this.usuarioService.updateUsuario(this.editForm.value, id)
    this.router.navigate(['/'])
  }









}
