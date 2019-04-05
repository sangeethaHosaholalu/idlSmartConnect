import { MediaWSMgr } from "../idlSCWebServiceMgrs/mediaWSMgr";
import { Injectable } from "@angular/core";
import * as consts from '../idlSCHelpers/idlSCConstants';
import { Media } from "../idlSCModels/Media";
import { IDLSCUploadMediaDbMgr } from "../idlSCDbMgrs/idlSCUploadMediaDbMgr";

@Injectable()
export class MediaDataMgr {

    /**
     * Default class constructor
     * @param userWebServiceMgr 
     * @param idlUserDbMgr 
     */
    constructor(private mediaWSMgr: MediaWSMgr, private idlSCMediaDbMgr: IDLSCUploadMediaDbMgr) {

    }

    /**
     * Method to add media 
     * @param metaData contains the data of the media
     */
    addMedia(mediaData) {
        return new Promise((resolve, reject) => {
            this.mediaWSMgr.addMedia(mediaData).then(response => {
                //store media id as global variables
                window.localStorage.setItem(consts.globalVariables.mediaId, mediaData.id)
                // window.localStorage.setItem(consts.globalVariables.mediaName, media.mediaName)
                resolve(response)
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * Method to get media 
     */
    getMedia() {
        return new Promise((resolve, reject) => {
            this.mediaWSMgr.getMedia().then(response => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * delete the media data from the response
     */
    deleteMedia() {
        return new Promise((resolve, reject) => {
            this.mediaWSMgr.deleteMedia().then(response => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * Get the user data from the response
     * @param response 
     */
    private getMediaObjectFromResponse(response) {
        return new Promise((resolve, reject) => {
            if (response) {
                var media = new Media();
                media.id = response.content.ISCM_id
                media.mediaName = response.content.ISCM_name
                media.mediaUrl = response.content.ISCM_url
                media.uploadTime = response.content.ISCM_uploadtime
                resolve(media);
            } else {
                var error = {}
                error[consts.response.message] = consts.errorMessages.unableToParseResponse
                reject(error);
            }
        })
    }
}