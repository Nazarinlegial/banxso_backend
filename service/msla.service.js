import * as msal from '@azure/msal-node'
import {msalConfig} from "../config/msla.conf.js";
export const msalClient = new msal.ConfidentialClientApplication(msalConfig)

export const initializationMsalCacheStorage = () => {

}