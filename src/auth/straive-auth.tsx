/*
Component Name : AuthProvider
Author : Varna Kumar V
Email : varnakumar.Venkatachalapathy@straive.com
Dependencies : { @azure/msal-browser : ^2.22.1, @azure/msal-react : ^1.3.1 }
Description : This Component is developed to Provide Azure Authentication for React FUNCTION COMPONENT(HOOKS) Application 
*/

import React, { useContext } from "react";
import {
  MsalProvider,
  UnauthenticatedTemplate,
  AuthenticatedTemplate,
  MsalAuthenticationTemplate,
  useMsal,
} from "@azure/msal-react";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
// import { authRedirectUrl } from "../../api";
// import { authRedirectUrl, hapRedirectUrl } from "../../api";

const LogOutContext = React.createContext(() => {}); // logout context with default value

// let newurl = window.location.pathname;
// let hostname = window.location.hostname;
const authRedirectUrl = "http://localhost:5173/acs_razor";

let finalUrl = authRedirectUrl;
// newurl.includes("ae/author")
//   ? (finalUrl = authRedirectUrl)
//   : newurl.includes("ae/hap")
//   ? (finalUrl = hapRedirectUrl)
//   : (finalUrl = authRedirectUrl);
// if (hostname === "localhost") {
//   if (newurl.includes("ae/author")) {
//     finalUrl = authRedirectUrl;
//   } else if (newurl.includes("ae/hap")) {
//     finalUrl = hapRedirectUrl;
//   }else{
//     finalUrl = authRedirectUrl
//   }
// } else {
//   if (newurl.includes("ae/author")) {
//     finalUrl = authRedirectUrl;
//   } else if (newurl.includes("ae/hap")) {
//     finalUrl = hapRedirectUrl;
//   }else{
//     finalUrl = authRedirectUrl;
//   }
// }

const pca = new PublicClientApplication({
  auth: {
    // Creating Public client application to access azure auth
    clientId: "a934efbd-0584-4e77-804e-5d7a1db77498",
    redirectUri: `${finalUrl}`,
    authority: "https://login.microsoftonline.com/straive.com",
  },
  cache: { cacheLocation: "localStorage", storeAuthStateInCookie: false },
  // cache: { cacheLocation: "Cookies", storeAuthStateInCookie: true },
});

export function useAuthPCA() {
  // Custom hook to provide PCA for other component
  return pca;
}

export function useUserDetails() {
  // Custom hook to provide user Acc Details
  return useMsal().accounts[0];
}

export function useAuthLogout() {
  // Custom hook to provide Logout context
  return useContext(LogOutContext);
}

function logout() {
  // Logout function
  pca.logout().catch((err) => {
    console.log("ERRRORRR", err);
    alert("Something went wrong");
  });
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Main Component function

  return (
    <LogOutContext.Provider value={logout}>
      <MsalProvider instance={pca}>
        <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
          />
        </UnauthenticatedTemplate>
      </MsalProvider>
    </LogOutContext.Provider>
  );
}
