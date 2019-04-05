import { Injectable } from "@angular/core";
import { BaseWSMgr } from "./baseWSMgr";
import * as wsConfig from '../idlSCHelpers/idlWSConfigs';
import * as consts from '../idlSCHelpers/idlSCConstants';

@Injectable()
export class DeviceMediaWSMgr {
    /**
     * Default constructor 
     */
    constructor(private baseWSMgr: BaseWSMgr) {

    }

    /**
     * Method to upload device data
     * @param deviceMediaData 
     */
    uploadDeviceMedia(deviceMediaData) {
        //build the route url
        var baseUrl = wsConfig.wsConfigs.baseUrl + wsConfig.userWSRoutes.deviceMedia;
        alert(JSON.stringify(deviceMediaData));
        return new Promise((resolve, reject) => {
            this.baseWSMgr.post(baseUrl, "", deviceMediaData).then((response) => {
                resolve(response)
            }).catch((err) => {
                alert(err);
                reject(err);
            })
        })
    }
}