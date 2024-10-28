import { LogLevel } from "@azure/msal-browser";
// import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_AUTHORITY}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [`api://${process.env.REACT_APP_AZURE_CLIENT_ID}/Mint.Api.Auth`],
};
export const readRequest = {
  scopes: [`api://${process.env.REACT_APP_AZURE_CLIENT_ID}/Mint.Api.Auth`],
};
export const graphConfig = {
  graphMeEndpoint: "Enter_the_Graph_Endpoint_Herev1.0/me",
};
