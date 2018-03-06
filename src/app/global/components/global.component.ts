import { Component, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent {
  
  items: Observable<any[]>;
  

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    
    this.items = af.list<any>('MemoryShareGlobal').snapshotChanges();
    //, ref => ref.orderByChild()

  }
}

