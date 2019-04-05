webpackJsonp([7],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Media; });
var Media = /** @class */ (function () {
    function Media() {
    }
    Object.defineProperty(Media.prototype, "id", {
        //Getter and setter for data variables
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "mediaName", {
        get: function () {
            return this._mediaName;
        },
        set: function (mediaName) {
            this._mediaName = mediaName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "mediaUrl", {
        get: function () {
            return this._mediaUrl;
        },
        set: function (mediaUrl) {
            this._mediaUrl = mediaUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "mediaDetails", {
        get: function () {
            return this._mediaDetails;
        },
        set: function (mediaDetails) {
            this._mediaDetails = mediaDetails;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "uploadTime", {
        get: function () {
            return this._uploadTime;
        },
        set: function (uploadTime) {
            this._uploadTime = uploadTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Media.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        set: function (userId) {
            this._userId = userId;
        },
        enumerable: true,
        configurable: true
    });
    return Media;
}());

//# sourceMappingURL=Media.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IDLBaseDbMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__ = __webpack_require__(154);
/* @author : IDL Systems India Pvt Ltd, @ copyright 2018
 * @version :
 * @Created by : Shruthi K
 * @creationDate : 01-Apr-2019
 * @changeHistory :
 * @desc : Class to handle user sqlite database operations
 * date                Modified By                      Description
 *
*/

var alasql = __webpack_require__(710);
var IDLBaseDbMgr = /** @class */ (function () {
    function IDLBaseDbMgr() {
        this.init();
    }
    /**
     * Intializae the database connection
     */
    IDLBaseDbMgr.prototype.init = function () {
        if (window.openDatabase === undefined) {
            alasql.promise([
                'CREATE localStorage DATABASE IF NOT EXISTS User_Auth',
                'ATTACH localStorage DATABASE User_Auth',
                'USE User_Auth'
            ]).then(function (res) {
                console.log('Result from last query:', res);
            }).catch(function (reason) {
                console.trace(reason);
            });
            if (__WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["c" /* idlSCTables */]) {
                for (var key in __WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["c" /* idlSCTables */]) {
                    alasql(__WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["c" /* idlSCTables */][key]);
                }
            }
        }
        else {
            this.db = (window.cordova.platformId === 'browser') ?
                window.openDatabase(__WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["a" /* dbConfigs */].databaseName, __WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["a" /* dbConfigs */].databaseVersion, __WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["a" /* dbConfigs */].data, 2 * 1024 * 1024) :
                window.sqlitePlugin.openDatabase({ name: __WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["a" /* dbConfigs */].databaseName + '.db', location: __WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["a" /* dbConfigs */].location });
            if (__WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["c" /* idlSCTables */]) {
                var _loop_1 = function (key) {
                    this_1.db.transaction(function (tx) {
                        tx.executeSql(__WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["c" /* idlSCTables */][key]);
                    }, function (error) {
                        console.log("Failed to create table " + JSON.stringify(error));
                    }, function () {
                        console.log("Successfully table created " + __WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["c" /* idlSCTables */][key]);
                    });
                };
                var this_1 = this;
                for (var key in __WEBPACK_IMPORTED_MODULE_0__idlSCHelpers_idlSCDbConfig__["c" /* idlSCTables */]) {
                    _loop_1(key);
                }
            }
        }
    };
    /**
     * execute the query for database
     * @param query database query to execute
     * @param data parameters to store data
     */
    IDLBaseDbMgr.prototype.executeSqlCallback = function (query, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (window.openDatabase !== undefined) {
                _this.db.transaction(function (tx) {
                    tx.executeSql(query, data, function (tx, res) {
                        resolve(res);
                    }, function (tx, error) {
                        reject(error.message);
                    });
                }, function (error) {
                    reject(error);
                }, function () {
                });
            }
            else {
                var result = alasql(query, data);
                resolve(result);
            }
        });
    };
    /**
     * close the database
     */
    IDLBaseDbMgr.prototype.closeDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.close(function () {
                var response = { 'message': 'Successfully Database Closed' };
                resolve(response);
            }, function (error) {
                reject(error);
            });
        });
    };
    return IDLBaseDbMgr;
}());

//# sourceMappingURL=idlSCBaseDbMgr.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dbConfigs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return idlSCTables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return idlSCUserQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return idlSCMediaQuery; });
/* unused harmony export idlSCDeviceQuery */
/* unused harmony export idlSCDeviceMediaQuery */
/**
 * Configurations for databases
 */
var dbConfigs = {
    databaseName: 'IDLSMARTCONNECT',
    location: 'default',
    data: 'Data',
    databaseVersion: '1.0'
};
/**
 * configuration of database tables
 */
var idlSCTables = {
    idlSCUser: 'CREATE TABLE IF NOT EXISTS IDLSC_User (ISCU_id varchar(255) NOT NULL PRIMARY KEY, ISCU_userName varchar(255), ISCU_email varchar(255), ISCU_password varchar(255))',
    idlSCMedia: 'CREATE TABLE IF NOT EXISTS IDLSC_Media (ISCM_id varchar(255) NOT NULL PRIMARY KEY, ISCM_mediaName varchar(255), ISCM_mediaUrl varchar(255), ISCM_uploadTime varchar(255), ISCM_userId varchar(255))',
    idlSCDevice: 'CREATE TABLE IF NOT EXISTS IDLSC_Device (ISCD_id varchar(255) NOT NULL PRIMARY KEY, ISCD_deviceId varchar(255), ISCD_userId varchar(255), ISCD_status(255))',
    idlSCDeviceMedia: 'CREATE TABLE IF NOT EXISTS IDLSC_DeviceMedia (ISCDM_id varchar(255) NOT NULL PRIMARY KEY, ISCDM_mediaId varchar(255), ISCDM_userId varchar(255), ISCDM_type varchar(255), ISCDM_date varchar(255))'
};
/**
 * Queries for IDL Smart Connect User
 */
var idlSCUserQuery = {
    insertUser: 'INSERT INTO IDLSC_User (ISCU_id, ISCU_userName, ISCU_email, ISCU_password) VALUES (?,?,?,?)',
    deleteUsers: 'DELETE FROM IDLSC_User',
    deleteUserByEmail: 'DELETE FROM IDLSC_User WHERE ISCU_email = ?',
    getUserById: 'SELECT * FROM IDLSC_User WHERE IDLSC_User = ?'
};
/**
 * Queries for IDL Smart Connect Media
 */
var idlSCMediaQuery = {
    insertMedia: 'INSERT INTO IDLSC_Media (ISCM_id, ISCM_mediaName, ISCM_mediaUrl, ISCM_uploadTime, ISCM_userId) VALUES (?,?,?,?,?)',
    deleteMedia: 'DELETE FROM IDLSC_Media WHERE ISCM_id = ?',
    getMediaById: 'SELECT * FROM IDLSC_Media WHERE ISCM_id = ?'
};
/**
 * Queries for IDL Smart Connect Device
 */
var idlSCDeviceQuery = {};
/**
 * Queries for IDL Smart Connect Device_Media
 */
var idlSCDeviceMediaQuery = {};
//# sourceMappingURL=idlSCDbConfig.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IDLUserDBMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__idlSCDbMgrs_idlSCBaseDbMgr__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCDbConfig__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCModels_User__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/* @author : IDL Systems India Pvt Ltd, @ copyright 2018
 * @version :
 * @Created by : Shruthi K
 * @creationDate : 01-Apr-2019
 * @changeHistory :
 * @desc : Class to handle user sqlite database operations
 * date                Modified By                      Description
 *
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IDLUserDBMgr = /** @class */ (function () {
    function IDLUserDBMgr(idlBaseDbMgr) {
        this.idlBaseDbMgr = idlBaseDbMgr;
        this.baseDbMgr = new __WEBPACK_IMPORTED_MODULE_0__idlSCDbMgrs_idlSCBaseDbMgr__["a" /* IDLBaseDbMgr */]();
    }
    /**
     * add user to database
     * @param user user model object to store database
     */
    IDLUserDBMgr.prototype.addUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.deleteUserByEmail(user.email).then(function (status) {
                _this.baseDbMgr.executeSqlCallback(__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCDbConfig__["d" /* idlSCUserQuery */].insertUser, [user.id, user.userName, user.email, user.password]).then(function (res) {
                    resolve(true);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Delete all users from database
     */
    IDLUserDBMgr.prototype.deleteUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.baseDbMgr.executeSqlCallback(__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCDbConfig__["d" /* idlSCUserQuery */].deleteUsers, []).then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Delete user by email from database
     */
    IDLUserDBMgr.prototype.deleteUserByEmail = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.baseDbMgr.executeSqlCallback(__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCDbConfig__["d" /* idlSCUserQuery */].deleteUserByEmail, [email]).then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * get user by id
     * @param id unique id to get user from database
     */
    IDLUserDBMgr.prototype.getUserById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.baseDbMgr.executeSqlCallback(__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCDbConfig__["d" /* idlSCUserQuery */].getUserById, [id]).then(function (res) {
                if ((res.rows !== undefined) && (res.rows !== null)) {
                    _this.getUserObject(res.rows.item(0)).then(function (user) {
                        alert(JSON.stringify(user));
                        resolve(user);
                    });
                }
                else if ((res !== undefined) && (res[0] !== undefined)) {
                    _this.getUserObject(res[0]).then(function (user) {
                        alert(JSON.stringify(user));
                        resolve(user);
                    });
                }
                else {
                    var error = {};
                    error[__WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["h" /* response */].message] = __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["d" /* errorMessages */].unableToGetUserData;
                    alert(error);
                    reject(error);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Get idl user object from the database response
     * @param obj database result object
     */
    IDLUserDBMgr.prototype.getUserObject = function (obj) {
        return new Promise(function (resolve, reject) {
            var user = new __WEBPACK_IMPORTED_MODULE_3__idlSCModels_User__["a" /* User */]();
            user.id = obj.ISCU_id;
            user.userName = obj.ISCU_name;
            user.email = obj.ISCU_email;
            user.password = obj.ISCU_password;
            alert(JSON.stringify(user));
            resolve(user);
        });
    };
    IDLUserDBMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__idlSCDbMgrs_idlSCBaseDbMgr__["a" /* IDLBaseDbMgr */]])
    ], IDLUserDBMgr);
    return IDLUserDBMgr;
}());

//# sourceMappingURL=idlSCUserDbMgr.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddmediaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCValidationMessage__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__idlSCUtils_idlAlert__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__idlSCDataMgrs_mediaDataMgr__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dashboard_dashboard__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the AddmediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddmediaPage = /** @class */ (function () {
    function AddmediaPage(navCtrl, idlAlert, viewCtrl, formBuilder, navParams, loadingctrl, mediaDataMgr) {
        this.navCtrl = navCtrl;
        this.idlAlert = idlAlert;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.loadingctrl = loadingctrl;
        this.mediaDataMgr = mediaDataMgr;
        this.validation_messages = __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCValidationMessage__["a" /* validationMessages */];
        this.mediaForm = formBuilder.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    AddmediaPage_1 = AddmediaPage;
    AddmediaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddmediaPage');
    };
    AddmediaPage.prototype.add = function () {
        if (!this.mediaForm.valid) {
            this.idlAlert.defaultAlert(__WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["c" /* alertTitles */].Register, __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["b" /* alertMessages */].detailEntry, __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["a" /* alertButtons */].ok);
        }
        else {
            var imageFileUri = this.base64Image;
            this.readFile(imageFileUri);
        }
    };
    /**
     * this is method is used to select file in the browser
     * @param $event
     */
    AddmediaPage.prototype.changeListener = function ($event) {
        var _this = this;
        this.file = $event.target.files[0];
        this.fileName = this.file.name;
        this.fileSize = this.file.size;
        this.fileType = this.file.type;
        this.lastModifiedDate = this.file.lastModifiedDate;
        var myReader = new FileReader();
        myReader.onloadend = function (e) {
            _this.base64Image = myReader.result;
        };
        myReader.readAsDataURL(this.file);
    };
    /**
     *
     * @param file
     */
    AddmediaPage.prototype.readFile = function (file) {
        var _this = this;
        var mediaObj = {};
        mediaObj['mediaSize'] = this.fileSize;
        mediaObj['mediaType'] = this.fileType;
        mediaObj['lastModifiedDate'] = this.lastModifiedDate;
        var currentDate = new Date().toLocaleTimeString();
        var mediaData = new FormData();
        mediaData.append('mediaName', this.fileName);
        mediaData.append('uploadTime', currentDate);
        mediaData.append('mediaDetails', JSON.stringify(mediaObj));
        if (file) {
            this.dataURItoBlob(this.base64Image).then(function (data) {
                mediaData.append('files', data, file.type);
                _this.addMedia(mediaData);
            });
        }
        else {
            this.addMedia(mediaData);
        }
    };
    /**
     * this method is used for convert data uri to blob
     * @param dataURI is the image uri
     */
    AddmediaPage.prototype.dataURItoBlob = function (dataURI) {
        console.log('Inside the data uri to blob' + dataURI);
        return new Promise(function (resolve, reject) {
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
            resolve(bb);
        });
    };
    /**
     *
     * @param orgData
     */
    AddmediaPage.prototype.addMedia = function (videoData) {
        var _this = this;
        var loading = this.loadingctrl.create({
            content: __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["f" /* loadingMessages */].pleaseWait
        });
        loading.present();
        this.mediaDataMgr.addMedia(videoData).then(function (res) {
            _this.mediaId = res.id;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].mediaId, res.id);
            loading.dismiss();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__dashboard_dashboard__["a" /* DashboardPage */]).then(function () { _this.viewCtrl.dismiss(AddmediaPage_1); });
        }).catch(function (err) {
            loading.dismiss();
        });
    };
    AddmediaPage.prototype.Cancel = function () {
        this.navCtrl.pop();
    };
    AddmediaPage = AddmediaPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addmedia',template:/*ion-inline-start:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\addmedia\addmedia.html"*/'<!--\n  Generated template for the AddmediaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <h1 margin>Add Media</h1>\n  <form [formGroup]="mediaForm">\n    <ion-item>\n      <ion-label>Title</ion-label>\n      <ion-input formControlName="title" type="text" class="form-control" clearInput>{{title}}</ion-input>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.title">\n        <div class="error-message" *ngIf="mediaForm.get(\'title\').hasError(validation.type) && (mediaForm.get(\'title\').dirty || mediaForm.get(\'title\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n  </form>\n\n  <ion-item>\n    <ion-label>Choose media file</ion-label>\n    <ion-input type="file" accept="image/*" (change)="changeListener($event)"></ion-input>\n  </ion-item>\n\n  <ion-row margin>\n    <button margin ion-button round (click) = "add()">Add</button>\n    <button margin ion-button round color="light" (click) = "Cancel()">Cancel</button>\n  </ion-row>\n\n</ion-content> \n'/*ion-inline-end:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\addmedia\addmedia.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__idlSCUtils_idlAlert__["a" /* IDLAlert */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__idlSCDataMgrs_mediaDataMgr__["a" /* MediaDataMgr */]])
    ], AddmediaPage);
    return AddmediaPage;
    var AddmediaPage_1;
}());

//# sourceMappingURL=addmedia.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevicedetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCUtils_idlAlert__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCDataMgrs_mediaDataMgr__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__idlSCDataMgrs_deviceMediaDataMgr__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the DevicedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DevicedetailsPage = /** @class */ (function () {
    function DevicedetailsPage(navCtrl, viewCtrl, navParams, idlAlert, loadingctrl, mediaDataMgr, deviceMediaDataMgr) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.idlAlert = idlAlert;
        this.loadingctrl = loadingctrl;
        this.mediaDataMgr = mediaDataMgr;
        this.deviceMediaDataMgr = deviceMediaDataMgr;
        this.mediaId = [];
        this.dataMode1 = [];
        this.dataMode2 = [];
    }
    DevicedetailsPage.prototype.ngOnInit = function () {
        console.log('ionViewDidLoad DevicedetailsPage');
        this.getMedia();
        this.id = this.navParams.get("deviceId");
    };
    DevicedetailsPage.prototype.getMedia = function () {
        var _this = this;
        var loading = this.loadingctrl.create({
            content: __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["f" /* loadingMessages */].media
        });
        loading.present();
        this.mediaDataMgr.getMedia().then(function (media) {
            loading.dismiss();
            _this.mediaList = media;
            _this.mediaData = _this.mediaList.content;
            console.log("Devce details media" + JSON.stringify(_this.mediaData));
        }).catch(function (err) {
            loading.dismiss();
            _this.idlAlert.defaultAlert(__WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["c" /* alertTitles */].deviceDetails, err.message, __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["a" /* alertButtons */].ok);
        });
    };
    DevicedetailsPage.prototype.addVideoMode1 = function (videos) {
        this.dataMode1.push(videos);
        console.log("Mode1" + JSON.stringify(this.dataMode1));
    };
    DevicedetailsPage.prototype.addVideoMode2 = function (videos) {
        this.dataMode2.push(videos);
        console.log("Mode2" + JSON.stringify(this.dataMode2));
    };
    DevicedetailsPage.prototype.removeVideo = function (videos) {
    };
    DevicedetailsPage.prototype.radioCheckedMode1 = function () {
        this.mode1 = true;
        this.mode2 = false;
    };
    DevicedetailsPage.prototype.radioCheckedMode2 = function () {
        this.mode2 = true;
        this.mode1 = false;
    };
    DevicedetailsPage.prototype.saveDeviceMedia = function () {
        var _this = this;
        var userId = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].userId);
        var uploadedDate = new Date(new Date() + 'UTC');
        var deviceMediaObj = {};
        if (this.mode1 == true && this.mode2 == false) {
            var dateObj = new Date(new Date(this.myStartDateMode1 + ' ' + this.myStartTimeMode1) + 'UTC');
            deviceMediaObj['deviceId'] = this.id;
            deviceMediaObj['userId'] = userId;
            deviceMediaObj['uploadedDate'] = uploadedDate;
            deviceMediaObj['type'] = 'time';
            deviceMediaObj['startDate'] = dateObj;
            this.getMediaIdList(this.dataMode1).then(function (res) {
                deviceMediaObj['media'] = res;
            }).catch(function (err) {
                console.log(err);
            });
        }
        else if (this.mode2 == true && this.mode1 == false) {
            var startDateObj = new Date(new Date(this.myStartDateMode2 + ' ' + this.myStartTimeMode2) + 'UTC');
            var endDateObj = new Date(new Date(this.myEndDateMode2 + ' ' + this.myEndTimeMode2) + 'UTC');
            deviceMediaObj['deviceId'] = this.id;
            deviceMediaObj['userId'] = userId;
            deviceMediaObj['uploadedDate'] = uploadedDate;
            deviceMediaObj['type'] = 'loop';
            deviceMediaObj['startDate'] = startDateObj;
            deviceMediaObj['endDate'] = endDateObj;
            this.getMediaIdList(this.dataMode2).then(function (res) {
                deviceMediaObj['media'] = res;
            }).catch(function (err) {
                console.log(err);
            });
        }
        var loading = this.loadingctrl.create({
            content: __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["f" /* loadingMessages */].pleaseWait
        });
        loading.present();
        this.deviceMediaDataMgr.uploadDeviceMedia(deviceMediaObj).then(function (deviceMediaData) {
            loading.dismiss();
            console.log(JSON.stringify(deviceMediaData));
        }).catch(function (err) {
            loading.dismiss();
            _this.idlAlert.defaultAlert(__WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["c" /* alertTitles */].deviceDetails, err.message, __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["a" /* alertButtons */].ok);
        });
    };
    /**
     *
     * @param data
     */
    DevicedetailsPage.prototype.getMediaIdList = function (data) {
        return new Promise(function (resolve, reject) {
            var mediaIdList = [];
            data.forEach(function (value, key, index) {
                var id = value.ISCM_id;
                alert("mediaId " + id);
                mediaIdList.push(id);
            });
            Promise.all(mediaIdList).then(function (_) { resolve(mediaIdList); }).catch(function (err) { reject(err); });
        });
    };
    DevicedetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-devicedetails',template:/*ion-inline-start:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\devicedetails\devicedetails.html"*/'<!--\n    Generated template for the DashboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<page-header></page-header>\n<page-sidebar></page-sidebar>\n\n<ion-content no-padding>\n  <ion-row no-padding>\n    <ion-col no-padding class="main-content" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12>\n      <div class="right-section-content">\n        <h1 margin>Device Details</h1>\n        <ion-row>\n          <div class="device-details" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 no-padding>\n            <ion-list radio-group>\n              <!-- mode 1 group details -->\n              <div class="mode1-block" col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 no-padding>\n                <ion-item no-padding>\n                  <ion-radio value="Mode1" (ionSelect)="radioCheckedMode1()"></ion-radio>\n                  <ion-label class="mode-label">Mode 1</ion-label>\n                </ion-item>\n                <div class="time-block">\n                  <ion-item class="border-input" no-padding>\n                    <ion-label>Start Date</ion-label>\n                    <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="DD MM YYYY" [(ngModel)]="myStartDateMode1"></ion-datetime>\n                  </ion-item>\n                  <ion-item class="border-input" no-padding>\n                    <ion-label>Start Time</ion-label>\n                    <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="myStartTimeMode1"></ion-datetime>\n                  </ion-item>\n                </div>\n                <ion-row class="list-row" margin-top>\n                  <div class="video-lists first-block-list scrollbar" col-md-6 col-lg-6>\n                    <ion-list  class="force-overflow">\n                      <p margin-left>Selected videos</p>\n                      <ion-item no-margin class="video-added-list" *ngFor="let videos of dataMode1; let i=index;" no-padding>\n                        <div class="drag-list">\n                          <ion-icon (click)="removeVideo(videos)" name="remove"></ion-icon>\n                        </div>\n                        <h2 margin-horizontal>{{ videos.ISCM_name }}</h2>\n                      </ion-item>\n                    </ion-list>\n                  </div>\n                  <div class="video-lists scrollbar" col-md-6 col-lg-6>\n                    <ion-list class="force-overflow">\n                      <p padding-left>Select the video to add</p>\n                      <ion-item no-margin class="video-added-list" *ngFor="let videos of mediaData; let i=index;" no-padding>\n                        <div class="drag-list">\n                          <ion-icon (click)="addVideoMode1(videos)" name="add"></ion-icon>\n                        </div>\n                        <h2 margin-horizontal>{{ videos.ISCM_name }}</h2>\n                      </ion-item>\n                    </ion-list>\n                  </div>\n                </ion-row>\n              </div>\n              <!-- mode 2 group details -->\n              <div class="mode2-block" col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 no-padding margin-vertical>\n                <ion-item no-padding>\n                  <ion-radio value="Mode2" (ionSelect)="radioCheckedMode2()"></ion-radio>\n                  <ion-label class="mode-label">Mode 2</ion-label>\n                </ion-item>\n                <div class="time-block">\n                  <ion-item class="border-input" no-padding>\n                    <ion-label>Start Date</ion-label>\n                    <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="DD MM YYYY" [(ngModel)]="myStartDateMode2"></ion-datetime>\n                  </ion-item>\n                  <ion-item class="border-input" no-padding>\n                    <ion-label>Start Time</ion-label>\n                    <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="myStartTimeMode2"></ion-datetime>\n                  </ion-item>\n                </div>\n                <div class="time-block">\n                  <ion-item class="border-input" no-padding>\n                    <ion-label>End Date</ion-label>\n                    <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="DD MM YYYY" [(ngModel)]="myEndDateMode2"></ion-datetime>\n                  </ion-item>\n                  <ion-item class="border-input" no-padding>\n                    <ion-label>End Time</ion-label>\n                    <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="myEndTimeMode2"></ion-datetime>\n                  </ion-item>\n                </div>\n                <ion-row class="list-row" margin-top>\n                  <div class="video-lists first-block-list scrollbar" col-md-6 col-lg-6>\n                    <ion-list class="force-overflow">\n                      <p margin-left>Selected videos</p>\n                      <ion-item no-margin class="video-added-list" *ngFor="let videos of dataMode2; let i=index;" no-padding>\n                        <div class="drag-list">\n                          <ion-icon (click)="removeVideo(videos)" name="remove"></ion-icon>\n                        </div>\n                        <h2 margin-horizontal>{{ videos.ISCM_name }}</h2>\n                      </ion-item>\n                    </ion-list>\n                  </div>\n                  <div class="video-lists scrollbar" col-md-6 col-lg-6>\n                    <ion-list class="force-overflow">\n                      <p padding-left>Select the video to add</p>\n                      <ion-item no-margin class="video-added-list" *ngFor="let videos of mediaData; let i=index;" no-padding>\n                        <div class="drag-list">\n                          <ion-icon (click)="addVideoMode2(videos)" name="add"></ion-icon>\n                        </div>\n                        <h2 margin-horizontal>{{ videos.ISCM_name }}</h2>\n                      </ion-item>\n                    </ion-list>\n                  </div>\n                </ion-row>\n              </div>\n              <div class="mode1-block" col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 no-padding>\n                <button margin-bottom ion-button round float-right color="light">Cancel</button>\n                <button margin-bottom ion-button round float-right (click)="saveDeviceMedia()">Save</button>\n              </div>\n            </ion-list>\n          </div>\n        </ion-row>\n      </div>\n    </ion-col>\n  </ion-row>\n</ion-content>'/*ion-inline-end:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\devicedetails\devicedetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__idlSCUtils_idlAlert__["a" /* IDLAlert */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__idlSCDataMgrs_mediaDataMgr__["a" /* MediaDataMgr */], __WEBPACK_IMPORTED_MODULE_5__idlSCDataMgrs_deviceMediaDataMgr__["a" /* DeviceMediaDataMgr */]])
    ], DevicedetailsPage);
    return DevicedetailsPage;
}());

//# sourceMappingURL=devicedetails.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addmedia_addmedia__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCUtils_idlAlert__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__idlSCDataMgrs_mediaDataMgr__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MediaPage = /** @class */ (function () {
    function MediaPage(navCtrl, navParams, modalCtrl, idlAlert, loadingctrl, mediaDataMgr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.idlAlert = idlAlert;
        this.loadingctrl = loadingctrl;
        this.mediaDataMgr = mediaDataMgr;
    }
    MediaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MediaPage');
        this.mediaList = this.navParams.get("media");
    };
    MediaPage.prototype.addnewmedia = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__addmedia_addmedia__["a" /* AddmediaPage */]);
        modal.present();
    };
    MediaPage.prototype.videoView = function () {
    };
    MediaPage.prototype.videoDelete = function () {
        var _this = this;
        var loading = this.loadingctrl.create({
            content: __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["f" /* loadingMessages */].pleaseWait
        });
        loading.present();
        this.mediaDataMgr.deleteMedia().then(function (response) {
            loading.dismiss();
            alert(JSON.stringify(response));
        }).catch(function (err) {
            loading.dismiss();
            _this.idlAlert.defaultAlert(__WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["c" /* alertTitles */].deleteMedia, err.message, __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["a" /* alertButtons */].ok);
        });
    };
    MediaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-media',template:/*ion-inline-start:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\media\media.html"*/'<!--\n  Generated template for the DashboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<page-header></page-header>\n<page-sidebar></page-sidebar>\n\n<ion-content no-padding>\n  <ion-row no-padding>\n    <ion-col no-padding class="main-content" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12>\n      <div class="right-section-content">\n        <h1 margin>Media</h1>\n        <button margin ion-button class="add-media-button" (click)="addnewmedia()">Add Media</button>\n        <ion-row margin>\n          <ion-col>\n            <ion-list class="list-items" no-padding no-margin>\n              <ion-item no-margin no-padding *ngFor="let video of mediaList; let i=index;">\n                <p class="file-name">{{video.ISCM_name}}</p>\n                <p class="duration">duration</p>\n                <button ion-button item-end (click)="videoView()">View</button>\n                <button ion-button item-end color="danger" (click)="videoDelete()">Delete</button>\n              </ion-item>\n            </ion-list>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\media\media.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__idlSCUtils_idlAlert__["a" /* IDLAlert */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__idlSCDataMgrs_mediaDataMgr__["a" /* MediaDataMgr */]])
    ], MediaPage);
    return MediaPage;
}());

//# sourceMappingURL=media.js.map

/***/ }),

/***/ 217:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 217;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return passwordType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return response; });
/* unused harmony export token */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return errorMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return alertTitles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return alertMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return alertButtons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return loadingMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return globalVariables; });
var passwordType = {
    text: 'text',
    password: 'password'
};
/**
 * Constants for server in response
 */
var response = {
    token: 'token',
    message: 'message',
    code: 'code',
    userId: 'userid',
    mediaId: 'mediaId'
};
/**
 * Constants for store the auth tokens
 */
var token = {
    bearer: 'Bearer ',
    device: 'deviceToken',
    user: 'userToken'
};
/**
 * message to show once the call failure
 */
var errorMessages = {
    idlInvalidResponse: 'Invalid Response',
    idlResponseNotFound: 'Response not found',
    idlDeviceRegistration: 'Failed to register device, Unable to get the token.',
    idlUserLogin: 'Failed to login.',
    idlUserUpdate: 'Unable to update user.',
    unableToGetDeviceData: 'Unable to get device data from database',
    unableToGetUserData: 'Unable to get user data from database',
    unableToParseResponse: 'Unable to parse response',
    unableToLogout: 'Unable to logout user',
    unableToChangePassword: 'Unable to change password.',
    unableToGetNotificationId: 'Unable to get notification id',
    unableToGetNotificationForId: 'Unable to get notification for id'
};
/**
 * Application alert messages
 */
var alertTitles = {
    Register: 'Register',
    Login: 'Login',
    logout: 'Logout',
    deleteMedia: 'Delete Media',
    dashBoard: 'Dash Board',
    deviceDetails: 'Device Details'
};
/**
 * Application alert messages
 */
var alertMessages = {
    termsAndConditionsDecline: 'Please accept terms and conditions to submit.',
    failAuth: "Failed to Authenticate",
    detailEntry: "Enter Proper Details",
    passwordMismatch: "Password Missmatch",
    tokenfails: "Please try again",
    changePasswordMatch: "Old and New Password Should not be Same."
};
/**
 * Application alert messages
 */
var alertButtons = {
    dismiss: 'Dismiss',
    ok: 'Ok'
};
/**
 * loading messages
 */
var loadingMessages = {
    authenticating: 'Authenticating...',
    pleaseWait: 'Please wait...',
    logout: 'Logging out...',
    updating: 'Updating...',
    signUp: 'Signing up...',
    login: 'Logging in...',
    initializing: 'Initialization...',
    media: 'Getting Media List'
};
/**
 * store the application variables
 */
var globalVariables = {
    userId: 'userId',
    mediaId: 'mediaId',
    mediaName: 'mediaName',
    deviceId: 'deviceId'
};
//# sourceMappingURL=idlSCConstants.js.map

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/addmedia/addmedia.module": [
		735,
		6
	],
	"../pages/dashboard/dashboard.module": [
		736,
		5
	],
	"../pages/devicedetails/devicedetails.module": [
		737,
		4
	],
	"../pages/header/header.module": [
		738,
		3
	],
	"../pages/login/login.module": [
		739,
		2
	],
	"../pages/media/media.module": [
		740,
		1
	],
	"../pages/sidebar/sidebar.module": [
		741,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 261;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validationMessages; });
var validationMessages = {
    'email': [
        { type: 'required', message: 'Enter a Valid Email.' },
    ],
    'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 8 characters long.' },
        { type: 'pattern', message: 'password must have atleast 1 uppercase,1 lowercase,1 Special Character and 1 number.' }
    ],
    'title': [
        { type: 'required', message: 'Title is required.' }
    ]
};
//# sourceMappingURL=idlSCValidationMessage.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaWSMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__baseWSMgr__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/**
 * @author : IDL Systems India Pvt Ltd, @ copyright 2018
 * @version : 1.0
 * @Created by : Shruthi K
 * @creationDate : 01-Apr=2019
 * @superClass :
 * @interfaces : no interface
 * @changeHistory :
 * Date                    Modified by                     Description
 * @desc : This is user web service manager
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MediaWSMgr = /** @class */ (function () {
    /**
     * Default constructor
     */
    function MediaWSMgr(baseWSMgr) {
        this.baseWSMgr = baseWSMgr;
    }
    /**
     * Method to login the user to application
     * @param userData
     */
    MediaWSMgr.prototype.addMedia = function (mediaData) {
        var _this = this;
        //build header object
        var headers = {};
        if (window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].userId) !== "undefined" || window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].userId) !== null) {
            headers[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["d" /* wsHeaders */].userId] = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].userId),
                headers[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["d" /* wsHeaders */].attachmenttype] = 'file';
        }
        //build the route url
        var baseUrl = __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["b" /* wsConfigs */].baseUrl + __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["a" /* userWSRoutes */].media;
        return new Promise(function (resolve, reject) {
            _this.baseWSMgr.post(baseUrl, headers, mediaData).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                alert(err);
                reject(err);
            });
        });
    };
    /**
     * Method to login the user to application
     * @param userData
     */
    MediaWSMgr.prototype.getMedia = function () {
        var _this = this;
        //build the route url
        var baseUrl = __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["b" /* wsConfigs */].baseUrl + __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["a" /* userWSRoutes */].media;
        //build header object
        var headers = {};
        if (window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].userId) !== "undefined" || window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].userId) !== null) {
            // headers[wsConfig.wsHeaders.userId] = window.localStorage.getItem(consts.response.userId)
            headers[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["d" /* wsHeaders */].userId] = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].userId);
        }
        return new Promise(function (resolve, reject) {
            _this.baseWSMgr.get(baseUrl, headers).then(function (response) {
                // alert(JSON.stringify(response));
                resolve(response);
            }).catch(function (err) {
                alert(err);
                reject(err);
            });
        });
    };
    /**
     * Method to get  the device media to application
     * @param mediaData
     */
    MediaWSMgr.prototype.getDeviceMedia = function (mediaData) {
        var _this = this;
        //build the route url
        var baseUrl = __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["b" /* wsConfigs */].baseUrl + __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["a" /* userWSRoutes */].deviceMedia;
        //build header object
        var headers = {};
        if (window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].userId) !== "undefined" || window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].userId) !== null) {
            headers[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["d" /* wsHeaders */].mediaId] = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].mediaId);
            headers[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["d" /* wsHeaders */].userId] = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].userId);
        }
        return new Promise(function (resolve, reject) {
            _this.baseWSMgr.post(baseUrl, headers, mediaData).then(function (response) {
                alert("DeviceWSMgr" + JSON.stringify(response));
                resolve(response);
            }).catch(function (err) {
                alert(err);
                reject(err);
            });
        });
    };
    /**
     * Method to get  the device media to application
     * @param mediaData
     */
    MediaWSMgr.prototype.deleteMedia = function () {
        var _this = this;
        var mediaId = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].mediaId);
        alert(JSON.stringify(mediaId));
        //build the route url
        var baseUrl = __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["b" /* wsConfigs */].baseUrl + __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["a" /* userWSRoutes */].mediaDelete + mediaId;
        alert(JSON.stringify(baseUrl));
        return new Promise(function (resolve, reject) {
            _this.baseWSMgr.delete(baseUrl, "", "").then(function (response) {
                alert("DeviceWSMgr" + JSON.stringify(response));
                resolve(response);
            }).catch(function (err) {
                alert(err);
                reject(err);
            });
        });
    };
    MediaWSMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__baseWSMgr__["a" /* BaseWSMgr */]])
    ], MediaWSMgr);
    return MediaWSMgr;
}());

//# sourceMappingURL=mediaWSMgr.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IDLSCUploadMediaDbMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__idlSCBaseDbMgr__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCModels_Media__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCDbConfig__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IDLSCUploadMediaDbMgr = /** @class */ (function () {
    function IDLSCUploadMediaDbMgr(idlBaseDbMgr) {
        this.idlBaseDbMgr = idlBaseDbMgr;
        this.baseDbMgr = new __WEBPACK_IMPORTED_MODULE_1__idlSCBaseDbMgr__["a" /* IDLBaseDbMgr */]();
    }
    /**
     * add Media to database
     * @param media model object to store database
     */
    IDLSCUploadMediaDbMgr.prototype.addMedia = function (media) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.deleteMediaById(media.id).then(function (status) {
                _this.baseDbMgr.executeSqlCallback(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCDbConfig__["b" /* idlSCMediaQuery */].insertMedia, [media.id, media.mediaName, media.mediaUrl, media.uploadTime, media.userId]).then(function (res) {
                    resolve(true);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Delete media by id from database
     */
    IDLSCUploadMediaDbMgr.prototype.deleteMediaById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.baseDbMgr.executeSqlCallback(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCDbConfig__["b" /* idlSCMediaQuery */].deleteMedia, [id]).then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * get media by id
     * @param id unique id to get media from database
     */
    IDLSCUploadMediaDbMgr.prototype.getMediaById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.baseDbMgr.executeSqlCallback(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCDbConfig__["b" /* idlSCMediaQuery */].getMediaById, [id]).then(function (res) {
                if ((res.rows !== undefined) && (res.rows !== null)) {
                    _this.getMediaObject(res.rows.item(0)).then(function (media) {
                        //alert(JSON.stringify(media))
                        resolve(media);
                    });
                }
                else if ((res !== undefined) && (res[0] !== undefined)) {
                    _this.getMediaObject(res[0]).then(function (media) {
                        // alert(JSON.stringify(media))
                        resolve(media);
                    });
                }
                else {
                    var error = {};
                    error[__WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["h" /* response */].message] = __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCConstants__["d" /* errorMessages */].unableToGetUserData;
                    alert(error);
                    reject(error);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Get media object from the database response
     * @param obj database result object
     */
    IDLSCUploadMediaDbMgr.prototype.getMediaObject = function (obj) {
        return new Promise(function (resolve, reject) {
            var media = new __WEBPACK_IMPORTED_MODULE_2__idlSCModels_Media__["a" /* Media */]();
            media.id = obj.ISCM_id;
            media.mediaName = obj.ISCM_name;
            media.mediaUrl = obj.ISCM_url;
            media.uploadTime = obj.ISCM_uploadtime;
            media.userId = obj.ISCM_userid;
            resolve(media);
        });
    };
    IDLSCUploadMediaDbMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__idlSCBaseDbMgr__["a" /* IDLBaseDbMgr */]])
    ], IDLSCUploadMediaDbMgr);
    return IDLSCUploadMediaDbMgr;
}());

//# sourceMappingURL=idlSCUploadMediaDbMgr.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceMediaDataMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__idlSCWebServiceMgrs_deviceMediaWSMgr__ = __webpack_require__(277);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DeviceMediaDataMgr = /** @class */ (function () {
    /**
     * Default class constructor
     * @param deviceMediaWSMgr
     */
    function DeviceMediaDataMgr(deviceMediaWSMgr) {
        this.deviceMediaWSMgr = deviceMediaWSMgr;
    }
    /**
     * Method to get media
     */
    DeviceMediaDataMgr.prototype.uploadDeviceMedia = function (deviceMediaData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.deviceMediaWSMgr.uploadDeviceMedia(deviceMediaData).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    DeviceMediaDataMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__idlSCWebServiceMgrs_deviceMediaWSMgr__["a" /* DeviceMediaWSMgr */]])
    ], DeviceMediaDataMgr);
    return DeviceMediaDataMgr;
}());

//# sourceMappingURL=deviceMediaDataMgr.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceMediaWSMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__baseWSMgr__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DeviceMediaWSMgr = /** @class */ (function () {
    /**
     * Default constructor
     */
    function DeviceMediaWSMgr(baseWSMgr) {
        this.baseWSMgr = baseWSMgr;
    }
    /**
     * Method to upload device data
     * @param deviceMediaData
     */
    DeviceMediaWSMgr.prototype.uploadDeviceMedia = function (deviceMediaData) {
        var _this = this;
        //build the route url
        var baseUrl = __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["b" /* wsConfigs */].baseUrl + __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["a" /* userWSRoutes */].deviceMedia;
        alert(JSON.stringify(deviceMediaData));
        return new Promise(function (resolve, reject) {
            _this.baseWSMgr.post(baseUrl, "", deviceMediaData).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                alert(err);
                reject(err);
            });
        });
    };
    DeviceMediaWSMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__baseWSMgr__["a" /* BaseWSMgr */]])
    ], DeviceMediaWSMgr);
    return DeviceMediaWSMgr;
}());

//# sourceMappingURL=deviceMediaWSMgr.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceDataMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__idlSCWebServiceMgrs_deviceWSMgr__ = __webpack_require__(279);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DeviceDataMgr = /** @class */ (function () {
    /**
     * Default class constructor
     */
    function DeviceDataMgr(deviceWSMgr) {
        this.deviceWSMgr = deviceWSMgr;
    }
    /**
    * Method to get devices
    */
    DeviceDataMgr.prototype.getDevice = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.deviceWSMgr.getDevice().then(function (response) {
                resolve(response);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    DeviceDataMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__idlSCWebServiceMgrs_deviceWSMgr__["a" /* DeviceWSMgr */]])
    ], DeviceDataMgr);
    return DeviceDataMgr;
}());

//# sourceMappingURL=deviceDataMgr.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceWSMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseWSMgr__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DeviceWSMgr = /** @class */ (function () {
    /**
     * Default constructor
     */
    function DeviceWSMgr(baseWSMgr) {
        this.baseWSMgr = baseWSMgr;
    }
    /**
     * Method to get the device to application
     */
    DeviceWSMgr.prototype.getDevice = function () {
        var _this = this;
        //build the route url
        var baseUrl = __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["b" /* wsConfigs */].baseUrl + __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["a" /* userWSRoutes */].device;
        //build header object
        var headers = {};
        if (window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].userId) !== "undefined" || window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].userId) !== null) {
            headers[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["d" /* wsHeaders */].userId] = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].userId);
        }
        return new Promise(function (resolve, reject) {
            _this.baseWSMgr.get(baseUrl, headers).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                alert(err);
                reject(err);
            });
        });
    };
    DeviceWSMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__baseWSMgr__["a" /* BaseWSMgr */]])
    ], DeviceWSMgr);
    return DeviceWSMgr;
}());

//# sourceMappingURL=deviceWSMgr.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IDLUserDataMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__idlSCModels_User__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCWebServiceMgrs_userWSMgr__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__idlSCDbMgrs_idlSCUserDbMgr__ = __webpack_require__(155);
/**
 * @author : IDL Systems India Pvt Ltd, @ copyright 2018
 * @version : 1.0
 * @Created by : Shruthi K
 * @creationDate : 29-March-2019
 * @superClass :
 * @interfaces : no interface
 * @changeHistory :
 * Date                    Modified by                     Description
 * @desc : This is user data manager
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IDLUserDataMgr = /** @class */ (function () {
    /**
     * Default class constructor
     *
     * @param userWebServiceMgr
     * @param idlUserDbMgr
     */
    function IDLUserDataMgr(userWSMgr, idlUserDBMgr) {
        this.userWSMgr = userWSMgr;
        this.idlUserDBMgr = idlUserDBMgr;
    }
    /**
     * Method to login to the application
     * @param data data contains the user credentials to login the application
     */
    IDLUserDataMgr.prototype.loginUser = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.userWSMgr.userLogin(data).then(function (response) {
                if (response) {
                    _this.getUserObjectFromResponse(response).then(function (userData) {
                        _this.idlUserDBMgr.addUser(userData).then(function (status) {
                            if (status) {
                                //store token and user id as global variables
                                //window.localStorage.setItem(consts.token.user, consts.token.bearer + response[consts.response.token])
                                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].userId, userData.id);
                                resolve(userData);
                            }
                        }).catch(function (error) {
                            reject(error);
                        });
                    }).catch(function (error) {
                        reject(error);
                    });
                }
                else {
                    var error = {};
                    error[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__["h" /* response */].message] = __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__["d" /* errorMessages */].idlUserLogin;
                    reject(error);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * Get the user data from the response
     * @param response
     */
    IDLUserDataMgr.prototype.getUserObjectFromResponse = function (response) {
        return new Promise(function (resolve, reject) {
            if (response) {
                var user = new __WEBPACK_IMPORTED_MODULE_1__idlSCModels_User__["a" /* User */]();
                user.id = response.content.ISCU_id;
                user.userName = response.content.ISCU_name;
                user.password = response.content.ISCU_password;
                user.email = response.content.ISCU_email;
                resolve(user);
            }
            else {
                var error = {};
                error[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__["h" /* response */].message] = __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__["d" /* errorMessages */].unableToParseResponse;
                reject(error);
            }
        });
    };
    IDLUserDataMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__idlSCWebServiceMgrs_userWSMgr__["a" /* UserWSMgr */], __WEBPACK_IMPORTED_MODULE_4__idlSCDbMgrs_idlSCUserDbMgr__["a" /* IDLUserDBMgr */]])
    ], IDLUserDataMgr);
    return IDLUserDataMgr;
}());

//# sourceMappingURL=userDataMgr.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User() {
    }
    Object.defineProperty(User.prototype, "id", {
        //Getter and setter for data variables
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        set: function (userName) {
            this._userName = userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (email) {
            this._email = email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (password) {
            this._password = password;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());

//# sourceMappingURL=User.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserWSMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__idlSCHelpers_idlWSConfigs__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCWebServiceMgrs_baseWSMgr__ = __webpack_require__(74);
/**
 * @author : IDL Systems India Pvt Ltd, @ copyright 2018
 * @version : 1.0
 * @Created by : Shruthi K
 * @creationDate : 29-March-2019
 * @superClass :
 * @interfaces : no interface
 * @changeHistory :
 * Date                    Modified by                     Description
 * @desc : This is user web service manager
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserWSMgr = /** @class */ (function () {
    /**
     * Default constructor
     */
    function UserWSMgr(baseWSMgr) {
        this.baseWSMgr = baseWSMgr;
    }
    /**
     * Method to login the user to application
     * @param userData
     */
    UserWSMgr.prototype.userLogin = function (userData) {
        var _this = this;
        //build the route url
        var baseUrl = __WEBPACK_IMPORTED_MODULE_1__idlSCHelpers_idlWSConfigs__["b" /* wsConfigs */].baseUrl + __WEBPACK_IMPORTED_MODULE_1__idlSCHelpers_idlWSConfigs__["a" /* userWSRoutes */].login;
        return new Promise(function (resolve, reject) {
            _this.baseWSMgr.post(baseUrl, "", userData).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    UserWSMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__idlSCWebServiceMgrs_baseWSMgr__["a" /* BaseWSMgr */]])
    ], UserWSMgr);
    return UserWSMgr;
}());

//# sourceMappingURL=userWSMgr.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCDbMgrs_idlSCUserDbMgr__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the HeaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HeaderPage = /** @class */ (function () {
    function HeaderPage(navCtrl, navParams, userDbMgr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userDbMgr = userDbMgr;
    }
    HeaderPage.prototype.ngOnInit = function () {
        /*  this.id = window.localStorage.getItem(consts.globalVariables.userId);
          this.userDbMgr.getUserById(this.id).then((user: User) => {
            alert(JSON.stringify(user));
            if (user) {
              this.userName = user.userName;
            }
          }).catch((err) => {
      
          })*/
    };
    HeaderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HeaderPage');
    };
    HeaderPage.prototype.logOutRedirect = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    HeaderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-header',template:/*ion-inline-start:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\header\header.html"*/'<!--\n  Generated template for the HeaderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header no-margin no-padding>\n    <ion-navbar no-margin no-padding>\n        <ion-row no-padding class="main-header">\n            <ion-col no-padding class="" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12>\n                <ion-row>\n                    <div col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8>\n                        <table>\n                            <tbody>\n                                <tr>\n                                    <td>\n                                        <img src="../../assets/imgs/headerlogo.png" alt="Header Logo">\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                    <div col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4>\n                        <ul class="nav-list" margin>\n                            <li margin>{{userName}}</li>\n                            <li margin (click)="logOutRedirect()">Logout</li>\n                        </ul>\n                    </div>\n                </ion-row>\n            </ion-col>\n        </ion-row>\n    </ion-navbar>\n</ion-header>'/*ion-inline-end:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\header\header.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__idlSCDbMgrs_idlSCUserDbMgr__["a" /* IDLUserDBMgr */]])
    ], HeaderPage);
    return HeaderPage;
}());

//# sourceMappingURL=header.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__media_media__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__idlSCDataMgrs_mediaDataMgr__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__idlSCUtils_idlAlert__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SidebarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SidebarPage = /** @class */ (function () {
    function SidebarPage(navCtrl, navParams, idlAlert, loadingctrl, mediaDataMgr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.idlAlert = idlAlert;
        this.loadingctrl = loadingctrl;
        this.mediaDataMgr = mediaDataMgr;
    }
    SidebarPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SidebarPage');
    };
    SidebarPage.prototype.mediadetails = function () {
        var _this = this;
        var loading = this.loadingctrl.create({
            content: __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["f" /* loadingMessages */].media
        });
        loading.present();
        this.mediaDataMgr.getMedia().then(function (media) {
            loading.dismiss();
            _this.mediaList = media;
            //console.log(JSON.stringify(this.mediaList));
            var mediaData = _this.mediaList.content;
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__media_media__["a" /* MediaPage */], { media: mediaData });
            console.log(mediaData);
        }).catch(function (err) {
            loading.dismiss();
            _this.idlAlert.defaultAlert(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["c" /* alertTitles */].Login, err.message, __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["a" /* alertButtons */].ok);
        });
    };
    SidebarPage.prototype.devicelist = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard__["a" /* DashboardPage */]);
    };
    SidebarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sidebar',template:/*ion-inline-start:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\sidebar\sidebar.html"*/'<!--\n  Generated template for the SidebarPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="left-sidebar">\n  <ul no-margin>\n    <li padding (click)="devicelist()">Devices</li>\n    <li padding (click)="mediadetails()">Media</li>\n  </ul>\n</div>'/*ion-inline-end:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\sidebar\sidebar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__idlSCUtils_idlAlert__["a" /* IDLAlert */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__idlSCDataMgrs_mediaDataMgr__["a" /* MediaDataMgr */]])
    ], SidebarPage);
    return SidebarPage;
}());

//# sourceMappingURL=sidebar.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(445);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_header_header__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_sidebar_sidebar__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_dashboard_dashboard__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_media_media__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_addmedia_addmedia__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_devicedetails_devicedetails__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_network_ngx__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_globalization_ngx__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_http__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__idlSCDataMgrs_userDataMgr__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__idlSCWebServiceMgrs_userWSMgr__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__idlSCWebServiceMgrs_baseWSMgr__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__idlSCHelpers_idlSCConnectivityService__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__idlSCUtils_idlAlert__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__idlSCDbMgrs_idlSCBaseDbMgr__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__idlSCDataMgrs_mediaDataMgr__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__idlSCWebServiceMgrs_mediaWSMgr__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__idlSCModels_Media__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_media_capture_ngx__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__idlSCDbMgrs_idlSCUserDbMgr__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__idlSCDataMgrs_deviceDataMgr__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__idlSCWebServiceMgrs_deviceWSMgr__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__idlSCDbMgrs_idlSCUploadMediaDbMgr__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__idlSCDataMgrs_deviceMediaDataMgr__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__idlSCWebServiceMgrs_deviceMediaWSMgr__ = __webpack_require__(277);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_header_header__["a" /* HeaderPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sidebar_sidebar__["a" /* SidebarPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_media_media__["a" /* MediaPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_addmedia_addmedia__["a" /* AddmediaPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_devicedetails_devicedetails__["a" /* DevicedetailsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/addmedia/addmedia.module#AddmediaPageModule', name: 'AddmediaPage', segment: 'addmedia', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/devicedetails/devicedetails.module#DevicedetailsPageModule', name: 'DevicedetailsPage', segment: 'devicedetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/header/header.module#HeaderPageModule', name: 'HeaderPage', segment: 'header', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/media/media.module#MediaPageModule', name: 'MediaPage', segment: 'media', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sidebar/sidebar.module#SidebarPageModule', name: 'SidebarPage', segment: 'sidebar', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_header_header__["a" /* HeaderPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_sidebar_sidebar__["a" /* SidebarPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_media_media__["a" /* MediaPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_addmedia_addmedia__["a" /* AddmediaPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_devicedetails_devicedetails__["a" /* DevicedetailsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_16__idlSCDataMgrs_userDataMgr__["a" /* IDLUserDataMgr */],
                __WEBPACK_IMPORTED_MODULE_17__idlSCWebServiceMgrs_userWSMgr__["a" /* UserWSMgr */],
                __WEBPACK_IMPORTED_MODULE_18__idlSCWebServiceMgrs_baseWSMgr__["a" /* BaseWSMgr */],
                __WEBPACK_IMPORTED_MODULE_19__idlSCHelpers_idlSCConnectivityService__["a" /* ConnectivityService */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_globalization_ngx__["a" /* Globalization */],
                __WEBPACK_IMPORTED_MODULE_20__idlSCUtils_idlAlert__["a" /* IDLAlert */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_network_ngx__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_21__idlSCDbMgrs_idlSCBaseDbMgr__["a" /* IDLBaseDbMgr */],
                __WEBPACK_IMPORTED_MODULE_26__idlSCDbMgrs_idlSCUserDbMgr__["a" /* IDLUserDBMgr */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_media_capture_ngx__["a" /* MediaCapture */],
                __WEBPACK_IMPORTED_MODULE_22__idlSCDataMgrs_mediaDataMgr__["a" /* MediaDataMgr */],
                __WEBPACK_IMPORTED_MODULE_23__idlSCWebServiceMgrs_mediaWSMgr__["a" /* MediaWSMgr */],
                __WEBPACK_IMPORTED_MODULE_27__idlSCDataMgrs_deviceDataMgr__["a" /* DeviceDataMgr */],
                __WEBPACK_IMPORTED_MODULE_28__idlSCWebServiceMgrs_deviceWSMgr__["a" /* DeviceWSMgr */],
                __WEBPACK_IMPORTED_MODULE_29__idlSCDbMgrs_idlSCUploadMediaDbMgr__["a" /* IDLSCUploadMediaDbMgr */],
                __WEBPACK_IMPORTED_MODULE_30__idlSCDataMgrs_deviceMediaDataMgr__["a" /* DeviceMediaDataMgr */],
                __WEBPACK_IMPORTED_MODULE_31__idlSCWebServiceMgrs_deviceMediaWSMgr__["a" /* DeviceMediaWSMgr */],
                __WEBPACK_IMPORTED_MODULE_24__idlSCModels_Media__["a" /* Media */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IDLAlert; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* @author : IDL Systems India Pvt Ltd, @ copyright 2018
 * @version :
 * @Created by : Shruthi K
 * @creationDate : 30/03/2019
 * @changeHistory :
 * @desc :
 * date                Modified By                      Description
 *
*/


var IDLAlert = /** @class */ (function () {
    function IDLAlert(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    /**
     * method to show the default alert dialog
     * @param title  defines the title of alert dialog
     * @param subTitle defines the subTitle of alert dialog
     * @param btnName defines the btnName of alert dialog
     */
    IDLAlert.prototype.defaultAlert = function (title, subTitle, btnName) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [btnName]
        });
        alert.present();
    };
    IDLAlert = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */]])
    ], IDLAlert);
    return IDLAlert;
}());

//# sourceMappingURL=idlAlert.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaDataMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__idlSCWebServiceMgrs_mediaWSMgr__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCModels_Media__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__idlSCDbMgrs_idlSCUploadMediaDbMgr__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MediaDataMgr = /** @class */ (function () {
    /**
     * Default class constructor
     * @param userWebServiceMgr
     * @param idlUserDbMgr
     */
    function MediaDataMgr(mediaWSMgr, idlSCMediaDbMgr) {
        this.mediaWSMgr = mediaWSMgr;
        this.idlSCMediaDbMgr = idlSCMediaDbMgr;
    }
    /**
     * Method to add media
     * @param metaData contains the data of the media
     */
    MediaDataMgr.prototype.addMedia = function (mediaData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.mediaWSMgr.addMedia(mediaData).then(function (response) {
                //store media id as global variables
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].mediaId, mediaData.id);
                // window.localStorage.setItem(consts.globalVariables.mediaName, media.mediaName)
                resolve(response);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Method to get media
     */
    MediaDataMgr.prototype.getMedia = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.mediaWSMgr.getMedia().then(function (response) {
                resolve(response);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * delete the media data from the response
     */
    MediaDataMgr.prototype.deleteMedia = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.mediaWSMgr.deleteMedia().then(function (response) {
                resolve(response);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Get the user data from the response
     * @param response
     */
    MediaDataMgr.prototype.getMediaObjectFromResponse = function (response) {
        return new Promise(function (resolve, reject) {
            if (response) {
                var media = new __WEBPACK_IMPORTED_MODULE_3__idlSCModels_Media__["a" /* Media */]();
                media.id = response.content.ISCM_id;
                media.mediaName = response.content.ISCM_name;
                media.mediaUrl = response.content.ISCM_url;
                media.uploadTime = response.content.ISCM_uploadtime;
                resolve(media);
            }
            else {
                var error = {};
                error[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__["h" /* response */].message] = __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlSCConstants__["d" /* errorMessages */].unableToParseResponse;
                reject(error);
            }
        });
    };
    MediaDataMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__idlSCWebServiceMgrs_mediaWSMgr__["a" /* MediaWSMgr */], __WEBPACK_IMPORTED_MODULE_4__idlSCDbMgrs_idlSCUploadMediaDbMgr__["a" /* IDLSCUploadMediaDbMgr */]])
    ], MediaDataMgr);
    return MediaDataMgr;
}());

//# sourceMappingURL=mediaDataMgr.js.map

/***/ }),

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(96);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\DELL\Desktop\Ionic\idl\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\DELL\Desktop\Ionic\idl\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectivityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network_ngx__ = __webpack_require__(324);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConnectivityService = /** @class */ (function () {
    function ConnectivityService(network) {
        var _this = this;
        this.network = network;
        this.internetStatus = true;
        if (this.network.type === 'none') {
            this.internetStatus = false;
        }
        this.network.onDisconnect().subscribe(function () {
            _this.internetStatus = false;
        });
        this.network.onConnect().subscribe(function () {
            _this.internetStatus = true;
        });
    }
    ConnectivityService.prototype.isOnline = function () {
        return this.internetStatus;
    };
    ConnectivityService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_network_ngx__["a" /* Network */]])
    ], ConnectivityService);
    return ConnectivityService;
}());

//# sourceMappingURL=idlSCConnectivityService.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseWSMgr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_globalization_ngx__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/**
 * @author : IDL Systems India Pvt Ltd, @ copyright 2018
 * @version : 1.0
 * @Created by : Shruthi K
 * @creationDate : 29-March-2019
 * @superClass :
 * @interfaces : no interface
 * @changeHistory :
 * Date                    Modified by                     Description
 * @desc : This is user web service manager
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BaseWSMgr = /** @class */ (function () {
    function BaseWSMgr(http, globalization) {
        this.http = http;
        this.globalization = globalization;
    }
    /**
     * method to get data from the server
     * @param route url to get the data from the web server
     * @param headers headers for the web service call
     */
    BaseWSMgr.prototype.get = function (route, headers) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getHeaders(headers).then(function (httpHeaders) {
                _this.http.get(route, { headers: httpHeaders })
                    .pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["map"])(function (data) {
                    return data;
                }))
                    .subscribe(function (res) {
                    console.log(JSON.stringify(res));
                    _this.validate(res).then(function (data) {
                        resolve(res);
                    }).catch(function (err) {
                        reject(err);
                    });
                }, function (err) {
                    console.log(JSON.stringify(err));
                    reject(err.error);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Method for http post web service
     * @param route url for the web service call
     * @param headers headers for the web service
     * @param body request body
     */
    BaseWSMgr.prototype.post = function (route, headers, body) {
        var _this = this;
        console.log("inside post");
        return new Promise(function (resolve, reject) {
            _this.getHeaders(headers).then(function (httpHeaders) {
                console.log(JSON.stringify(headers));
                _this.http.post(route, body, { headers: httpHeaders })
                    .pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["map"])(function (data) {
                    return data;
                })).subscribe(function (res) {
                    console.log(JSON.stringify(res));
                    _this.validate(res).then(function (data) {
                        resolve(res);
                    }).catch(function (err) {
                        reject(err);
                    });
                }, function (err) {
                    console.log(JSON.stringify(err));
                    reject(err.error);
                });
            }).catch(function (err) {
                console.log(JSON.stringify(err));
                reject(err);
            });
        });
    };
    /**
     * Method for http put web service
     * @param route url for the web service call
     * @param headers headers for the web service
     * @param body request body
     */
    BaseWSMgr.prototype.put = function (route, headers, body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getHeaders(headers).then(function (httpHeaders) {
                _this.http.put(route, body, { headers: httpHeaders })
                    .pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["map"])(function (data) {
                    return data;
                }))
                    .subscribe(function (res) {
                    _this.validate(res).then(function (data) {
                        resolve(res);
                    }).catch(function (err) {
                        reject(err);
                    });
                }, function (err) {
                    reject(err.error);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Method for http delete web service
     * @param route url for the web service call
     * @param headers headers for the web service
     */
    BaseWSMgr.prototype.delete = function (route, headers, body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getHeaders(headers).then(function (httpHeaders) {
                _this.http.delete(route, { headers: httpHeaders })
                    .pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["map"])(function (data) {
                    return data;
                }))
                    .subscribe(function (res) {
                    _this.validate(res).then(function (data) {
                        resolve(res);
                    }).catch(function (err) {
                        reject(err);
                    });
                }, function (err) {
                    reject(err.error);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Method for http multipart data web service
     * @param route url for the web service call
     * @param headers headers for the web service
     * @param formdata request form data
     */
    BaseWSMgr.prototype.multipart = function (route, headers, formdata) {
        return new Promise(function (resolve, reject) {
        });
    };
    /**
     * method to validate the response from the web service and return the response back
     * @param response response from the web server
     */
    BaseWSMgr.prototype.validate = function (response) {
        return new Promise(function (resolve, reject) {
            if (response) {
                if (response[__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].code] !== null || response[__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].code] !== 'undefined') {
                    var statusCode = response[__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].code];
                    if (statusCode == '200' || statusCode == '201' || statusCode == '203' || statusCode == '204') {
                        resolve(response);
                    }
                    else {
                        reject(response);
                    }
                }
                else {
                    /*var error = {}
                    error[consts.response.message] = consts.errorMessages.idlInvalidResponse
                    reject(error);*/
                }
            }
            else {
                var error = {};
                error[__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["h" /* response */].message] = __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["d" /* errorMessages */].idlResponseNotFound;
                reject(error);
            }
        });
    };
    /**
     * to get the http headers function
     * @param headers header object from the derived ws class
     */
    BaseWSMgr.prototype.getHeaders = function (customHeaders) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getIpAddress().then(function (data) {
                customHeaders.ip = data;
                _this.getGlobalization().then(function (locale) {
                    customHeaders.locale = locale;
                    var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */](customHeaders);
                    resolve(headers);
                }).catch(function (err) {
                    var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */](customHeaders);
                    resolve(headers);
                });
            }).catch(function (err) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */](customHeaders);
                resolve(headers);
            });
        });
    };
    /**
    * This method is used to get the public ip address
    */
    BaseWSMgr.prototype.getIpAddress = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["b" /* wsConfigs */].ipUrl)
                .pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["map"])(function (data) {
                resolve(JSON.stringify(data));
            })).catch(function (err) {
                return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].throw({
                    'error': err.error
                });
            }).subscribe(function (res) {
                resolve(JSON.stringify(res));
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * Locale getLocaleName
     */
    BaseWSMgr.prototype.getGlobalization = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var locale = {};
            _this.globalization.getLocaleName()
                .then(function (res) {
                locale[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["c" /* wsGlobalizations */].name] = res;
                _this.globalization.getPreferredLanguage().then(function (res) {
                    locale[__WEBPACK_IMPORTED_MODULE_2__idlSCHelpers_idlWSConfigs__["c" /* wsGlobalizations */].preferedLanguage] = res;
                    resolve(locale);
                })
                    .catch(function (e) {
                    resolve(locale);
                });
            })
                .catch(function (e) { return reject(e); });
        });
    };
    BaseWSMgr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_globalization_ngx__["a" /* Globalization */]])
    ], BaseWSMgr);
    return BaseWSMgr;
}());

//# sourceMappingURL=baseWSMgr.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return wsConfigs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return wsGlobalizations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userWSRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return wsHeaders; });
/**
 * @author : IDL Systems India Pvt Ltd, @ copyright 2018
 * @version : 1.0
 * @Created by : Shruthi K
 * @creationDate : 29-March-2019
 * @superClass :
 * @interfaces : no interface
 * @changeHistory :
 * Date                    Modified by                     Description
 * @desc : This class is used to store ws configs
 */
/**
* Configurations for webservices
*/
var wsConfigs = {
    ipUrl: 'http://www.ip-api.com/json',
    //baseUrl: 'http://192.168.0.139:3006/api/',
    //baseUrl: 'http://192.168.0.162:3006/api/'
    baseUrl: 'http://3.17.65.64/isc/api/'
};
/**
* Common entities from globalization
*/
var wsGlobalizations = {
    name: 'name',
    preferedLanguage: 'preferedLanguage',
};
/**
* routes for the user
*/
var userWSRoutes = {
    login: 'isc/v1/login',
    media: 'isc/v1/media',
    mediaDelete: 'isc/v1/media/',
    device: 'isc/v1/devices',
    deviceMedia: 'isc/v1/deviceMedia'
};
/**-------------------
* Common headers key names
*/
var wsHeaders = {
    ip: 'ip',
    locale: 'locale',
    userId: 'userId',
    mediaId: 'mediaId',
    attachmenttype: 'attachmenttype'
};
//# sourceMappingURL=idlWSConfigs.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__devicedetails_devicedetails__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__idlSCDataMgrs_deviceDataMgr__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__idlSCUtils_idlAlert__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DashboardPage = /** @class */ (function () {
    function DashboardPage(navCtrl, idlAlert, navParams, deviceDataMgr, loadingctrl) {
        this.navCtrl = navCtrl;
        this.idlAlert = idlAlert;
        this.navParams = navParams;
        this.deviceDataMgr = deviceDataMgr;
        this.loadingctrl = loadingctrl;
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        this.user = this.navParams.get("user");
        console.log(JSON.stringify(this.user));
        this.getDeviceList();
    };
    DashboardPage.prototype.devicedetails = function () {
        for (var i = 0; i <= this.deviceList.length; i++) {
            var deviceId = this.deviceList[i].ISCD_id;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["e" /* globalVariables */].deviceId, deviceId);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__devicedetails_devicedetails__["a" /* DevicedetailsPage */], {
                deviceId: deviceId
            });
        }
    };
    DashboardPage.prototype.getDeviceList = function () {
        var _this = this;
        var loading = this.loadingctrl.create({
            content: __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["f" /* loadingMessages */].pleaseWait
        });
        loading.present();
        this.deviceDataMgr.getDevice().then(function (device) {
            loading.dismiss();
            _this.deviceList = device;
            var deviceData = _this.deviceList.content;
            _this.deviceList = deviceData;
            console.log(JSON.stringify(_this.deviceList));
        }).catch(function (err) {
            loading.dismiss();
            _this.idlAlert.defaultAlert(__WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["c" /* alertTitles */].dashBoard, err.message, __WEBPACK_IMPORTED_MODULE_3__idlSCHelpers_idlSCConstants__["a" /* alertButtons */].ok);
        });
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\dashboard\dashboard.html"*/'\n<!--\n  Generated template for the MediaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<page-header></page-header>\n<page-sidebar></page-sidebar>\n<ion-content no-padding>\n    <ion-row no-padding>\n      <ion-col no-padding class="main-content" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12>\n        \n        <div class="right-section-content">\n          <h1 margin-horizontal>Devices</h1>\n          <ion-row margin>\n            <div col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 (click)="devicedetails()" *ngFor="let device of deviceList; let i=index;">\n              <div class="device-blocks">\n                <div class="inside-blocks">\n                  <p>{{ device.ISCDR_id }} </p>\n                </div>\n              </div>\n            </div>\n          </ion-row>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-content>'/*ion-inline-end:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\dashboard\dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__idlSCUtils_idlAlert__["a" /* IDLAlert */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__idlSCDataMgrs_deviceDataMgr__["a" /* DeviceDataMgr */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCValidationMessage__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__idlSCUtils_idlAlert__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__idlSCDataMgrs_userDataMgr__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(idlUserDataMgr, navCtrl, loadingctrl, navParams, formBuilder, idlAlert) {
        this.idlUserDataMgr = idlUserDataMgr;
        this.navCtrl = navCtrl;
        this.loadingctrl = loadingctrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.idlAlert = idlAlert;
        this.showPass = false;
        this.type = __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["g" /* passwordType */].password;
        this.validation_messages = __WEBPACK_IMPORTED_MODULE_4__idlSCHelpers_idlSCValidationMessage__["a" /* validationMessages */];
        this.LoginForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])],
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.loginRedirect = function () {
        var _this = this;
        if (!this.LoginForm.valid) {
            this.idlAlert.defaultAlert(__WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["c" /* alertTitles */].Login, __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["b" /* alertMessages */].detailEntry, __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["a" /* alertButtons */].ok);
        }
        else {
            var loading_1 = this.loadingctrl.create({
                content: __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["f" /* loadingMessages */].login
            });
            loading_1.present();
            this.idlUserDataMgr.loginUser(this.LoginForm.value).then(function (user) {
                loading_1.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__["a" /* DashboardPage */], {
                    user: user
                });
            }).catch(function (err) {
                loading_1.dismiss();
                _this.idlAlert.defaultAlert(__WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["c" /* alertTitles */].Login, err.message, __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["a" /* alertButtons */].ok);
            });
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__["a" /* DashboardPage */]);
    };
    /**
     * this function is used show or hide password
     */
    LoginPage.prototype.showPassword = function () {
        if (!this.showPass) {
            this.showPass = true;
            this.type = __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["g" /* passwordType */].text;
        }
        else {
            this.showPass = false;
            this.clearOnEdit = true;
            this.type = __WEBPACK_IMPORTED_MODULE_5__idlSCHelpers_idlSCConstants__["g" /* passwordType */].password;
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-content padding text-center>\n  <page-header></page-header>\n  <ion-row class="main-body login-page">\n    <ion-col class="template-body">\n          <form [formGroup]="LoginForm" class="loginform" col-12 col-sm-9 col-md-6 col-lg-4 col-xl-4>\n            <p class="heading">Login to Connect</p>\n            <ion-list>\n            <ion-item>\n              <ion-input formControlName="email" type="email" placeholder="Email" class="form-control"></ion-input>\n            </ion-item>\n            <div class="validation-errors">\n              <ng-container *ngFor="let validation of validation_messages.email">\n                <div class="error-message"\n                  *ngIf="LoginForm.get(\'email\').hasError(validation.type) && (LoginForm.get(\'email\').dirty || LoginForm.get(\'email\').touched)">\n                  {{ validation.message }}\n                </div>\n              </ng-container>\n            </div>\n\n            <ion-item>\n              <ion-input clearOnEdit="false" formControlName="password" type="{{type}}" placeholder="Password"\n                class="form-control"></ion-input>\n              <button *ngIf="!showPass" ion-button clear color="dark" type="button" item-right (click)="showPassword()">\n                <ion-icon name="ios-eye-off-outline"></ion-icon>\n              </button>\n              <button *ngIf="showPass" ion-button clear color="dark" type="button" item-right (click)="showPassword()">\n                <ion-icon name="ios-eye-outline"></ion-icon>\n              </button>\n            </ion-item>\n            <div class="validation-errors">\n              <ng-container *ngFor="let validation of validation_messages.password">\n                <div class="error-message"\n                  *ngIf="LoginForm.get(\'password\').hasError(validation.type) && (LoginForm.get(\'password\').dirty || LoginForm.get(\'password\').touched)">\n                  {{ validation.message }}\n                </div>\n              </ng-container>\n            </div>\n            <button ion-button margin (click)="loginRedirect()">Login</button>\n        </ion-list>\n      </form>\n    </ion-col>\n  </ion-row>\n</ion-content>'/*ion-inline-end:"C:\Users\DELL\Desktop\Ionic\idl\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__idlSCDataMgrs_userDataMgr__["a" /* IDLUserDataMgr */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__idlSCUtils_idlAlert__["a" /* IDLAlert */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[327]);
//# sourceMappingURL=main.js.map