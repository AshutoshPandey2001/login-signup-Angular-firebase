import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  TwitterAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  Auth,
  authState,
  User,
  IdTokenResult,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { from, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);
  currrentUserId$: any;

  // usersCollection!: AngularFirestoreCollection<UserProfile>;
  // users: Observable<UserProfile[]>;

  constructor(
    private fireauth: AngularFireAuth,
    private route: Router,
    private firestore: AngularFirestore,
    private auth: Auth
  ) {
    console.log(
      'CurrentUser$',
      this.currentUser$.subscribe((res) => {
        console.log('current User Res', res?.uid);
        this.currrentUserId$ = res?.uid;
      })
    );
    // this.users = this.firestore.collection('UsersDetails').valueChanges();
    // this.getUserDetails();
  }

  async login(email: string, password: string) {
    try {
      return await this.fireauth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');

      // console.error(error);
      // alert(error.message);
      return;
    }
  }

  // Signup Method

  async signup(email: string, password: string) {
    try {
      return await this.fireauth.createUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');

      console.log(error);
      return;
    }
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.clear();
      },
      (err) => {
        Swal.fire('Error!', err.message, 'error');

        alert(err.message);
      }
    );
  }

  // Login with google

  async googleLogin() {
    try {
      return await this.fireauth.signInWithPopup(new GoogleAuthProvider());
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');

      console.log(error);
      return;
    }
  }

  // Login With Facebook
  async faceBookLogin() {
    try {
      return await this.fireauth.signInWithPopup(new FacebookAuthProvider());
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');

      console.log(error);
      return;
    }
  }

  // Login With Twitter
  async twitterLogin() {
    try {
      return await this.fireauth.signInWithPopup(new TwitterAuthProvider());
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');

      console.log(error);
      return;
    }
  }

  // Add Users Details in Firestore Database
  async addUserDetails(userDetails: any) {
    try {
      let data = {
        email: userDetails.email,
        displayName: userDetails.displayName,
        photoURL: userDetails.photoURL,
        phoneNumber: userDetails.phoneNumber,
        uid: userDetails.uid,
        userType: userDetails.userType,
      };
      console.log('Some Data', userDetails);
      let user = await this.firestore
        .collection('UsersDetails')
        .doc(userDetails.uid);
      let res = await user.set({
        email: data.email ? data.email : '',
        displayName: data.displayName ? data.displayName : '',
        photoURL: data.photoURL ? data.photoURL : '',
        uid: data.uid ? data.uid : '',
        phoneNumber: data.phoneNumber ? data.phoneNumber : '',
        UserType: data.userType,
      });
      // console.log('result', res);
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');
    }
  }

  //Update UserDetails In Firestore

  async updateUserData(UpdateUserProfile: any) {
    try {
      let data = {
        email: UpdateUserProfile.email,
        phoneNumber: UpdateUserProfile.phoneNumber,
        displayName: UpdateUserProfile.displayName,
        addrass: UpdateUserProfile.addrass,
      };
      let user = await this.firestore
        .collection('UsersDetails')
        .doc(UpdateUserProfile.uid);
      let res: any = await user.update({
        email: data.email,
        phoneNumber: data.phoneNumber,
        displayName: data.displayName,
        addrass: data.addrass,
      });
      return res;
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');

      console.error('in update error', error);
    }
  }

  // Get User Details in firestore

  getUserDetails() {
    return new Promise((resolve) => {
      var userData$: any[] = [];

      let dataRef = this.firestore.collection('UsersDetails');
      dataRef.get().subscribe((res) => {
        res.forEach((doc) => {
          console.log('get res ', doc);
          let res: any = doc.data();
          if (res.uid !== this.currrentUserId$) {
            userData$.push(res);
          }

          console.log('User$Data', userData$);
        });

        console.log('new User$ Data', userData$);
        resolve(userData$);
        // console.log('get res', res.docs);
      });
    });
  }
}

// for (let i = 0; i < this.userData$.length; i++) {
//   if (this.userData$[i].uid != this.currrentUserId$) {
//     this.userData$1.push(this.userData$);
//   }
// }
