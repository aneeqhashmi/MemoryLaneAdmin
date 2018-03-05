import { Component, Inject, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { PlainGalleryStrategy, PlainGalleryConfig, GridLayout } from 'angular-modal-gallery';

@Component({
  selector: 'memory-detail',
  templateUrl: './memory-detail.component.html'
})
export class MemoryDetailComponent {
  
  images = [];
  memory = {};
  isFeatured:boolean = false;
  uid = '';
  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout(
      { width: '200px', height: 'auto' },
      { length: 5, wrap: true })
  };
  
  constructor(public af: AngularFireDatabase,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.uid = params.uid;
      
      this.getImages();
      
      this.featureCheck();

  });
  }

  addToFeature(){
    this.af.object('FeaturedShare/'+this.uid).set(this.memory);
  }

  removeFromFeature(){
    this.af.object('FeaturedShare/'+this.uid).remove();
  }

  featureCheck(){
    this.af.object('FeaturedShare/'+this.uid).valueChanges().subscribe(data=>{
      this.isFeatured = data != null;
    });
  }

  getImages(){
    var count = 0;
    this.af.object('MemoryShareGlobal/'+this.uid).valueChanges().subscribe(memory => {
      this.memory = memory;
      var jsonData = JSON.parse(memory['Json']);
      
        jsonData.Objects.forEach(element => {
          switch (element.ObjectType) {
            case 'Photo':
                count++;
                const newImage = {
                  id:count,
                  modal: {
                    img: element.PhotoDefinition.Url
                  },
                  plain: {
                    img: element.PhotoDefinition.Url
                  }
                };
                this.images.unshift(newImage);
              break;
          
            default:
              break;
          }
        });
      
    });
  }
}

