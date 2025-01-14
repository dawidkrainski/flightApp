import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;
import {Router} from "@angular/router";

export interface Credentials {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: UserInfo | null = null;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
  }

  login(credentials: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password).
    then(userCredential => this.userData = userCredential.user);
  }

  logout(){
    this.fireAuth.signOut().then(() => this.router.navigate(['/login']));
  }

  get user() {
    return this.userData;
  }

  isLoggedIn(): boolean {
    return this.userData !== null;
  }

  register(credentials: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
  }

}
