import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'email-password-login',
  templateUrl: './emailPasswordLogin.template.html'
})
export class EmailPasswordLoginComponent implements OnInit {
  
  @Output() success = new EventEmitter(false);
  @Output() error = new EventEmitter(false);

  private loginForm : FormGroup;
  private savedCredential : any;

  constructor(
    private builder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private af: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private route: Router) {
  }

  ngOnInit() {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(credentials) {
    this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(onfulfiled => {
      this.route.navigate(['']);

    }).catch(error => {
      console.log(error);
    });
  }
}