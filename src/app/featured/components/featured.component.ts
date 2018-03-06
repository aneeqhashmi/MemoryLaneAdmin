import { Component, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent {
  
  items: Observable<any[]>;
  

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    
    this.items = af.list<any>('FeaturedShare', ref => ref.orderByChild('Modified')).snapshotChanges();

  }
}
