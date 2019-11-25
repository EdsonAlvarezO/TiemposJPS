import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public mostrarCarrusel:boolean;
   sorteos: Observable<any[]>;

  constructor(public afAuth: AngularFireAuth,db: AngularFirestore) {
    this.sorteos = db.collection('Sorteos').valueChanges();
    this.mostrarCarrusel = true;

   }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());

  }
  logout() {
    this.afAuth.auth.signOut();
  }
  des(){
    this.mostrarCarrusel = false;
  }
}
