import { Component, Inject, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { AdvancedLayout, Image, PlainGalleryStrategy, PlainGalleryConfig, GridLayout, Description, DescriptionStrategy } from 'angular-modal-gallery';
import { PolyManagerService } from './../../services/poly-manager.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'memory-detail',
  templateUrl: './memory-detail.component.html',
  styleUrls: ['./memory-detail.component.scss']
})
export class MemoryDetailComponent {
  
  images = [];
  memory = {};
  prettyJson = '';
  isFeatured:boolean = false;
  uid = '';
  nextUnreviewedId = null;
  prevUnreviewedId = null;
  option:any;
  
  constructor(private af: AngularFireDatabase,
              private route: ActivatedRoute,
              private polyManager: PolyManagerService,
              private spinnerService: Ng4LoadingSpinnerService) {
    
  }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.uid = params.uid;
      this.option = params.option;
      console.log(this.option);
      this.getImages();
      
      this.featureCheck();

      this.getUnreviewedIds();

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

  review(){
    this.markReview(true);
  }

  unreview(){
    this.markReview(false);
  }

  markReview(isReviewed){
    this.af.object('MemoryShareGlobal/'+this.uid+'/Reviewed').set(isReviewed);
    this.af.object('FeaturedShare/'+this.uid).valueChanges().subscribe(data => {
      if(data != null){
        this.af.object('FeaturedShare/'+this.uid+'/Reviewed').set(isReviewed);
      }
    });
    const subObj = this.af.object('MemoryShareGlobal/'+this.uid).valueChanges().subscribe(memory => {
      subObj.unsubscribe();
      this.memory = memory;
    });
  }

  getUnreviewedIds(){
    this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').endAt(false,this.uid).limitToLast(2)).snapshotChanges().subscribe(data=>{
      //console.log(data);
      if(data.length > 1){
        if(data[0].payload.val().Reviewed == false)
          this.nextUnreviewedId = data[0].key;
        else
          this.nextUnreviewedId = null;  
      } else {
        this.nextUnreviewedId = null;
      } 
    });
    
    this.af.list<any>('MemoryShareGlobal', ref => ref.orderByChild('Reviewed').startAt(false,this.uid).limitToFirst(2)).snapshotChanges().subscribe(data=>{
      console.log(data);
      if(data.length > 1){
        if(data[1].payload.val().Reviewed == false)
          this.prevUnreviewedId = data[1].key;
        else
          this.prevUnreviewedId = null;  
      } else {
        this.prevUnreviewedId = null;
      }
    });
  }

  getImages(){
    this.spinnerService.show();
    var promises = [];
    const subObj = this.af.object('MemoryShareGlobal/'+this.uid).valueChanges().subscribe(memory => {
      subObj.unsubscribe();
      
      this.memory = memory;
      var jsonData = JSON.parse(memory['Json']);
      this.prettyJson = JSON.stringify(jsonData,null, '\t');
      // console.log(jsonData.Objects);
        jsonData.Objects.forEach(element => {
          switch (element.ObjectType) {
            case 'Photo':
                this.images.unshift(this.getImageFromPhotoType(this.images.length+1,element.PhotoDefinition.Url, element.ObjectType));
              break;
            case 'PolyAsset':
                promises.push(this.polyManager.getImageFromPolyAsset(element.PolyAssetName));
              break;
            case 'Video':
                this.images.unshift(this.getImageFromPhotoType(this.images.length+1,'https://blog.majestic.com/wp-content/uploads/2010/10/Video-Icon-crop.png',element.ObjectType));
              break;
            default:
              console.log(element.ObjectType+' not supported');
              break;
          }
        });
        
        if(promises.length > 0){
          Promise.all(promises).then(urls => {
            this.images = this.images.concat(this.getImagesFromPolyAsset(urls, 'PolyAsset'));
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

  private getImagesFromPolyAsset(imgs, type){
    var thumbnails = [];
    var count = this.images.length;
    imgs.forEach(element => {
      count++;
      thumbnails.unshift(this.getImageFromPhotoType(count, element, type));
    });
    return thumbnails;
  }

  getImageFromPhotoType(count, img, type){
    return {
      id:count,
      modal: {
        img: img,
        description: type
      },
      plain: {
        img: img
      }
    };
  }

  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };
  
  openImageModalRowDescription(image: Image) {
    console.log('Opening modal gallery from custom plain gallery row and description, with image: ', image);
    const index: number = this.getCurrentIndexCustomLayout(image, this.images);
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(index, true) });
  }

  private getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  };
}

