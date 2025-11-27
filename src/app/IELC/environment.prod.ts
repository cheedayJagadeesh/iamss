export const environment = {
    production: true,
    // redirectUri: "https://sampleielc.azurewebsites.net/authcallback",
    // postLogoutRedirectUri: "https://sampleielc.azurewebsites.net/#/login"
    //  redirectUri: "https://inteqemployeelearingcenter.azurewebsites.net/authcallback",
    // postLogoutRedirectUri: "https://inteqemployeelearingcenter.azurewebsites.net/#/login"

    redirectUri: "https://ielc-test.azurewebsites.net/authcallback",
    postLogoutRedirectUri: "https://ielc-test.azurewebsites.net/#/login"
  };
  
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