import { Component, Inject, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'memory-card',
  templateUrl: './memory-card.component.html'
})
export class MemoryCardComponent {
  
  @Input() item: any;
  @Input() shouldDisplayFeatureIcon: boolean = false;
  key:string;
  value:object;
  isFeatured:boolean = false;

  constructor(public af: AngularFireDatabase) { 
  }

  ngOnInit() {
    
    this.key = this.item.key;
    this.value = this.item.payload.val();

    this.af.object('FeaturedShare/'+this.key).valueChanges().subscribe(data=>{
      this.isFeatured = data != null;
    });
  }

  censorMemory(){
    this.af.object('FeaturedShare/'+this.key).remove();
    this.af.object('MemoryShareGlobal/'+this.key).remove();
  }
}

