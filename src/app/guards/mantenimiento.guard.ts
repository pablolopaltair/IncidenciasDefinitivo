import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.firestore.doc(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }),
        map((user: any) => {
          if (user.rango == 1 || user.rango == 3) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        })
      );
  }
  
}
