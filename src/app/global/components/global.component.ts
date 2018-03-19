import { Component, Inject, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { validateArgCount } from '@firebase/util/dist/esm/src/validation';
import { config } from '../../../../functions/node_modules/firebase-functions';
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
  @ViewChild('showAll') showAll; 
  @ViewChild('reviewed') reviewed;
  @ViewChild('unreviewed') unreviewed;  
  @ViewChild('searchText') searchText; 

  constructor(private afAuth: AngularFireAuth, 
              private af: AngularFireDatabase,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    
    this.route.params.subscribe((params: any) => {
      this.option = params.option == undefined || !parseInt(params.option) ? 0 : parseInt(params.option);
      console.log(params.option + ":" + this.option);
      switch (this.option) {
        case 1:
          this.reviewed.nativeElement.checked = true;
          break;
        case 2:
          this.unreviewed.nativeElement.checked = true;
          break;
        default:
          this.showAll.nativeElement.checked = true;
          break;
      }
      
      this.getItems(0,this.option);
    });
  }


  getItems(direction, option?){
    if(this.searchText != null)
      this.searchText.nativeElement.value = '';

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
        this.items = this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Reviewed').equalTo(isReviewed).limitToLast(pageSize)).snapshotChanges();
      else
        this.items = this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Reviewed').endAt(isReviewed,this.nextModified).limitToLast(pageSize)).snapshotChanges();
    } else { // prev
      if(this.prevModified == null)
        this.items = this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Reviewed').equalTo(isReviewed).limitToFirst(pageSize)).snapshotChanges();
      else
        this.items = this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Reviewed').startAt(isReviewed,this.prevModified).limitToFirst(pageSize)).snapshotChanges();
    }
    this.items.subscribe(data=> {
      if(data.length > 0){
        this.prevModified = data[data.length-1].key;

        if(data.length == pageSize){
          this.nextModified = data[0].key; 
        } else {
          this.nextModified = null;
        }
        
        this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Reviewed').equalTo(isReviewed).limitToLast(1)).snapshotChanges().subscribe(lastItem => {
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
        this.items = this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Modified').endAt(Date.now()).limitToLast(pageSize)).snapshotChanges();
      else
        this.items = this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Modified').endAt(this.nextModified).limitToLast(pageSize)).snapshotChanges();
    } else { // prev
        this.items = this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Modified').startAt(this.prevModified).limitToFirst(pageSize)).snapshotChanges();
    }
    this.items.subscribe(data=> {
      
      if(this.nextModified != null)
        this.prevModified = data[data.length-1].payload.val().Modified;

      if(data.length == pageSize){
        this.nextModified = data[0].payload.val().Modified; 
      } else {
        this.nextModified = null;
      }
      
      this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Modified').limitToLast(1)).snapshotChanges().subscribe(lastItem => {
        console.log(lastItem);
        if(lastItem != null && lastItem[0].key == data[data.length-1].key){
          this.prevModified = null;
        }
      });

    });
  }

  search(value){
    if(this.showAll != null)
      this.showAll.nativeElement.checked = true;
    if(value == undefined || value == ''){
      this.getItems(0,0);
    } else {
      this.items = this.af.list<any>('MemoryShareGlobal-v1', ref => ref.orderByChild('Name').equalTo(value).limitToLast(pageSize)).snapshotChanges();
      this.items.subscribe(data=> {
        
        this.prevModified = null;
        this.nextModified = null;
  
      });
    }
  }
  
}

