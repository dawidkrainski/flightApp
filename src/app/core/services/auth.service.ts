import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: UserInfo | null = null;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
  }

  login(credentials: {email: string, password: string}) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password).
    then(userCredential => this.userData = userCredential.user);
  }

  logout(){
    this.fireAuth.signOut().then(() => this.router.navigate(['/login']));
  }

  get user() {
    return this.userData;
  }

  isLoggedIn() {
    return !!this.userData;
  }

  register(credentials: {email: string, password: string}) {
    return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
  }

}
