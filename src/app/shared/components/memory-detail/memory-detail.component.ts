import { Component, Inject, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { PlainGalleryStrategy, PlainGalleryConfig, GridLayout } from 'angular-modal-gallery';
import { PolyManagerService } from './../../services/poly-manager.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
              private route: ActivatedRoute,
             public polyManager: PolyManagerService,
             private spinnerService: Ng4LoadingSpinnerService) {
    
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
    this.spinnerService.show();
    var promises = [];
    const subObj = this.af.object('MemoryShareGlobal/'+this.uid).valueChanges().subscribe(memory => {
      subObj.unsubscribe();
      
      this.memory = memory;
      var jsonData = JSON.parse(memory['Json']);
      // console.log(jsonData.Objects);
        jsonData.Objects.forEach(element => {
          switch (element.ObjectType) {
            case 'Photo':
                this.images.unshift(this.getImageFromPhotoType(this.images.length+1,element.PhotoDefinition.Url));
              break;
            case 'PolyAsset':
                promises.push(this.polyManager.getImageFromPolyAsset(element.PolyAssetName));
              break;
            default:
              console.log(element.ObjectType+' not supported');
              break;
          }
        });
        
        if(promises.length > 0){
          Promise.all(promises).then(urls => {
            this.images = this.images.concat(this.getImagesFromPolyAsset(urls));
            this.spinnerService.hide();
          }).catch((err) => {
            console.log('Fail to get thumbnail urls for all poly assets: '+err);
            this.spinnerService.hide();
          });
        } else {
          this.spinnerService.hide();
        }
        
    });
  }

  private getImagesFromPolyAsset(imgs){
    var thumbnails = [];
    var count = this.images.length;
    imgs.forEach(element => {
      count++;
      thumbnails.unshift(this.getImageFromPhotoType(count,element));
    });
    return thumbnails;
  }

  getImageFromPhotoType(count,img){
    return {
      id:count,
      modal: {
        img: img
      },
      plain: {
        img: img
      }
    };
  }
}

