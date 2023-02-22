import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { UserInterface } from '../modelos/rol.model';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { map } from 'rxjs/operators';

import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userIdForm: string;

  

  constructor(
    private auth: Auth, 
    private afsAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private sesionService: UsuarioService) { }



  register({ email, password }: any) {
      return new Promise((resolve, reject) => {
        this.afsAuth.createUserWithEmailAndPassword(email, password)
          .then(userData => {
            resolve(userData),
              this.updateUserData(userData.user)
          }).catch(err => console.log(reject(err)))
      });
  }

  
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(usuario => {
        this.sesionService.setUsuario(usuario);
        return usuario;
      })
      .catch(error => {
        throw new Error('No se pudo autenticar al usuario');
      });
  }

  logout() {
    return signOut(this.auth);
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }


  updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface ={
      id: user.uid,
      email: user.email,
      rango: 0
    }
    return userRef.set(data, { merge: true })
  }

  isUserRole(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }


  isAuthenticated() {
    return this.afsAuth.authState;
  }

  getUser(mail: string | null) {

    return this.afs.collection('users',
        ref => ref.where('email', "==", mail)
          .limit(1)).valueChanges();
  }
  
  getUid(){
    return this.afsAuth.currentUser.then(user => user.email);

  }
}
