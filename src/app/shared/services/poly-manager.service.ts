import { Component, Inject, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  // selector: 'poly-manager',
  // templateUrl: './memory-detail.component.html'
})
export class PolyManagerService {
  
  baseUrl:string = 'https://poly.googleapis.com/v1/';
  apiKey:string = 'AIzaSyB5BXx68aM79HJXh3D5R1hpsqxedUez65k'

  constructor(public http: HttpClient) {
    
  }

  getImageFromPolyAsset(assetName){
    
    return new Promise((resolve, reject) => {
      this.http.get(this.getPolyUrl(assetName))
      .subscribe(poly=>{
        if(poly != null){
          if(poly["thumbnail"] != null && poly["thumbnail"].url != null){
            resolve(poly["thumbnail"].url);
          } else {
            reject('Thumbnail info not found in poly data');
          }
        } else {
          reject('poly data not found');
        }
      });
    });

  }

  private getPolyUrl(assetName){
    return (`${this.baseUrl}${assetName}?key=${this.apiKey}`);
  }

}
