

import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_models/photo';


import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input()photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  private baseUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private _us: UserService,
    private _as: AlertifyService
    ) { }

  ngOnInit() {
    this.iniciarUploader();
  }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  iniciarUploader () {
    this.uploader = new FileUploader(
      {
        allowedFileType : ['image'],
        isHTML5 : true,
        maxFileSize: 10 * 1024 * 1024,
        removeAfterUpload : true,
        autoUpload: false,
        url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
        authToken : 'Bearer ' + localStorage.getItem('token')
      }
    );
    this.uploader.onAfterAddingFile = (file) => file.withCredentials = false;

    this.uploader.onSuccessItem = (item, response, status) => {
      const resp: Photo = JSON.parse(response);
      if (resp) {
        const photo = {
          id : resp.id,
          url: resp.url,
          isMain: resp.isMain,
          dateAdded: resp.dateAdded,
          description: resp.description
        };

        this.photos.push(photo);
      }
    };

  }

  updateMainPhotoUser(photo: Photo) {

    this._us.setMainPhotoUser(this.authService.decodedToken.nameid, photo.id).subscribe(
      res => {
        console.log('Photo set');

      },
      err => {
        this._as.error(err);
      }
    );
  }
}
