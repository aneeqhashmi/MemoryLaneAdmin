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
  nextModified = null;
  prevModified = null;
  

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    
    this.getItems(0,Date.now());

  }

  getItems(option,time){
    
    if(option == 0) // next
      this.items = this.af.list<any>('FeaturedShare-v1', ref => ref.orderByChild('Modified').endAt(time).limitToLast(10)).snapshotChanges();
    else  // prev
      this.items = this.af.list<any>('FeaturedShare-v1', ref => ref.orderByChild('Modified').startAt(time).limitToFirst(10)).snapshotChanges();
    this.items.subscribe(data=> {
      
      if(!(data.length < 10 && this.nextModified == null && this.prevModified == null)){
        if(data.length == 1){
          this.getItems(option-1, time);  
        } else {
          
          if(data.length == 10){
            this.nextModified = data[0].payload.val().Modified; // Mdified of Last item of the list
          } else {
            this.nextModified = null;
          }
          this.prevModified = data[data.length-1].payload.val().Modified; // Mdified of first item of the list
  
        }
      }
      
    });
  }
}
