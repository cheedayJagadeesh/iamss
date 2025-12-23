// export const environment = {
//     production: true,
//     redirectUri: "https://ielc-test.azurewebsites.net/authcallback",
//     postLogoutRedirectUri: "https://ielc-test.azurewebsites.net/#/login"
//   };
  
// const isTest = window?.location?.hostname.includes("ielc.inteqportal.com");

// export const environment = {
//   production: true,
//   urls: {
//     test: {
//       redirectUri: "https://ielc.inteqportal.com/authcallback",
//       postLogoutRedirectUri: "https://ielc.inteqportal.com/#/login"
//     },
//     prod: {
//       redirectUri: "https://inteqemployeelearingcenter.azurewebsites.net/authcallback",
//       postLogoutRedirectUri: "https://inteqemployeelearingcenter.azurewebsites.net/#/login"
//     }
//   },
//   redirectUri: isTest
//     ? "https://ielc.inteqportal.com/authcallback"
//     : "https://inteqemployeelearingcenter.azurewebsites.net/authcallback",

//   postLogoutRedirectUri: isTest
//     ? "https://ielc.inteqportal.com/#/login"
//     : "https://inteqemployeelearingcenter.azurewebsites.net/#/login"
// };


const hostname = window?.location?.hostname;

const ENV_MAP: any = {
  "ielc.inteqportal.com": {
    redirectUri: "https://ielc.inteqportal.com/authcallback",
    postLogoutRedirectUri: "https://ielc.inteqportal.com/#/login"
  },
  "app-local.xyz": {
    redirectUri: "https://app-local.xyz/authcallback",
    postLogoutRedirectUri: "https://app-local.xyz/#/login"
  },
   "www.app-local.xyz": {
    redirectUri: "https://www.app-local.xyz/authcallback",
    postLogoutRedirectUri: "https://www.app-local.xyz/#/login"
  },
  "inteqemployeelearingcenter.azurewebsites.net": {
    redirectUri: "https://inteqemployeelearingcenter.azurewebsites.net/authcallback",
    postLogoutRedirectUri: "https://inteqemployeelearingcenter.azurewebsites.net/#/login"
  }
};

// fallback (local or unknown)
const currentEnv =
  ENV_MAP[hostname] ?? {
    redirectUri: "http://localhost:4200/authcallback",
    postLogoutRedirectUri: "http://localhost:4200/#/login"
  };

export const environment = {
  production: true,
  redirectUri: currentEnv.redirectUri,
  postLogoutRedirectUri: currentEnv.postLogoutRedirectUri
};
