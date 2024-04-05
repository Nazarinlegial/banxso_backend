import graph from '@microsoft/microsoft-graph-client'
import 'isomorphic-fetch'
import {MS_SCOPES} from "../config/msla.conf.js";
import {userService} from "./user.service.js";
import {ApiError} from "./exceptions.js";
import {ERROR_TYPES} from "../helper/constants/error.js";
import {AuthError} from "@azure/msal-common";

export function getAuthenticatedGraphClient({
                                                msalClient,
                                                msAccountId,
                                                redirectUri
                                            }) {

    if (!msalClient || !msAccountId) {
        throw new Error(
            `Invalid MSAL state. Client: ${msalClient ? 'present' : 'missing'}, User ID: ${msAccountId ? 'present' : 'missing'}`);
    }

    // Initialize Graph client
    return graph.Client.init({

        // Implement an auth provider that gets a token
        // from the app's MSAL instance
        authProvider: async (done) => {
            try {
                // Шукаємо аккаунт в кеші
                const account = await msalClient
                    .getTokenCache()
                    .getAccountByHomeId(msAccountId)

                if (account) {
                    // Attempt to get the token silently
                    // This method uses the token cache and
                    // refreshes expired tokens as needed
                    const response = await msalClient.acquireTokenSilent({
                        scopes: MS_SCOPES,
                        account: account,
                        redirectUri: redirectUri
                        // forceRefresh: true
                    });

                    done(null, response.accessToken);
                }
            } catch (err) {
                console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                done(err, null);

            }
        }
    });
}