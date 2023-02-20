import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})


export class AutentificadoGuard implements CanActivate {


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
    ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.afAuth.authState.pipe(
        map(authState => !!authState),
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/login']);
          }
        })
      );
  }
  




}
