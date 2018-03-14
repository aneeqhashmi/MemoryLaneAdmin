import { Component, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
const pageSize = 10;
@Component({
  selector: 'global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})

export class GlobalComponent {
  
  items: Observable<any[]>;
  nextModified = null;
  prevModified = null;
  option = 0; // default value is to show all memories

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    
    this.getItems(0,0);

  }


  getItems(direction, option?){
    if(option != undefined){
      this.option = option;
      this.nextModified = this.prevModified = null;
    }
    const isReviewed = this.option == 1;
    if(this.option == 0) // All memories
      this.getAllItems(direction);
    else
      this.getFilteredItems(direction, isReviewed);
  }

  getFilteredItems(direction, isReviewed){
    
    if(direction == 0){ // next
      if(this.nextModified == null)
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').equalTo(isReviewed).limitToLast(pageSize)).snapshotChanges();
      else
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').endAt(isReviewed,this.nextModified).limitToLast(pageSize)).snapshotChanges();
    } else { // prev
      if(this.prevModified == null)
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').equalTo(isReviewed).limitToFirst(pageSize)).snapshotChanges();
      else
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').startAt(isReviewed,this.prevModified).limitToFirst(pageSize)).snapshotChanges();
    }
    this.items.subscribe(data=> {
      if(data.length > 0){
        this.prevModified = data[data.length-1].key;

        if(data.length == pageSize){
          this.nextModified = data[0].key; 
        } else {
          this.nextModified = null;
        }
        
        this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').equalTo(isReviewed).limitToLast(1)).snapshotChanges().subscribe(lastItem => {
          if(lastItem != null && lastItem[0].key == this.prevModified){
            this.prevModified = null;
          }
        });
      }
    });
  }

  getAllItems(direction){
    
    if(direction == 0){ // next
      if(this.nextModified == null)
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Modified').endAt(Date.now()).limitToLast(pageSize)).snapshotChanges();
      else
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Modified').endAt(this.nextModified).limitToLast(pageSize)).snapshotChanges();
    } else { // prev
        this.items = this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Modified').startAt(this.prevModified).limitToFirst(pageSize)).snapshotChanges();
    }
    this.items.subscribe(data=> {
      
      if(this.nextModified != null)
        this.prevModified = data[data.length-1].payload.val().Modified;

      if(data.length == pageSize){
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

  
}

