import { Injectable, inject } from '@angular/core';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _authFb = inject(Auth)
  private readonly router = inject(Router)

  constructor() { }

  signIn(email: string, password: string){
  try{
    console.log(`Loggin user : ${email}, ${password}`)
    signInWithEmailAndPassword(this._authFb, email, password).then((userCredential: UserCredential) => {
      const user: User = userCredential.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }catch(e){
    console.log(e)
  }

  }
  signUp(email: string, password: string){
    console.log(`Registering user : ${email}, ${password}`)
    createUserWithEmailAndPassword(this._authFb,email,password).then((userCredential: UserCredential) => {
      const user: User = userCredential.user;
      console.log(user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  signOut(){
    signOut(this._authFb).then(()=>
      this.router.navigate(['/auth'])
    )
  }

  forgotPassword(email: string){
    console.log(email)
    // sendPasswordResetEmail(this._authFb, email)
  }
}
