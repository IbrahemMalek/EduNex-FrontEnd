import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if the user is authenticated
    const isAuthenticated = this.checkIfAuthenticated();

    // If authenticated, allow navigation
    if (isAuthenticated) {
      return true;
    } else {
      // If not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }

  // Method to check if the user is authenticated
  private checkIfAuthenticated(): boolean {
    // Implement your authentication logic here
    // For example, check if the user is logged in or if they have a valid token
    return true; // Replace this with your actual authentication check
  }
}
