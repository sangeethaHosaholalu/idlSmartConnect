import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as idlSCValidationMessage from '../../idlSCHelpers/idlSCValidationMessage';
import * as consts from '../../idlSCHelpers/idlSCConstants';
import { IDLAlert } from '../../idlSCUtils/idlAlert';
import { MediaDataMgr } from '../../idlSCDataMgrs/mediaDataMgr';
import { Media } from '../../idlSCModels/Media';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the AddmediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addmedia',
  templateUrl: 'addmedia.html',
})
export class AddmediaPage {


  mediaForm: FormGroup;
  validation_messages;
  file;
  base64Image;
  title;
  fileName;
  fileType;
  fileSize;
  lastModifiedDate;
  mediaId;

  constructor(public navCtrl: NavController,private idlAlert: IDLAlert,  public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public loadingctrl: LoadingController, private mediaDataMgr: MediaDataMgr) {

    this.validation_messages = idlSCValidationMessage.validationMessages
    this.mediaForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmediaPage');
  }

  add() {
    if (!this.mediaForm.valid) {
      this.idlAlert.defaultAlert(consts.alertTitles.Register, consts.alertMessages.detailEntry, consts.alertButtons.ok);
    } else {
      let imageFileUri = this.base64Image;
      this.readFile(imageFileUri);
    }
  }

  /**
   * this is method is used to select file in the browser
   * @param $event
   */
  changeListener($event): void {
    this.file = $event.target.files[0];
    this.fileName = this.file.name;
    this.fileSize = this.file.size;
    this.fileType = this.file.type;
    this.lastModifiedDate = this.file.lastModifiedDate;
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.base64Image = myReader.result;
    }
    myReader.readAsDataURL(this.file);
  }

  /**
   * 
   * @param file 
   */
  readFile(file: any) {
    var mediaObj = {};

    mediaObj['mediaSize'] = this.fileSize;
    mediaObj['mediaType'] = this.fileType;
    mediaObj['lastModifiedDate'] = this.lastModifiedDate;
    var currentDate = new Date().toLocaleTimeString();
    let mediaData = new FormData();
    mediaData.append('mediaName', this.fileName);
    mediaData.append('uploadTime', currentDate);
    mediaData.append('mediaDetails', JSON.stringify(mediaObj));

    if (file) {
      this.dataURItoBlob(this.base64Image).then((data: Blob) => {
        mediaData.append('files', data, file.type);
        this.addMedia(mediaData);
      })
    } else {
      this.addMedia(mediaData);
    }
  }

  /**
   * this method is used for convert data uri to blob
   * @param dataURI is the image uri
   */
  dataURItoBlob(dataURI) {
    console.log('Inside the data uri to blob' + dataURI)
    return new Promise((resolve, reject) => {
      // convert base64 to raw binary data held in a string
      var byteString = atob(dataURI.split(',')[1]);
      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      // write the ArrayBuffer to a blob, and you're done
      var bb = new Blob([ab], { type: mimeString });
      resolve(bb)
    })
  }

  /**
   * 
   * @param orgData 
   */
  addMedia(videoData) {

    let loading = this.loadingctrl.create({
      content: consts.loadingMessages.pleaseWait
    });
    loading.present();
    
    this.mediaDataMgr.addMedia(videoData).then((res: Media) => {
      this.mediaId = res.id;
      window.localStorage.setItem(consts.globalVariables.mediaId, res.id);
      loading.dismiss();
      this.navCtrl.push(DashboardPage).then(() => { this.viewCtrl.dismiss(AddmediaPage); });
    }).catch((err) => {
      loading.dismiss();
    })
  }

  Cancel(){
    this.navCtrl.pop();
  }

}