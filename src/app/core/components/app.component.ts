import { Component, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Memory Lane';
  items: AngularFireList<any[]>;
  msgVal: string = '';

  constructor(private afAuth: AngularFireAuth, private router:Router) {
    
  }

  logout(){
    
    this.afAuth.auth.signOut().then(onfulfiled => {
      console.log('signout');
      this.router.navigate(['/login']);
    });

  }
}
