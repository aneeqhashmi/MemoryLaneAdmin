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
  nextModified = null;
  prevModified = null;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    
    this.getAllItems(0);

  }

  getFilteredItems(direction, isReviewed){
    
    if(direction == 0){ // next
      if(this.nextModified == null)
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').endAt(isReviewed).limitToLast(3)).snapshotChanges();
      else
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').endAt(isReviewed,this.nextModified).limitToLast(3)).snapshotChanges();
    } else { // prev
      if(this.prevModified == null)
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').startAt(isReviewed).limitToFirst(3)).snapshotChanges();
      else
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').startAt(isReviewed,this.prevModified).limitToFirst(3)).snapshotChanges();
    }
    this.items.subscribe(data=> {
      
      if(this.nextModified != null)
        this.prevModified = data[data.length-1].key;

      if(data.length == 3){
        this.nextModified = data[0].key; 
      } else {
        this.nextModified = null;
      }
      
      this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').equalTo(false).limitToLast(1)).snapshotChanges().subscribe(lastItem => {
        console.log(lastItem);
        if(lastItem != null && lastItem[0].key == this.prevModified){
          this.prevModified = null;
        }
      });

    });
  }

  getAllItems(direction){
    
    if(direction == 0){ // next
      if(this.nextModified == null)
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Modified').endAt(Date.now()).limitToLast(3)).snapshotChanges();
      else
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Modified').endAt(this.nextModified).limitToLast(3)).snapshotChanges();
    } else { // prev
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Modified').startAt(this.prevModified).limitToFirst(3)).snapshotChanges();
    }
    this.items.subscribe(data=> {
      
      if(this.nextModified != null)
        this.prevModified = data[data.length-1].payload.val().Modified;

      if(data.length == 3){
        this.nextModified = data[0].payload.val().Modified; 
      } else {
        this.nextModified = null;
      }
      
      this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Modified').limitToLast(1)).snapshotChanges().subscribe(lastItem => {
        console.log(lastItem);
        if(lastItem != null && lastItem[0].key == data[data.length-1].key){
          this.prevModified = null;
        }
      });

    });
  }

  filter(option){
    this.nextModified = null;
    this.prevModified = null;
    if(option == 0){
      this.getAllItems(0);
    } else {
      this.getFilteredItems(0, option);
    }
  }
}

