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
import { UserProfile } from '../models/user-data';
import { from, Observable } from 'rxjs';
// import { resolve } from 'dns';
// import { resolve } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);
  currrentUserId$: any;
  userData$: any[] = [];

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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
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
        alert(err.message);
      }
    );
  }

  // Login with google

  async googleLogin() {
    try {
      return await this.fireauth.signInWithPopup(new GoogleAuthProvider());
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Login With Facebook
  async faceBookLogin() {
    try {
      return await this.fireauth.signInWithPopup(new FacebookAuthProvider());
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Login With Twitter
  async twitterLogin() {
    try {
      return await this.fireauth.signInWithPopup(new TwitterAuthProvider());
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async addUserDetails(userDetails: any) {
    try {
      let data = {
        email: userDetails.email,
        displayName: userDetails.displayName,
        photoURL: userDetails.photoURL,
        phoneNumber: userDetails.phoneNumber,
        uid: userDetails.uid,
        // address: userDetails.address,
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
      });
      // console.log('result', res);
    } catch (error) {}
  }

  async updateUserData(selectedUid: any, UpdateUserProfile: any) {
    try {
      let data = {
        email: UpdateUserProfile.email,
        phoneNumber: UpdateUserProfile.phoneNumber,
        displayName: UpdateUserProfile.displayName,
        addrass: UpdateUserProfile.addrass,
      };
      let user = await this.firestore
        .collection('UsersDetails')
        .doc(selectedUid);
      let res = await user.update({
        email: data.email,
        phoneNumber: data.phoneNumber,
        displayName: data.displayName,
        addrass: data.addrass,
      });
      console.log('update res', res);
    } catch (error) {}
  }

  getUserDetails() {
    this.userData$ = [];

    // return new Promise((resolve) => {
    //   this.firestore
    //     .collection('UsersDetails')
    //     .valueChanges()
    //     .subscribe((res: any) => {
    //       // var u_i_d = localStorage.getItem('uid');
    //       for (let i = 0; i < res.length; i++) {
    //         if (res[i].uid != this.currrentUserId$) {
    //           // resolve(this.userData$.push(res[i]));

    //           this.userData$.push(res[i]);
    //           // console.log('Resolve User Data', this.userData$);
    //           resolve(this.userData$);

    //           console.log('Resolve Data', this.userData$);
    //         }
    //       }
    //     });
    // });

    return new Promise((resolve) => {
      let userData$: any[] = [];

      let dataRef = this.firestore.collection('UsersDetails');
      dataRef.get().subscribe((res) => {
        res.forEach((doc) => {
          console.log('get res ', doc);
          let res: any = doc.data();
          if (res.uid !== this.currrentUserId$) {
            this.userData$.push(res);
          }

          // resolve(doc.data());
          console.log('User$Data', this.userData$);
        });
        // for (let i = 0; i < this.userData$.length; i++) {
        //   if (this.userData$[i].uid != this.currrentUserId$) {
        //     this.userData$1.push(this.userData$);
        //   }
        // }
        console.log('new User$ Data', this.userData$);
        resolve(this.userData$);
        // console.log('get res', res.docs);
      });
    });

    // this.firestore
    //   .collection('UsersDetails')
    //   .where('capital', '==', true)
    //   .get()
    //   .then((querySnapshot: any[]) => {
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, ' => ', doc.data());
    //     });
    //   })
    //   .catch((error: any) => {
    //     console.log('Error getting documents: ', error);
    //   });

    // return new Promise((resolve) => {
    //   this.firestore
    //     .collection('UsersDetails')
    //     .get()
    //     .subscribe((res) => {
    //       console.log('Get Res', res);
    //     });
    // });
  }
}
